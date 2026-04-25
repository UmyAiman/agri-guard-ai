import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth.js";

export type AuthedRequest = Request & { user?: { id: string; role: "user" | "admin" } };

export function authRequired(req: AuthedRequest, res: Response, next: NextFunction) {
  const header = req.header("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload = verifyToken(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

