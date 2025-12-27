import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/App.css";

export default function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">LearnInPath</Link>
      </div>

      <div className="nav-right">
        <Link to="/courses" className="nav-link">Courses</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>

        {!currentUser ? (
          <div className="nav-actions">
            <Link to="/login" className="btn btn-outline nav-btn">Sign In</Link>
            <Link to="/register" className="btn btn-primary nav-btn">Sign Up</Link>
          </div>
        ) : (
          <div className="nav-actions">
            <span className="nav-user">{currentUser.name}</span>
            <button className="btn btn-outline nav-btn" onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
