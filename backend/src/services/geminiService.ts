import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../utils/env.js";

/**
 * Isolated service for Gemini AI interactions.
 */
export async function generateFromGemini(prompt: string, systemInstruction?: string): Promise<string> {
  if (!env.geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  
  try {
    const model = genAI.getGenerativeModel({ 
      model: env.geminiModel,
      systemInstruction: systemInstruction
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error: any) {
    console.error(`Gemini Error (${env.geminiModel}):`, error.message);
    
    // Fallback chain: 8b -> flash -> pro
    const fallbacks = ["gemini-1.5-flash", "gemini-1.5-pro"];
    
    for (const fallback of fallbacks) {
      if (env.geminiModel === fallback) continue;
      
      console.log(`Attempting fallback to ${fallback}...`);
      try {
        const fallbackModel = genAI.getGenerativeModel({ 
          model: fallback,
          systemInstruction: systemInstruction
        });
        const fallbackResult = await fallbackModel.generateContent(prompt);
        return fallbackResult.response.text();
      } catch (fallbackError: any) {
        console.error(`Gemini Fallback Error (${fallback}):`, fallbackError.message);
        // Continue to next fallback if this one fails
      }
    }
    throw error;
  }
}
