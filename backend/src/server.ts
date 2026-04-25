import dotenv from "dotenv";
dotenv.config();
import { createApp } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./utils/env.js";

async function main() {
  await connectDb(env.mongoUri);
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`Backend listening on :${env.port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

