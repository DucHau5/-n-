import express from "express";
import { registerUser } from "../controllers/userController.js";

const router = express.Router();

// POST /register
router.post("/", registerUser);

export default router;
