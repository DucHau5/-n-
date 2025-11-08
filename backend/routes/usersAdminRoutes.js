import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /users - list users (basic info)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /users/:id - update name and role
router.put("/:id", async (req, res) => {
  try {
    const { name, role } = req.body || {};
    const payload = {};
    if (typeof name === "string" && name.trim()) payload.name = name.trim();
    if (typeof role === "string") {
      const r = role.toLowerCase();
      if (["user", "admin"].includes(r)) payload.role = r;
    }
    const updated = await User.findByIdAndUpdate(req.params.id, payload, { new: true, fields: { password: 0 } });
    if (!updated) return res.status(404).json({ msg: "User not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /users/:id - delete user
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
