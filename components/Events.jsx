import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "events"));
      setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <section style={{ padding: 50 }}>
      <h2>Events</h2>

      {events.map(e => (
        <div key={e.id} style={{
          padding: 15,
          marginTop: 10,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 10
        }}>
          {e.title}
        </div>
      ))}
    </section>
  );
}
