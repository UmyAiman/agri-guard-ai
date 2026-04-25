import { config as loadDotenv } from "dotenv";

loadDotenv();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  mongoUri: requireEnv("MONGO_URI"),
  jwtSecret: requireEnv("JWT_SECRET"),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  corsOrigin: process.env.CORS_ORIGIN ?? "http://localhost:8080",
  adminSignupKey: requireEnv("ADMIN_SIGNUP_KEY"),
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterBaseUrl: process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1",
  openRouterModel: process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.1-8b-instruct",
  deepseekApiKey: process.env.DEEPSEEK_API_KEY,
  plantIdApiKey: process.env.PLANT_ID_API_KEY,
};

