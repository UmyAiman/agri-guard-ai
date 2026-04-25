import { Router } from "express";
import { authRequired } from "../middleware/authRequired.js";
import { chatHandler } from "../controllers/chatController.js";

const router = Router();

// Context-aware chat with Gemini 1.5 Flash
router.post("/", authRequired, chatHandler);

export { router as chatRouter };
