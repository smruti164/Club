import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "members"));
      setMembers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <section style={{ padding: 50 }}>
      <h2>Committee</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
        {members.map(m => (
          <div key={m.id} style={{
            background: "rgba(255,255,255,0.05)",
            padding: 20,
            borderRadius: 12,
            textAlign: "center"
          }}>
            <img src={m.photo} style={{ width: 120, borderRadius: "50%" }} />
            <h3>{m.name}</h3>
            <p>{m.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
