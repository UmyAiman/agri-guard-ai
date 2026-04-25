import mongoose from "mongoose";

export async function connectDb(mongoUri: string) {
  mongoose.set("strictQuery", true);
  
  mongoose.connection.on("connecting", () => {
    console.log("🔄 Connecting to MongoDB...");
  });

  mongoose.connection.on("connected", () => {
    console.log("✅ mongodb is successfully connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected");
  });

  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw error;
  }
}

