import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isAdminPage = String(location.pathname || "").startsWith("/admin");

  if (isAdminPage) {
    // Minimal footer for admin pages
    return (
      <footer className="site-footer">
        <div className="container" style={{ justifyContent: "center" }}>
          © 2025 Clothing Store
        </div>
      </footer>
    );
  }

  // Full footer for user pages
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container footer-top-inner">
          <h3 className="footer-title">Đăng ký nhận tin</h3>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Nhập email của bạn" required />
            <button type="submit">Đăng ký</button>
          </form>
          <div className="footer-social">
            <span>Kết nối với chúng tôi</span>
            <div className="icons">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="YouTube">▶</a>
              <a href="#" aria-label="Instagram">◎</a>
              <a href="#" aria-label="Twitter">t</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Về CLOTHING STORE</h4>
              <p>
                CÔNG TY CỔ PHẦN CLOTHING STORE<br />
                Mã số doanh nghiệp 0123456789<br />
                Người chịu trách nhiệm quản lý website: Nguyen Van A
              </p>
              <ul className="contact">
                <li>📍 123 Đường ABC, Quận XYZ, Hà Nội</li>
                <li>📞 1800 888 38</li>
                <li>✉ customerservice@clothingstore.vn</li>
              </ul>
              <div className="payments">
                <span className="badge">VNPAY</span>
                <span className="badge">Visa</span>
              </div>
            </div>

            <div className="footer-col">
              <h4>Hỗ trợ khách hàng</h4>
              <ul>
                <li><a href="#">Sản phẩm khuyến mãi</a></li>
                <li><a href="#">Sản phẩm mới nhất</a></li>
                <li><a href="#">Tất cả sản phẩm</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Liên kết</h4>
              <ul>
                <li><a href="#">Sản phẩm mới</a></li>
                <li><a href="#">Nam</a></li>
                <li><a href="#">Nữ</a></li>
                <li><a href="#">Phụ kiện</a></li>
                <li><a href="/shop">SALE</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Chính sách</h4>
              <ul>
                <li><a href="#">Giới thiệu</a></li>
                <li><a href="#">Hướng dẫn mua hàng</a></li>
                <li><a href="#">Chính sách kiểm hàng</a></li>
                <li><a href="#">Chính sách vận chuyển</a></li>
                <li><a href="#">Chính sách thanh toán</a></li>
                <li><a href="#">Chính sách bảo mật</a></li>
                <li><a href="#">Bảo hành, đổi trả</a></li>
                <li><a href="#">Điều khoản dịch vụ</a></li>
                <li><a href="#">Liên hệ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          Copyright © 2025 Clothing Store.
        </div>
      </div>
    </footer>
  );
}
