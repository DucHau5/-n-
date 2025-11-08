import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import userRoutes from "./routes/userRoutes.js";
import usersAdminRoutes from "./routes/usersAdminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import User from "./models/User.js";

const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// Kết nối MongoDB
// =====================
mongoose.connect("mongodb://127.0.0.1:27017/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("MongoDB connected");
    // Ensure admin exists in DB for /users listing
    try {
      const existing = await User.findOne({ email: adminUser.email });
      if (!existing) {
        const hashed = await bcrypt.hash(adminUser.password, 10);
        await User.create({
          name: adminUser.name,
          email: adminUser.email,
          password: hashed,
          role: adminUser.role,
        });
        console.log("Seeded admin user into DB:", adminUser.email);
      }
    } catch (seedErr) {
      console.warn("[SEED ADMIN] error:", seedErr.message);
    }
  })
  .catch((err) => console.log(err));

// =====================
// Admin cứng (hash mật khẩu ngay khi khởi động)
// =====================
const adminUser = {
  name: "Admin",
  email: "admin@example.com",
  password: "admin123", // plaintext chỉ dùng làm nguồn để hash ngay bên dưới
  role: "admin"
};

// Hash admin password synchronously on startup (so we compare hashed values)
const adminHashedPassword = bcrypt.hashSync(adminUser.password, 10);

// =====================
// Login route
// =====================
app.post("/login", async (req, res) => {
  try {
    const { email: rawEmail, password: rawPassword } = req.body || {};
    const email = typeof rawEmail === "string" ? rawEmail.trim() : "";
    const password = typeof rawPassword === "string" ? rawPassword.trim() : "";

    console.log(`[LOGIN] attempt for: ${email}`);

    if (!email || !password) {
      return res.status(400).json({ msg: "Email và password bắt buộc" });
    }

    // Admin login (so sánh với password đã hash)
    const isAdmin = email === adminUser.email;
    if (isAdmin) {
      const matchAdmin = await bcrypt.compare(password, adminHashedPassword);
      if (matchAdmin) {
        return res.json({
          user: { name: adminUser.name, email: adminUser.email, role: adminUser.role },
          token: "fake-jwt-token"
        });
      } else {
        console.log(`[LOGIN] admin login failed for: ${email}`);
        return res.status(400).json({ msg: "Invalid email or password" });
      }
    }

    // User login từ MongoDB
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log(`[LOGIN] user not found: ${email}`);
        return res.status(400).json({ msg: "Invalid email or password" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log(`[LOGIN] invalid credentials for: ${email}`);
        return res.status(400).json({ msg: "Invalid email or password" });
      }

      res.json({
        user: { name: user.name, email: user.email, role: "user" },
        token: "fake-jwt-token"
      });
    } catch (err) {
      console.error("[LOGIN] db error:", err);
      res.status(500).json({ msg: "Server error" });
    }
  } catch (err) {
    console.error("[LOGIN] unexpected error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// =====================
// Register route
// =====================
app.use("/register", userRoutes);
// Users admin CRUD
app.use("/users", usersAdminRoutes);

// Fallback: direct GET /users to ensure listing works
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (err) {
    console.error("[/users] error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// =====================
// Validate incoming product create requests (middleware)
// =====================
// This middleware runs for all /products routes and ensures POST payloads
// include the fields your frontend expects: name, price, description, image.
// It also logs the payload for easier debugging.
app.use("/products", (req, res, next) => {
  if (req.method === "POST") {
    const payload = req.body || {};
    console.log("[PRODUCT CREATE] incoming payload:", payload);

    const { name, price, description, image } = payload;
    if (!name || price === undefined || price === null || !description || !image) {
      return res.status(400).json({
        msg: "Missing required fields. Required: name, price, description, image",
        received: { name: !!name, price: price !== undefined && price !== null, description: !!description, image: !!image }
      });
    }

    const nPrice = Number(price);
    if (Number.isNaN(nPrice)) {
      return res.status(400).json({ msg: "Invalid price: must be a number" });
    }
    req.body.price = nPrice;
  }
  next();
});

// =====================
// Debug endpoint: trả về danh sách products chuẩn hóa (dynamic import)
// =====================
app.get("/products/list", async (req, res) => {
  try {
    // dynamic import so server won't crash if model file missing
    let Product;
    try {
      const mod = await import("./models/Product.js");
      Product = mod.default || mod.Product || null;
    } catch (impErr) {
      console.warn("[PRODUCTS LIST] Product model not found:", impErr.message);
      return res.status(500).json({ msg: "Product model not available on server" });
    }

    if (!Product) {
      return res.status(500).json({ msg: "Product model not exported correctly" });
    }

    const products = await Product.find().lean().exec();
    if (!products) return res.json([]);

    const normalized = products.map((p) => ({
      id: p._id,
      name: p.name || p.title || p.productName || "",
      price: p.price ?? p.cost ?? p.amount ?? 0,
      description: p.description || p.desc || p.details || "",
      image:
        p.image ||
        p.imageUrl ||
        (Array.isArray(p.images) && p.images[0]) ||
        p.photo ||
        "",
      raw: p
    }));

    console.log(`[PRODUCTS LIST] ${normalized.length} items`);
    console.log(normalized.slice(0, 5));

    res.json(normalized);
  } catch (err) {
    console.error("[PRODUCTS LIST] error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// =====================
// Product routes (CRUD)
// =====================
app.use("/products", productRoutes);

// =====================
// Start server
// =====================
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
