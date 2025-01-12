import React, { useState } from "react";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "", // Only for signup
    role: "consumer", // Default role
  });

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", username: "", role: "consumer" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const endpoint = isLogin ? "/login" : "/signup";
  try {
    const response = await axios.post(`http://127.0.0.1:5000${endpoint}`, formData);
    if (isLogin) {
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
    } else {
      alert("Signup successful! You can now log in.");
      setIsLogin(true);
    }
  } catch (err) {
    console.error("Error response:", err.response); // Log the error response
    alert(err.response?.data?.error || "Something went wrong!");
  }
};

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h1>{isLogin ? "Login" : "Signup"}</h1>
      <button onClick={handleToggle}>
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
            />
            <br />
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="consumer">Consumer</option>
              <option value="creator">Creator</option>
            </select>
            <br />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
      </form>
    </div>
  );
};

export default AuthPage;
