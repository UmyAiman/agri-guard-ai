import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const extraDiseases = [
  {
    "name": "Tomato Leaf Curl",
    "scientificName": "Tomato yellow leaf curl virus (TYLCV)",
    "crop": "Tomato",
    "description": "A viral disease spread by whiteflies that causes severe stunting and leaf deformation.",
    "symptoms": ["Upward curling of leaves", "Yellowing of leaf margins", "Stunted growth", "Flowers dropping off"],
    "treatment": {
      "organic": "Use yellow sticky traps for whiteflies. Cover plants with fine mesh.",
      "chemical": "Apply systemic insecticides (like imidacloprid) to control the whitefly carriers."
    },
    "prevention": ["Control whitefly populations", "Use resistant varieties", "Remove infected plants immediately"]
  },
  {
    "name": "Cucumber Anthracnose",
    "scientificName": "Colletotrichum orbiculare",
    "crop": "Cucumber",
    "description": "A fungal disease that affects leaves, stems, and fruit, often following warm, rainy weather.",
    "symptoms": ["Water-soaked spots that turn brown/tan", "Shot-hole appearance in leaves", "Sunken spots on fruit with pinkish spores"],
    "treatment": {
      "organic": "Use 3-year crop rotation. Apply copper sulfate or Neem oil.",
      "chemical": "Apply fungicides containing chlorothalonil or mancozeb."
    },
    "prevention": ["Use disease-free seeds", "Avoid overhead watering", "Practice crop rotation"]
  },
  {
    "name": "Apple Canker",
    "scientificName": "Neonectria ditissima",
    "crop": "Apple",
    "description": "A disease that attacks the bark of apple trees, causing sunken areas and eventually killing branches.",
    "symptoms": ["Sunken, flaky areas of bark", "Concentric rings of callus tissue", "Dead wood (dieback) on small branches"],
    "treatment": {
      "organic": "Prune out infected branches during dry weather. Sterilize tools with alcohol.",
      "chemical": "Apply copper-based fungicides after leaf fall and before bud burst."
    },
    "prevention": ["Prune regularly", "Avoid mechanical injury to bark", "Ensure good tree vigor"]
  },
  {
    "name": "Currant Aphid Damage",
    "scientificName": "Cryptomyzus ribis",
    "crop": "Currant",
    "description": "While not a disease, aphids cause severe leaf distortion that looks like a disease.",
    "symptoms": ["Bright red, blister-like swellings on upper leaf", "Yellowing of leaves", "Sticky honeydew on leaf surfaces"],
    "treatment": {
      "organic": "Spray with strong jets of water. Use insecticidal soap or Neem oil.",
      "chemical": "Apply insecticides containing malathion or pyrethroids if infestation is severe."
    },
    "prevention": ["Monitor plants in early spring", "Encourage natural predators like ladybugs"]
  },
  {
    "name": "Strawberry Leaf Scorch",
    "scientificName": "Diplocarpon earlianum",
    "crop": "Strawberry",
    "description": "A fungal disease that can cause significant leaf loss in strawberries if not managed.",
    "symptoms": ["Numerous small, irregular purplish spots", "Leaves eventually look scorched and dry", "Reduced fruit quality"],
    "treatment": {
      "organic": "Remove old leaves. Avoid high-nitrogen fertilizer in spring.",
      "chemical": "Apply fungicides containing captan or thiophanate-methyl."
    },
    "prevention": ["Plant resistant cultivars", "Maintain good airflow", "Keep foliage dry"]
  }
];

async function run() {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/agri-guard";
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    
    const Disease = mongoose.connection.db.collection("diseases");
    
    console.log(`Adding ${extraDiseases.length} extra diseases...`);
    
    for (const disease of extraDiseases) {
      await Disease.updateOne(
        { name: disease.name },
        { $set: disease },
        { upsert: true }
      );
      console.log(`Added/Updated: ${disease.name}`);
    }
    
    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

run();
