import React, { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) ? setProducts(data.slice(0, 10)) : setProducts([]))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div>
      <section className="hero-banner">
        <div className="container">
          <h1 className="hero-title">Welcome to Our Store</h1>
          <p className="hero-desc">Find your favorite clothing items here!</p>
          <a href="/shop" className="btn primary">Shop Now</a>
        </div>
      </section>

      <section className="container">
        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p._id}>
              <div className="img-wrap">
                <img src={p.image || "https://via.placeholder.com/400x450?text=Product"} alt={p.name} />
              </div>
              <div className="card-body">
                <div className="product-name">{p.name}</div>
                <div>
                  <span className="product-price">{(Number(p.price)||0).toLocaleString("vi-VN")} VND</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
