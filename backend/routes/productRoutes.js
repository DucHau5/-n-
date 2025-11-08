import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// =====================
// Lấy danh sách tất cả sản phẩm
// =====================
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products); // trả về mảng sản phẩm
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error khi lấy sản phẩm" });
  }
});

// =====================
// Thêm sản phẩm mới (Admin)
// =====================
router.post("/add", async (req, res) => {
  const { name, price, description, image, gender, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ msg: "Name và price bắt buộc" });
  }

  try {
    const newProduct = await Product.create({
      name,
      price: Number(price),
      description,
      image,
      gender: gender || "unisex",
      category: category || "",
    });
    res.status(201).json(newProduct); // trả về sản phẩm vừa tạo
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error khi thêm sản phẩm" });
  }
});

// =====================
// Sửa sản phẩm (Admin)
// =====================
router.put("/:id", async (req, res) => {
  const { name, price, description, image, gender, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price: Number(price), description, image, gender, category },
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ msg: "Sản phẩm không tồn tại" });

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error khi cập nhật sản phẩm" });
  }
});

// =====================
// Xóa sản phẩm (Admin)
// =====================
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ msg: "Sản phẩm không tồn tại" });

    res.json({ msg: "Xóa sản phẩm thành công" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error khi xóa sản phẩm" });
  }
});

export default router;
