import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // ✅ Import CSS
import logo from "../Logo/Psycho-AI.png"; // ✅ Import Logo

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      localStorage.setItem("userID", data.userID);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/session");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-box-container">
        {/* ✅ Logo at the top */}
        <img src={logo} alt="Psycho-AI Logo" className="login-logo" />

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input-field"
        />
        <button onClick={handleLogin} className="login-submit-button">Login</button>
        {error && <p className="login-error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
