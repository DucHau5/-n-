import express from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Ví dụ dữ liệu shop
const products = [
  { id: 1, name: "T-Shirt", price: 200000 },
  { id: 2, name: "Jeans", price: 450000 },
];

// Route chỉ dành cho người đã đăng nhập
router.get("/shop", authMiddleware, (req, res) => {
  res.json({
    user: req.user,
    products,
  });
});

export default router;
