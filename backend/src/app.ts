import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./utils/env.js";
import { authRouter } from "./routes/auth.js";
import { detectionRouter } from "./routes/detection.js";
import { chatRouter } from "./routes/chat.js";
import { adminRouter } from "./routes/admin.js";
import { analyzeHandler } from "./controllers/analysisController.js";
import { chatHandler } from "./controllers/chatController.js";
import { authRequired } from "./middleware/authRequired.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigin,
      credentials: false,
    })
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.get("/api/health", (_req: Request, res: Response) => res.json({ ok: true }));
  app.use("/api/auth", authRouter);
  app.use("/api/detection", detectionRouter);
  app.use("/api/chat", chatRouter);
  app.use("/api/admin", adminRouter);

  // Farmer-Friendly specific routes (from plan)
  app.post("/api/analyze", authRequired, analyzeHandler);
  app.post("/api/chat", authRequired, chatHandler);

  app.use((_req: Request, res: Response) => res.status(404).json({ error: "Not found" }));

  return app;
}

