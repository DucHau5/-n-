import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();

const products = [
  { name: "Áo Thun Nam", price: 150000, description: "Áo thun cotton mềm mại", category: "Nam", image: "" },
  { name: "Quần Jean Nữ", price: 300000, description: "Quần jean nữ thời trang", category: "Nữ", image: "" }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Xóa dữ liệu cũ
    await Product.deleteMany();
    await User.deleteMany();

    // Thêm products
    await Product.insertMany(products);

    // Thêm admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({ username: "admin", password: hashedPassword, isAdmin: true });

    console.log("Seeding thành công!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
