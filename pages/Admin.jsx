import Login from "../components/Login";
import { useState } from "react";

export default function Admin() {
  const [tab, setTab] = useState("events");

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin CMS</h2>

      <div>
        <button onClick={() => setTab("events")}>Events</button>
        <button onClick={() => setTab("members")}>Members</button>
        <button onClick={() => setTab("gallery")}>Gallery</button>
      </div>

      {tab === "events" && <div>Event Manager Component</div>}
      {tab === "members" && <div>Member Manager Component</div>}
      {tab === "gallery" && <div>Gallery Upload Component</div>}
    </div>
  );
}
