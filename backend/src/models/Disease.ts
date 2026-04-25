import mongoose, { type InferSchemaType } from "mongoose";

const diseaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    scientificName: { type: String, trim: true },
    crop: { type: String, trim: true },
    description: { type: String, required: true },
    symptoms: [{ type: String }],
    treatment: {
      organic: { type: String },
      chemical: { type: String },
    },
    prevention: [{ type: String }],
    images: [{ type: String }],
  },
  { timestamps: true }
);

export type DiseaseDoc = InferSchemaType<typeof diseaseSchema> & { _id: mongoose.Types.ObjectId };

export const Disease = mongoose.models.Disease ?? mongoose.model("Disease", diseaseSchema);
