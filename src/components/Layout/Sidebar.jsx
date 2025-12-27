import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/dashboard">Overview</Link></li>
        <li><Link to="/courses">Courses</Link></li>
      </ul>
    </aside>
  );
}
