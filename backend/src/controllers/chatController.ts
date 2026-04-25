import { Request, Response } from "express";
import { Disease } from "../models/Disease.js";
import { generateAIResponse } from "../services/aiService.js";

/**
 * Handles context-aware chat requests.
 */
export async function chatHandler(req: Request, res: Response) {
  try {
    const { message, crop, disease } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    // 1) Try to find verified data in DB if context is provided
    let contextData = "";
    let source = "openrouter";

    if (crop && disease) {
      const record = await Disease.findOne({
        crop: { $regex: new RegExp(`^${crop}$`, "i") },
        name: { $regex: new RegExp(`^${disease}$`, "i") }
      });

      if (record) {
        source = "database";
        contextData = `
          Context:
          Crop: ${record.crop}
          Disease: ${record.name}
          Verified Data:
          Symptoms: ${record.symptoms?.join(", ")}
          Organic Treatment: ${record.treatment?.organic}
          Chemical Treatment: ${record.treatment?.chemical}
          Prevention: ${record.prevention?.join(", ")}
        `;
      } else {
        contextData = `Context: Crop is ${crop} and suspected disease is ${disease}.`;
      }
    }

    // 2) Generate AI response
    const systemInstruction = `
      You are a senior agronomist and professional agricultural assistant for the Agri Guard AI app. 
      Your goal is to provide helpful, accurate, and empathetic advice to farmers.
      If verified data is provided in the context, prioritize it and do not recommend chemicals outside of that data.
      Keep responses concise, practical, and easy for a farmer to follow.
    `;

    const prompt = `
      ${contextData}
      
      User Question: ${message}
      
      Provide a helpful response:
    `;

    const reply = await generateAIResponse(prompt, systemInstruction);

    return res.json({ 
      response: reply,
      source: source 
    });

  } catch (error: any) {
    console.error("Chat Controller Error:", error.message);
    return res.status(500).json({ error: "Chat failed. Please try again later." });
  }
}
