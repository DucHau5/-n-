import React, { useEffect, useState } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);

    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) ? setProducts(data) : setProducts([]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="container">
        <div className="breadcrumb">
          <a href="/">Trang chủ</a> <span>/</span> <span>Sale</span>
        </div>

        <h1 className="sale-title">Sale</h1>

        <div className="filter-bar">
          <button className="filter-btn" type="button">Bộ lọc ⚙️</button>
          <select className="sort-box" defaultValue="popular">
            <option value="popular">Sắp xếp</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name">Tên A-Z</option>
          </select>
        </div>

        <div className="product-count">{products.length} sản phẩm</div>

        <div className="product-grid">
          {products.map((p) => (
            <div className="product-card" key={p._id || p.id}>
              <div className="img-wrap">
                <img src={p.image || "https://via.placeholder.com/400x450?text=Product"} alt={p.name} />
                {p.sale && <span className="badge-sale">-{p.sale}%</span>}
                {p.outOfStock && <span className="badge-out">Hết hàng</span>}
              </div>
              <div className="card-body">
                <div className="product-name">{p.name}</div>
                <div>
                  <span className="product-price">{(Number(p.price)||0).toLocaleString("vi-VN")} VND</span>
                  {p.oldPrice && (
                    <span className="product-price-old">{p.oldPrice?.toLocaleString?.("vi-VN")} VND</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
