import React from "react";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />

      <main className="home-hero container">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to LearnInPath</h1>
          <p className="hero-sub">Discover curated courses, guided learning paths, and hands-on projects to advance your skills.</p>
          <div className="hero-cta">
            <a href="/courses" className="btn btn-primary">Browse Courses</a>
            <a href="/register" className="btn btn-outline">Get Started</a>
          </div>
        </div>

        <div className="hero-visual card">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="learning" />
        </div>
      </main>

      <section className="home-features container">
        <div className="features-grid">
          <div className="feature card">
            <h3>Expert Mentors</h3>
            <p>Learn from industry professionals with real-world experience.</p>
          </div>
          <div className="feature card">
            <h3>Project Based</h3>
            <p>Build portfolio-ready projects as you proceed through courses.</p>
          </div>
          <div className="feature card">
            <h3>Flexible Learning</h3>
            <p>Learn at your own pace — from beginner to advanced.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
