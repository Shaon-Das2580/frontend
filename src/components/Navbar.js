import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // Import CSS

const Navbar = () => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token"); // Check if the user is logged in

  if (location.pathname === "/auth") {
    return null; // Don't show the navbar on the login/signup page
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth"; // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/videos" className="navbar-logo">
          VideoHub
        </Link>
        <div className="navbar-links">
          {isAuthenticated ? (
            <>
              <Link to="/upload" className="navbar-link">
                Upload
              </Link>
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="navbar-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
