import Product from "../models/Product.js";

// Thêm sản phẩm mới
export const addProduct = async (req, res) => {
  const { name, price, description, image } = req.body;

  if (!name || !price) return res.status(400).json({ msg: "Name và price bắt buộc" });

  try {
    const newProduct = await Product.create({ name, price, description, image });
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Lấy tất cả sản phẩm
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
