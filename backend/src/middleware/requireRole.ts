import type { Response, NextFunction } from "express";
import type { AuthedRequest } from "./authRequired.js";
import type { UserRole } from "../models/User.js";

export function requireRole(role: UserRole) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    if (req.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}

