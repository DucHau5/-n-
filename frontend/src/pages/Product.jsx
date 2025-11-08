// src/pages/Product.jsx
import React from "react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import "./../styles.css";

const demoProducts = [
  { id: 1, title: "Áo Sơ Mi Caro", price: 250000, oldPrice: 500000, img: "/images/shirt1.jpg", salePercent: 50, outOfStock: true },
  { id: 2, title: "Quần Kaki Nam", price: 300000, oldPrice: 600000, img: "/images/pants1.jpg", salePercent: 50 },
  { id: 3, title: "Giày Sneaker", price: 450000, img: "/images/shoes1.jpg", salePercent: 30 },
  { id: 4, title: "Váy Dài Nữ", price: 500000, img: "/images/dress1.jpg", salePercent: 50 },
  // ... copy / thêm sản phẩm demo
];

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main className="container page-content">
        <section className="page-hero">
          <h1>Sale</h1>
          <p className="breadcrumb">Trang chủ / Sale</p>
        </section>

        <section className="filter-row">
          <div className="filter-left">
            <button className="filter-btn">Bộ lọc ⚙</button>
            <span className="product-count">107 sản phẩm</span>
          </div>

          <div className="filter-right">
            <label>Sắp xếp</label>
            <select>
              <option>Mặc định</option>
              <option>Giá: Thấp → Cao</option>
              <option>Giá: Cao → Thấp</option>
            </select>
          </div>
        </section>

        <section className="product-grid">
          {demoProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>
      </main>
    </>
  );
}
