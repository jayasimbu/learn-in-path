import React from "react";
import ProfileCard from "./ProfileCard";
import StatsCard from "./StatsCard";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <ProfileCard />
      <StatsCard />
    </div>
  );
}
