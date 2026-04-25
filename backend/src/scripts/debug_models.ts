import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../../.env") });

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("No API key found.");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  try {
    const result = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent("Hi");
    console.log("Success with gemini-1.5-flash!");
    console.log(result.response.text());
  } catch (e: any) {
    console.error("Error with gemini-1.5-flash:", e.message);
    console.log("Attempting to list models...");
    // The SDK doesn't have a direct listModels but we can try common alternatives
    const models = ["gemini-1.5-flash-latest", "gemini-1.5-flash-001", "gemini-pro"];
    for (const m of models) {
      try {
        await genAI.getGenerativeModel({ model: m }).generateContent("Hi");
        console.log(`Success with ${m}!`);
      } catch (err: any) {
        console.log(`Failed with ${m}: ${err.message}`);
      }
    }
  }
}

listModels();
