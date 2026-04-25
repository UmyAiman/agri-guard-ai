import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeName } from "./normalize.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mapPath = path.join(__dirname, "../data/diseaseMap.json");
const diseaseMap = JSON.parse(fs.readFileSync(mapPath, "utf-8"));

/**
 * Resolves a common name from a scientific name using the offline map.
 */
export function getCommonName(scientificName: string = ""): string | null {
  const normalizedInput = normalizeName(scientificName);

  // Direct match
  if (diseaseMap[normalizedInput]) {
    return diseaseMap[normalizedInput].commonName;
  }

  // Partial match
  for (const key of Object.keys(diseaseMap)) {
    if (normalizedInput.includes(key)) {
      return diseaseMap[key].commonName;
    }
  }

  return null;
}
