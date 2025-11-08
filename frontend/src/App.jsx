import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ProductPage />} />
        <Route
          path="/admin"
          element={(() => {
            const u = user || (function(){
              try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
            })();
            const isAdmin = u && typeof u.role === "string" && u.role.toLowerCase() === "admin";
            return isAdmin ? <Admin user={u} /> : <Navigate to="/" />;
          })()}
        />
        <Route
          path="/login"
          element={!user ? (
            <Login setUser={setUser} />
          ) : (
            user.role && String(user.role).toLowerCase() === "admin" ? (
              <Navigate to="/admin" />
            ) : (
              <Navigate to="/" />
            )
          )}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </>
  );
}
