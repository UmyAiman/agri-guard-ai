import { Router, type Request, type Response } from "express";
import { User, type UserRole } from "../models/User.js";
import { env } from "../utils/env.js";
import { hashPassword, signToken, verifyPassword } from "../utils/auth.js";
import { authRequired, type AuthedRequest } from "../middleware/authRequired.js";

export const authRouter = Router();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function safeUser(u: any) {
  return { id: String(u._id), name: u.name, email: u.email, role: u.role as UserRole };
}

authRouter.post("/user/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body ?? {};
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  if (typeof password !== "string" || password.length < 8) return res.status(400).json({ error: "Password too short" });

  const normalizedEmail = normalizeEmail(email);
  const existing = await User.findOne({ email: normalizedEmail }).lean();
  if (existing) return res.status(409).json({ error: "Email already in use" });

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email: normalizedEmail, passwordHash, role: "user" as const });

  const token = signToken({ sub: String(user._id), role: "user" });
  return res.status(201).json({ token, user: safeUser(user) });
});

authRouter.post("/user/login", async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const normalizedEmail = normalizeEmail(email);
  const user = await User.findOne({ email: normalizedEmail });
  if (!user || user.role !== "user") return res.status(401).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken({ sub: String(user._id), role: "user" });
  return res.json({ token, user: safeUser(user) });
});

authRouter.post("/admin/signup", async (req: Request, res: Response) => {
  const { name, email, password, adminKey } = req.body ?? {};
  if (!name || !email || !password || !adminKey) return res.status(400).json({ error: "Missing fields" });
  if (adminKey !== env.adminSignupKey) return res.status(403).json({ error: "Invalid admin key" });
  if (typeof password !== "string" || password.length < 8) return res.status(400).json({ error: "Password too short" });

  const normalizedEmail = normalizeEmail(email);
  const existing = await User.findOne({ email: normalizedEmail }).lean();
  if (existing) return res.status(409).json({ error: "Email already in use" });

  const passwordHash = await hashPassword(password);
  const user = await User.create({ name, email: normalizedEmail, passwordHash, role: "admin" as const });

  const token = signToken({ sub: String(user._id), role: "admin" });
  return res.status(201).json({ token, user: safeUser(user) });
});

authRouter.post("/admin/login", async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  const normalizedEmail = normalizeEmail(email);
  const user = await User.findOne({ email: normalizedEmail });
  if (!user || user.role !== "admin") return res.status(401).json({ error: "Invalid credentials" });

  const ok = await verifyPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken({ sub: String(user._id), role: "admin" });
  return res.json({ token, user: safeUser(user) });
});

authRouter.get("/me", authRequired, async (req: AuthedRequest, res: Response) => {
  const userId = req.user!.id;
  const user = await User.findById(userId);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  return res.json({ user: safeUser(user) });
});

