import mongoose, { type InferSchemaType } from "mongoose";

export type UserRole = "user" | "admin";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["user", "admin"] },
  },
  { timestamps: true }
);

userSchema.set("toJSON", {
  transform: (_doc: unknown, ret: Record<string, unknown>) => {
    delete ret.passwordHash;
    return ret;
  },
});

export type UserDoc = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);

