import React, { useState } from "react";
import api from "../api";
import "./AuthPage.css";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("consumer");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      setMessage("All fields are required!");
      return;
    }
    try {
      await api.post("/signup", { username, email, password, role });
      setMessage("Signup successful! Please log in.");
      setIsLogin(true);
    } catch (err) {
      setMessage("Signup failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
      window.location.href = "/videos";
    } catch (error) {
      setMessage("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">{isLogin ? "Login" : "Signup"}</h1>
        {message && <p className="auth-message">{message}</p>}
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="auth-select"
            >
              <option value="consumer">Consumer</option>
              <option value="creator">Creator</option>
            </select>
          </>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button
          onClick={isLogin ? handleLogin : handleSignup}
          className="auth-button"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="auth-toggle-button"
        >
          {isLogin ? "Switch to Signup" : "Switch to Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
