import { Request, Response } from "express";
import { analyzePlant } from "../services/analysisService.js";

/**
 * Handles plant analysis requests.
 */
export async function analyzeHandler(req: Request, res: Response) {
  try {
    const { crop, disease, scientificName, confidence } = req.body;

    // Accept either 'disease' (common) or 'scientificName'
    const sci = scientificName || disease;

    if (!crop || !sci) {
      return res.status(400).json({ error: "Crop and disease/scientific name are required." });
    }

    const result = await analyzePlant({
      crop,
      scientificName: sci,
      confidence: Number(confidence || 0)
    });

    return res.json(result);
  } catch (error: any) {
    console.error("Analysis Controller Error:", error.message);
    return res.status(500).json({ error: "Failed to analyze plant. Please try again later." });
  }
}
