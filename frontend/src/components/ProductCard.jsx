import React from "react";

function formatPrice(price) {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition overflow-hidden group">
      <div className="relative">
        {product.salePercent && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            -{product.salePercent}%
          </span>
        )}

        {product.outOfStock && (
          <span className="absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded">
            Hết hàng
          </span>
        )}

        <img src={product.img} alt={product.title} className="w-full h-64 object-cover" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{product.title}</h3>
        <p className="text-red-600 font-bold">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
