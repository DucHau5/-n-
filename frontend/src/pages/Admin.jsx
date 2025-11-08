import React, { useState, useEffect } from "react";
import "./Admin.css";

export default function Admin({ user }) {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    gender: "unisex",
    category: "",
  });
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", price: "", description: "", image: "", gender: "unisex", category: "" });
  const [active, setActive] = useState("dashboard");

  // user edit modal
  const [editingUser, setEditingUser] = useState(null);
  const [userEditValues, setUserEditValues] = useState({ name: "", role: "user" });

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (active === "users") {
      fetchUsers();
    }
  }, [active]);

  // Auto-refresh users list every 5s when Users tab is active
  useEffect(() => {
    if (active !== "users") return;
    const id = setInterval(() => {
      fetchUsers();
    }, 5000);
    return () => clearInterval(id);
  }, [active]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      if (!res.ok) throw new Error("Cannot fetch products");
      const data = await res.json();
      setProducts(data); // backend trả array products
    } catch (err) {
      console.log(err);
      setMsg("Không thể tải sản phẩm từ server");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      if (!res.ok) throw new Error("Cannot fetch users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (res.ok) {
        // Backend trả về chính object sản phẩm vừa tạo
        setProducts([data, ...products]);
        setNewProduct({ name: "", price: "", description: "", image: "", gender: "unisex", category: "" });
        setMsg("Thêm sản phẩm thành công!");
      } else {
        setMsg(data.msg || "Lỗi khi thêm sản phẩm");
      }
    } catch (err) {
      console.log(err);
      setMsg("Server error khi thêm sản phẩm");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        setMsg("Xóa sản phẩm thành công!");
      } else {
        setMsg("Lỗi khi xóa sản phẩm");
      }
    } catch (err) {
      console.log(err);
      setMsg("Server error khi xóa sản phẩm");
    }
  };

  const openEdit = (product) => {
    setEditing(product._id);
    setEditValues({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      image: product.image || "",
      gender: product.gender || "unisex",
      category: product.category || "",
    });
  };

  const closeEdit = () => {
    setEditing(null);
  };

  const handleEditChange = (e) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    if (!editing) return;
    try {
      const res = await fetch(`http://localhost:5000/products/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(products.map((p) => (p._id === data._id ? data : p)));
        setMsg("Cập nhật sản phẩm thành công!");
        closeEdit();
      } else {
        setMsg(data.msg || "Lỗi khi cập nhật sản phẩm");
      }
    } catch (err) {
      console.log(err);
      setMsg("Server error khi cập nhật sản phẩm");
    }
  };

  const filteredProducts = products.filter((p) =>
    (p.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = products.length;
  const avgPrice = products.length ? Math.round(products.reduce((s,p)=>s + (Number(p.price)||0),0) / products.length) : 0;
  const withImage = products.filter(p=>p.image).length;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3>Dashboard</h3>
        <a href="#" className={active==="dashboard"?"active":""} onClick={(e)=>{e.preventDefault();setActive("dashboard");}}>Tổng quan</a>
        <a href="#" className={active==="products"?"active":""} onClick={(e)=>{e.preventDefault();setActive("products");}}>Sản phẩm</a>
        <a href="#" className={active==="users"?"active":""} onClick={(e)=>{e.preventDefault();setActive("users");}}>Người dùng</a>
        <a href="#" onClick={(e)=>e.preventDefault()}>Cấu hình</a>
      </aside>

      <main className="admin-content">
        <div className="breadcrumb">Home <span>/</span> Admin <span>/</span> Dashboard</div>
        <h1 className="page-title">Admin Dashboard</h1>
        <p>Chào {user.name}!</p>

        {active === "dashboard" && (
        <div className="stats-grid">
          <div className="stat-card stat-blue">
            <div className="stat-value">{totalProducts}</div>
            <div className="stat-label">Tổng sản phẩm</div>
          </div>
          <div className="stat-card stat-yellow">
            <div className="stat-value">{avgPrice.toLocaleString("vi-VN")}₫</div>
            <div className="stat-label">Giá trung bình</div>
          </div>
          <div className="stat-card stat-red">
            <div className="stat-value">{withImage}</div>
            <div className="stat-label">Có hình ảnh</div>
          </div>
          <div className="stat-card stat-green">
            <div className="stat-value">{(totalProducts-withImage)}</div>
            <div className="stat-label">Thiếu hình ảnh</div>
          </div>
        </div>
        )}

        {active !== "users" && (
        <div className="panel">
          <div className="panel-title">Thêm sản phẩm mới</div>
          <div className="add-product">
            <h2>Thêm sản phẩm mới</h2>
            <form onSubmit={handleAddProduct}>
              <input type="text" name="name" placeholder="Tên sản phẩm" value={newProduct.name} onChange={handleChange} required />
              <input type="number" name="price" placeholder="Giá" value={newProduct.price} onChange={handleChange} required />
              <input type="text" name="description" placeholder="Mô tả" value={newProduct.description} onChange={handleChange} required />
              <input type="text" name="image" placeholder="Link ảnh" value={newProduct.image} onChange={handleChange} required />
              <select name="gender" value={newProduct.gender} onChange={handleChange}>
                <option value="unisex">Unisex</option>
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
              </select>
              <input type="text" name="category" placeholder="Danh mục (ví dụ: áo thun, quần tây)" value={newProduct.category} onChange={handleChange} />
              <button type="submit">Thêm</button>
            </form>
            {msg && <p className="msg">{msg}</p>}
          </div>
        </div>
        )}

        {active !== "users" && (
        <div className="panel">
          <div className="panel-title">Danh sách sản phẩm</div>
          <div className="product-list">
            <div className="toolbar">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên sản phẩm..."
              />
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Giá</th>
                    <th>Mô tả</th>
                    <th>Hình ảnh</th>
                    <th>Giới tính</th>
                    <th>Danh mục</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.length === 0 ? (
                    <tr><td colSpan="7">Không có sản phẩm nào</td></tr>
                  ) : filteredProducts.map(p => (
                    <tr key={p._id}>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td>{p.description}</td>
                      <td>{p.image}</td>
                      <td>{p.gender}</td>
                      <td>{p.category}</td>
                      <td>
                        <button className="edit-btn" onClick={()=>openEdit(p)}>Sửa</button>
                        <button className="delete-btn" onClick={()=>handleDelete(p._id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}

        {active === "users" && (
          <div className="panel">
            <div className="panel-title">Người dùng</div>
            <div className="product-list">
              <div className="toolbar" style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>Tổng:</strong> {users.length} người dùng</div>
                <div>
                  <button onClick={fetchUsers}>Tải lại</button>
                </div>
              </div>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr><td colSpan="4">Chưa có người dùng nào</td></tr>
                    ) : users.map(u => (
                      <tr key={u._id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>
                          <button className="edit-btn" onClick={()=>{setEditingUser(u._id); setUserEditValues({ name: u.name || "", role: u.role || "user" });}}>Sửa</button>
                          <button className="delete-btn" onClick={async()=>{
                            if(!window.confirm("Xóa người dùng này?")) return;
                            try{
                              const res = await fetch(`http://localhost:5000/users/${u._id}`, { method: "DELETE" });
                              if(res.ok){ setUsers(users.filter(x=>x._id!==u._id)); }
                            }catch(err){ console.log(err); }
                          }}>Xóa</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {editing && (
          <div className="modal-backdrop" onClick={closeEdit}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Sửa sản phẩm</h3>
            <form onSubmit={submitEdit} className="edit-form">
              <input type="text" name="name" placeholder="Tên sản phẩm" value={editValues.name} onChange={handleEditChange} required />
              <input type="number" name="price" placeholder="Giá" value={editValues.price} onChange={handleEditChange} required />
              <input type="text" name="description" placeholder="Mô tả" value={editValues.description} onChange={handleEditChange} />
              <input type="text" name="image" placeholder="Link ảnh" value={editValues.image} onChange={handleEditChange} />
              <select name="gender" value={editValues.gender} onChange={handleEditChange}>
                <option value="unisex">Unisex</option>
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
              </select>
              <input type="text" name="category" placeholder="Danh mục" value={editValues.category} onChange={handleEditChange} />
              <div className="actions">
                <button type="button" onClick={closeEdit}>Hủy</button>
                <button type="submit">Lưu</button>
              </div>
            </form>
          </div>
          </div>
        )}

      {editingUser && (
        <div className="modal-backdrop" onClick={()=>setEditingUser(null)}>
          <div className="modal" onClick={(e)=>e.stopPropagation()}>
            <h3>Sửa người dùng</h3>
            <form className="edit-form" onSubmit={async(e)=>{
              e.preventDefault();
              try{
                const res = await fetch(`http://localhost:5000/users/${editingUser}`,{
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(userEditValues)
                });
                const data = await res.json();
                if(res.ok){
                  setUsers(users.map(x=>x._id===data._id?data:x));
                  setEditingUser(null);
                }
              }catch(err){ console.log(err); }
            }}>
              <input type="text" name="name" placeholder="Tên" value={userEditValues.name} onChange={(e)=>setUserEditValues({...userEditValues, name:e.target.value})} required />
              <select name="role" value={userEditValues.role} onChange={(e)=>setUserEditValues({...userEditValues, role:e.target.value})}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="actions">
                <button type="button" onClick={()=>setEditingUser(null)}>Hủy</button>
                <button type="submit">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
      </main>
    </div>
  );
}
