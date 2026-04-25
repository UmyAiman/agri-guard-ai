import OpenAI from "openai";
import { env } from "../utils/env.js";

/**
 * Isolated service for OpenRouter AI interactions.
 */
export async function generateAIResponse(prompt: string, systemInstruction?: string): Promise<string> {
  if (!env.openRouterApiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured.");
  }

  const openai = new OpenAI({
    baseURL: env.openRouterBaseUrl,
    apiKey: env.openRouterApiKey,
    defaultHeaders: {
      "HTTP-Referer": "https://agri-guard-ai.vercel.app", // Optional, for OpenRouter rankings
      "X-Title": "Agri Guard AI", // Optional, for OpenRouter rankings
    }
  });

  try {
    const response = await openai.chat.completions.create({
      model: env.openRouterModel,
      messages: [
        {
          role: "system",
          content: systemInstruction || "You are a senior agronomist and professional agricultural assistant."
        },
        {
          role: "user",
          content: prompt
        }
      ],
    });

    return response.choices[0]?.message?.content || "No response generated.";
  } catch (error: any) {
    console.error(`OpenRouter Error (${env.openRouterModel}):`, error.message);
    throw error;
  }
}
