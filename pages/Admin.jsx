import { useState } from "react";
import AdminMembers from "../components/AdminMembers";
import AdminEvents from "../components/AdminEvents";

export default function Admin() {
  const [tab, setTab] = useState("members");

  return (
    <div style={{ padding: 30 }}>
      <h1>CMS Admin Panel</h1>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setTab("members")}>Members</button>
        <button onClick={() => setTab("events")}>Events</button>
      </div>

      {tab === "members" && <AdminMembers />}
      {tab === "events" && <AdminEvents />}
    </div>
  );
}
