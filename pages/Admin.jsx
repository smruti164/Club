import { useState } from "react";
import Login from "../components/Login";

export default function Admin() {
  const [tab, setTab] = useState("events");

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Dashboard</h2>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setTab("events")}>Events</button>
        <button onClick={() => setTab("members")}>Members</button>
        <button onClick={() => setTab("gallery")}>Gallery</button>
      </div>

      {tab === "events" && <div>Event CRUD UI here</div>}
      {tab === "members" && <div>Member CRUD UI here</div>}
      {tab === "gallery" && <div>Gallery Upload UI here</div>}
    </div>
  );
}
