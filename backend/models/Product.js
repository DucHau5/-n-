// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  gender: { type: String, enum: ["nam", "nu", "unisex"], default: "unisex" },
  category: { type: String, default: "" },
}, { timestamps: true });

// Export default để import Product từ các file khác
const Product = mongoose.model("Product", productSchema);
export default Product;
