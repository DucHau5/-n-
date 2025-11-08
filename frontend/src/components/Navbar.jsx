import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const location = useLocation();
  const isAdminPage = String(location.pathname || "").startsWith("/admin");
  if (isAdminPage) {
    return (
      <header className="header">
        <div className="container">
          <div className="header-main" style={{ padding: "12px 0" }}>
            <Link to="/" className="header-logo">ClothingStore</Link>
            <div className="header-actions">
              <button onClick={onLogout} style={{ border: "none", background: "#173c7a", color: "#fff", padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontWeight: 700 }}>Đăng xuất</button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="promo-bar">Miễn phí vận chuyển với đơn hàng trên 1 triệu</div>
      <div className="header-top">
        <div className="container">
          <div>Hotline: <strong>1800 888 38</strong> (8h - 12h, 13h00 - 17h30)</div>
          <div><a href="#" style={{ color: "#fff", textDecoration: "none" }}>Liên hệ</a></div>
        </div>
      </div>

      <div className="container">
        <div className="header-main">
          <Link to="/" className="header-logo">ClothingStore</Link>

          <nav className="header-nav">
            <div className="dropdown">
              <a href="#">Sản phẩm mới <span className="caret">▾</span></a>
              <div className="dropdown-menu">
                <a href="#">Nam</a>
                <a href="#">Nữ</a>
              </div>
            </div>

            <div className="dropdown">
              <a href="#">Nam <span className="caret">▾</span></a>
              <div className="dropdown-menu">
                <div className="dropdown-item has-flyout">
                  <a href="#">Quần áo <span className="arrow">›</span></a>
                  <div className="flyout">
                    <a href="#">Áo thun</a>
                    <a href="#">Áo sơ mi</a>
                    <a href="#">Quần jeans</a>
                    <a href="#">Quần tây</a>
                    <a href="#">Áo khoác</a>
                  </div>
                </div>
                <a href="#">Giày dép</a>
                <a href="#">Cặp túi</a>
                <a href="#">Ví bóp</a>
                <a href="#">Hành lý</a>
                <a href="#">Phụ kiện nam</a>
                <a href="#">Nước hoa</a>
              </div>
            </div>

            <div className="dropdown">
              <a href="#">Nữ <span className="caret">▾</span></a>
              <div className="dropdown-menu">
                <div className="dropdown-item has-flyout">
                  <a href="#">Quần áo <span className="arrow">›</span></a>
                  <div className="flyout">
                    <a href="#">Đầm</a>
                    <a href="#">Áo</a>
                    <a href="#">Chân váy</a>
                    <a href="#">Quần</a>
                    <a href="#">Áo khoác</a>
                  </div>
                </div>
                <a href="#">Giày dép</a>
                <a href="#">Túi xách</a>
                <a href="#">Trang sức</a>
                <a href="#">Phụ kiện nữ</a>
                <a href="#">Nước hoa</a>
              </div>
            </div>

            <div className="dropdown">
              <a href="#">Phụ kiện <span className="caret">▾</span></a>
              <div className="dropdown-menu">
                <a href="#">Nón</a>
                <a href="#">Thắt lưng</a>
                <a href="#">Ví</a>
                <a href="#">Kính</a>
                <a href="#">Đồng hồ</a>
              </div>
            </div>

            <div className="dropdown">
              <a href="#">Thương hiệu <span className="caret">▾</span></a>
              <div className="dropdown-menu">
                <a href="#">Giovanni</a>
                <a href="#">Nike</a>
                <a href="#">Adidas</a>
                <a href="#">Uniqlo</a>
                <a href="#">Calvin Klein</a>
              </div>
            </div>
            <NavLink to="/shop">SALE</NavLink>
          </nav>

          <div className="header-actions">
            <span className="ship-place" title="Điểm nhận hàng">Giao hoặc: đến lấy tại <strong>435A Tam Trinh,...</strong></span>
            <span className="icon" title="Thông báo">🔔<span className="badge">1</span></span>
            <span className="icon" title="Ưa thích">❤️</span>
            {user ? (
              <span className="icon" title={`Xin chào ${user.name || "User"}`}>👤</span>
            ) : (
              <>
                <NavLink to="/login">Đăng nhập</NavLink>
                <NavLink to="/register">Đăng ký</NavLink>
              </>
            )}
            <span className="icon" title="Giỏ hàng">🛒<span className="badge">0</span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
