import React from "react";

export default function HeroBanner() {
  return (
    <section
      className="relative bg-cover bg-center h-[70vh] flex items-center justify-center text-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?fashion,clothes')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Thời trang cập nhật mỗi ngày</h1>
        <p className="text-lg md:text-xl mb-6">Tìm kiếm sản phẩm yêu thích của bạn ngay hôm nay</p>
        <a
          href="/shop"
          className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition"
        >
          Mua ngay
        </a>
      </div>
    </section>
  );
}
