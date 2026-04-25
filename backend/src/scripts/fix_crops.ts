import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });

const mongoUri = process.env.MONGO_URI;

const cropMap: Record<string, string> = {
  "Yellow Rust": "Wheat",
  "Loose Smut": "Wheat",
  "Leaf Curl Virus": "Cotton",
  "Root Rot": "Cotton",
  "Leaf Blight": "Rice",
  "Rice Blast": "Rice",
  "Red Rot": "Sugarcane",
  "Late Blight": "Potato",
};

async function fix() {
  await mongoose.connect(mongoUri!);
  console.log("Connected to MongoDB...");

  const collection = mongoose.connection.db!.collection("diseases");

  for (const [name, crop] of Object.entries(cropMap)) {
    const result = await collection.updateOne(
      { name: name },
      { $set: { crop: crop } }
    );
    console.log(`Updated ${name}: ${result.modifiedCount} document(s)`);
  }

  process.exit(0);
}

fix();
