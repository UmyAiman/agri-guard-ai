import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });

const mongoUri = process.env.MONGO_URI;

const diseaseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  symptoms: [String],
  treatment: {
    organic: String,
    chemical: String,
  },
  prevention: [String],
}, { timestamps: true });

const Disease = mongoose.models.Disease || mongoose.model("Disease", diseaseSchema);

const diseases = [
  {
    name: "Yellow Rust",
    crop: "Wheat",
    symptoms: ["Yellow pustules in long stripes on leaves"],
    treatment: {
      organic: "Use resistant varieties like Faisalabad-08.",
      chemical: "Apply Nativo fungicide.",
    },
    prevention: ["Crop rotation", "Use certified seeds"],
  },
  {
    name: "Loose Smut",
    crop: "Wheat",
    symptoms: ["Grain heads turn into black powder"],
    treatment: {
      organic: "Use solar heat treatment for seeds.",
      chemical: "Treat seeds with Vitavax or Benlate (2g/kg) before sowing.",
    },
    prevention: ["Certified seed use", "Deep ploughing"],
  },
  {
    name: "Leaf Curl Virus",
    crop: "Cotton",
    symptoms: ["Upward curling of leaves", "Vein thickening"],
    treatment: {
      organic: "Plant resistant varieties like CIM-602.",
      chemical: "Control Whitefly (carrier) with Pyriproxyfen.",
    },
    prevention: ["Weed management", "Early sowing"],
  },
  {
    name: "Root Rot",
    crop: "Cotton",
    symptoms: ["Sudden wilting", "Roots turn brown and shred"],
    treatment: {
      organic: "Intercrop with 'Moth'",
      chemical: "Soil drenching with appropriate fungicides if necessary.",
    },
    prevention: ["Deep ploughing", "Well-drained soil"],
  },
  {
    name: "Leaf Blight",
    crop: "Rice",
    symptoms: ["Yellow/white stripes from leaf tips downward"],
    treatment: {
      organic: "Avoid excess Nitrogen fertilization. Plant Basmati-385 or PK-178.",
      chemical: "Copper-based bactericides if severe.",
    },
    prevention: ["Balanced fertilization", "Clean tools"],
  },
  {
    name: "Rice Blast",
    crop: "Rice",
    symptoms: ["Diamond-shaped spots on leaves", "Neck rot"],
    treatment: {
      organic: "Balanced NPK use.",
      chemical: "Spray Topsin-M or Score.",
    },
    prevention: ["Avoid excessive irrigation", "Use resistant varieties"],
  },
  {
    name: "Red Rot",
    crop: "Sugarcane",
    symptoms: ["Reddish lesions inside stalks", "Alcoholic smell"],
    treatment: {
      organic: "Use healthy setts. Avoid ratooning infected fields.",
      chemical: "Treatment of setts with fungicides.",
    },
    prevention: ["Field sanitation", "Crop rotation"],
  },
  {
    name: "Late Blight",
    crop: "Potato",
    symptoms: ["Dark, water-soaked patches that rot quickly"],
    treatment: {
      organic: "Proper spacing for aeration.",
      chemical: "Spray Ridomil Gold or Antracol.",
    },
    prevention: ["Use blight-free tubers", "Avoid late irrigation"],
  },
];

async function seed() {
  if (!mongoUri) {
    console.error("MONGO_URI not found in .env");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...");

    for (const d of diseases) {
      await Disease.findOneAndUpdate(
        { name: d.name },
        d,
        { upsert: true, new: true }
      );
      console.log(`Synced: ${d.name}`);
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
