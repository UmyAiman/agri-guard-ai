import { Router } from "express";
import multer from "multer";
import axios from "axios";
import { authRequired } from "../middleware/authRequired.js";
import { History } from "../models/History.js";
import { Disease } from "../models/Disease.js";
import { env } from "../utils/env.js";
import { analyzePlant } from "../services/analysisService.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Analyze plant image/text
router.post("/analyze", authRequired, upload.single("image"), async (req, res) => {
  try {
    const { textInput } = req.body;
    const file = req.file;

    if (!file && !textInput) {
      return res.status(400).json({ error: "Please provide an image or text description" });
    }

    let resultData = {
      diseaseName: "Healthy",
      confidence: 1.0,
      status: "healthy",
    };

    if (file && env.plantIdApiKey) {
      // Convert buffer to base64
      const base64Image = file.buffer.toString("base64");

      const response = await axios.post(
        "https://plant.id/api/v3/health_assessment",
        {
          images: [base64Image],
          latitude: 49.207, // Default or from client
          longitude: 16.608,
          similar_images: true,
        },
        {
          headers: {
            "Api-Key": env.plantIdApiKey,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Plant.id response received:", response.data.result?.is_plant?.probability);

      const suggestion = (response.data.result.is_plant?.probability > 0.5 && response.data.result.disease)
        ? response.data.result.disease.suggestions[0] 
        : null;

      if (suggestion) {
        console.log("Found disease suggestion:", suggestion.name, "Confidence:", suggestion.probability);
        
        // Use Analysis Service for comprehensive results
        const analysis = await analyzePlant({
          crop: "Plant", // Default if not specified
          scientificName: suggestion.name,
          confidence: suggestion.probability
        });

        resultData = {
          diseaseName: analysis.diseaseName || suggestion.name,
          scientificName: suggestion.name,
          confidence: suggestion.probability,
          status: (suggestion.probability > 0.5 && analysis.status !== "low_confidence") ? "diseased" : "healthy",
          analysis: analysis
        } as any;
      } else {
        console.log("No clear plant disease detected by Plant.id");
      }
    } else if (file && !env.plantIdApiKey) {
      // Fallback for demo mode
      resultData = {
        diseaseName: "Early Blight (Demo Mode)",
        confidence: 0.85,
        status: "diseased",
      };
    }

    // Save to history
    const history = await History.create({
      userId: (req as any).user.id,
      diseaseName: resultData.diseaseName,
      confidence: resultData.confidence,
      status: resultData.status,
      imageUrl: file ? "uploaded_image_url" : "text_input", // TODO: Cloudinary integration
    });

    // Fetch verified advice from our DB
    const diseaseInfo = await Disease.findOne({ 
      name: { $regex: new RegExp(resultData.diseaseName, "i") } 
    });

    res.json({
      result: resultData,
      info: diseaseInfo,
      historyId: history._id,
      demoMode: !env.plantIdApiKey
    });
  } catch (error: any) {
    console.error("Detection error:", error.response?.data || error.message);
    res.status(500).json({ error: `Analysis failed: ${error.response?.data?.error || error.message}` });
  }
});

// Get user history
router.get("/history", authRequired, async (req, res) => {
  try {
    const history = await History.find({ userId: (req as any).user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

export { router as detectionRouter };
