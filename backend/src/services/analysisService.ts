import { Disease } from "../models/Disease.js";
import { getCommonName } from "../utils/diseaseMapper.js";
import { normalizeName } from "../utils/normalize.js";
import { generateAIResponse } from "./aiService.js";

interface AnalysisInput {
  crop: string;
  scientificName: string;
  confidence: number;
}

/**
 * CORE LOGIC: Analyzes plant disease detection results.
 * Prioritizes Database (Ground Truth) -> Gemini (Fallback/Explanation).
 */
export async function analyzePlant({ crop, scientificName, confidence }: AnalysisInput) {
  // 1) Confidence guardrail (70%)
  if (confidence < 0.7) {
    return {
      status: "low_confidence",
      message: "The image is unclear or the confidence is too low. Please upload a clearer photo for a better diagnosis.",
      confidence
    };
  }

  // 2) Resolve common name
  const sciNorm = normalizeName(scientificName);
  const commonName = getCommonName(scientificName) || scientificName;

  // 3) DB Lookup (Primary Truth)
  // Try to find by common name or scientific name
  let record = await Disease.findOne({
    $or: [
      { name: { $regex: new RegExp(`^${commonName}$`, "i") } },
      { scientificName: { $regex: new RegExp(`^${scientificName}$`, "i") } },
      { scientificName: { $regex: new RegExp(sciNorm, "i") } }
    ],
    crop: { $regex: new RegExp(`^${crop}$`, "i") }
  });

  // 4) Construct the response
  if (record) {
    // Pass to Gemini for a farmer-friendly explanation based on DB data
    const prompt = `
      You are an expert agricultural assistant. Use ONLY the verified data below to explain the disease to a farmer in simple, professional language.
      
      Crop: ${record.crop}
      Disease: ${record.name}
      Symptoms: ${record.symptoms?.join(", ")}
      Treatment (Organic): ${record.treatment?.organic}
      Treatment (Chemical): ${record.treatment?.chemical}
      Prevention: ${record.prevention?.join(", ")}
      
      Explain simply and practically.
    `;
    
    const explanation = await generateAIResponse(prompt, "You are a senior agronomist providing clear advice to farmers.");

    return {
      source: "database",
      status: "success",
      diseaseName: record.name,
      scientificName: record.scientificName || scientificName,
      crop: record.crop,
      symptoms: record.symptoms,
      treatment: record.treatment,
      prevention: record.prevention,
      explanation: explanation,
      confidence
    };
  }

  // 5) Fallback: Gemini generates details if not in DB
  const fallbackPrompt = `
    Analyze this crop disease and provide practical advice.
    Crop: ${crop}
    Disease (scientific): ${scientificName}
    Common Name: ${commonName}
    
    Provide:
    - symptoms (list)
    - causes (1 sentence)
    - organic treatment (1-2 steps)
    - chemical treatment (1 step)
    - prevention (2 steps)
    
    Keep it extremely simple for a farmer.
  `;

  const aiResponse = await generateFromGemini(fallbackPrompt, "You are a senior agronomist. Provide structured but simple advice.");

  return {
    source: "gemini",
    status: "success",
    diseaseName: commonName,
    scientificName: scientificName,
    crop: crop,
    explanation: aiResponse,
    confidence
  };
}
