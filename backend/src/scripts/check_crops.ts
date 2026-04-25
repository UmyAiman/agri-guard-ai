import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../../.env") });

const mongoUri = process.env.MONGO_URI;

const diseaseSchema = new mongoose.Schema({
  name: String,
  crop: String,
});

const Disease = mongoose.models.Disease || mongoose.model("Disease", diseaseSchema);

async function check() {
  await mongoose.connect(mongoUri!);
  const all = await Disease.find();
  console.log(JSON.stringify(all.map(d => ({ name: d.name, crop: d.crop })), null, 2));
  process.exit(0);
}

check();
