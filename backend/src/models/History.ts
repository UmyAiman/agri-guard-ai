import mongoose, { type InferSchemaType } from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    diseaseName: { type: String, required: true },
    confidence: { type: Number, required: true },
    imageUrl: { type: String },
    status: { type: String, enum: ["healthy", "diseased"], default: "diseased" },
    location: { type: String },
  },
  { timestamps: true }
);

export type HistoryDoc = InferSchemaType<typeof historySchema> & { _id: mongoose.Types.ObjectId };

export const History = mongoose.models.History ?? mongoose.model("History", historySchema);
