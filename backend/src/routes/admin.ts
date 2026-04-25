import { Router } from "express";
import { Disease } from "../models/Disease.js";
import { authRequired } from "../middleware/authRequired.js";
import { requireRole } from "../middleware/requireRole.js";

const router = Router();

// Get all diseases (Admin view)
router.get("/diseases", authRequired, requireRole("admin"), async (req, res) => {
  try {
    const diseases = await Disease.find().sort({ createdAt: -1 });
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch diseases" });
  }
});

// Create a new disease
router.post("/diseases", authRequired, requireRole("admin"), async (req, res) => {
  try {
    const disease = await Disease.create(req.body);
    res.status(201).json(disease);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "A disease with this name already exists" });
    }
    res.status(500).json({ error: "Failed to create disease" });
  }
});

// Update a disease
router.put("/diseases/:id", authRequired, requireRole("admin"), async (req, res) => {
  try {
    const disease = await Disease.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!disease) return res.status(404).json({ error: "Disease not found" });
    res.json(disease);
  } catch (error) {
    res.status(500).json({ error: "Failed to update disease" });
  }
});

// Delete a disease
router.delete("/diseases/:id", authRequired, requireRole("admin"), async (req, res) => {
  try {
    const disease = await Disease.findByIdAndDelete(req.params.id);
    if (!disease) return res.status(404).json({ error: "Disease not found" });
    res.json({ message: "Disease deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete disease" });
  }
});

export { router as adminRouter };
