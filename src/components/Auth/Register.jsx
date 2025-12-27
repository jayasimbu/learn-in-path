import React, { useState } from "react";
import "../../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await register({ name, email, password });
      if (res.success) navigate('/dashboard');
    } catch (err) {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create your account</h2>
          <p>Join LearnInPath to start learning with curated paths.</p>
        </div>

        <div className="social-login">
          <button className="social-btn google">Continue with Google</button>
          <button className="social-btn github">Continue with GitHub</button>
        </div>

        <div className="divider"><span>OR</span></div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="input-group">
            <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="input-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
        </div>
      </div>

      <div className="auth-background">
        <div className="floating-icon"></div>
      </div>
    </div>
  );
}
