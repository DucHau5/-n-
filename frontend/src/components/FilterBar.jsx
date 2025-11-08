import React from "react";

export default function FilterBar({ totalProducts }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-6 px-4">
      <div className="mb-2 md:mb-0">
        <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">Bộ lọc ⚙</button>
        <span className="ml-2 text-gray-600">{totalProducts} sản phẩm</span>
      </div>
      <div>
        <label className="mr-2">Sắp xếp:</label>
        <select className="border rounded px-2 py-1">
          <option>Mặc định</option>
          <option>Giá: Thấp → Cao</option>
          <option>Giá: Cao → Thấp</option>
        </select>
      </div>
    </div>
  );
}
