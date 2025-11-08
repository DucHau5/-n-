import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email và password bắt buộc");
      return;
    }

    try {
      // Hardcoded admin credentials
      const hardAdmin = {
        email: "admin@clothingstore.vn",
        password: "Admin@123",
        user: { name: "Admin", role: "admin", email: "admin@clothingstore.vn" },
        token: "hardcoded-admin-token"
      };

      if (email === hardAdmin.email && password === hardAdmin.password) {
        localStorage.setItem("token", hardAdmin.token);
        localStorage.setItem("user", JSON.stringify(hardAdmin.user));
        setUser(hardAdmin.user);
        navigate("/admin");
        return;
      }

      console.log("Sending login:", { email, password });
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        // Điều hướng theo role
        if (data.user.role === "admin") navigate("/admin");
        else navigate("/");
      } else {
        setError(data.msg || "Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
