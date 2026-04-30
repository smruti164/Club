import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

// ---------------- FIREBASE ----------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newEvent, setNewEvent] = useState("");
  const [newMember, setNewMember] = useState("");

  // ---------------- AUTH ----------------
  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  // ---------------- LOAD DATA ----------------
  const loadData = async () => {
    const ev = await getDocs(collection(db, "events"));
    setEvents(ev.docs.map(d => ({ id: d.id, ...d.data() })));

    const mem = await getDocs(collection(db, "members"));
    setMembers(mem.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    loadData();
  }, []);

  const login = () => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const addEvent = async () => {
    await addDoc(collection(db, "events"), { title: newEvent });
    setNewEvent("");
    loadData();
  };

  const addMember = async () => {
    await addDoc(collection(db, "members"), { name: newMember });
    setNewMember("");
    loadData();
  };

  const removeItem = async (col, id) => {
    await deleteDoc(doc(db, col, id));
    loadData();
  };

  // ---------------- ADMIN PAGE ----------------
  if (page === "admin") {
    if (!user) {
      return (
        <div style={{ padding: 40 }}>
          <h2>Admin Login</h2>

          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button onClick={login}>Login</button>
        </div>
      );
    }

    return (
      <div style={{ padding: 40 }}>
        <h2>Admin Panel</h2>
        <button onClick={logout}>Logout</button>

        <h3>Events</h3>
        <input value={newEvent} onChange={(e) => setNewEvent(e.target.value)} />
        <button onClick={addEvent}>Add</button>

        {events.map(e => (
          <div key={e.id}>
            {e.title}
            <button onClick={() => removeItem("events", e.id)}>X</button>
          </div>
        ))}

        <h3>Members</h3>
        <input value={newMember} onChange={(e) => setNewMember(e.target.value)} />
        <button onClick={addMember}>Add</button>

        {members.map(m => (
          <div key={m.id}>
            {m.name}
            <button onClick={() => removeItem("members", m.id)}>X</button>
          </div>
        ))}
      </div>
    );
  }

  // ---------------- MAIN UI (MODERN DESIGN) ----------------
  return (
    <div style={{
      fontFamily: "Poppins, sans-serif",
      background: "#0b1220",
      color: "#fff"
    }}>

      {/* NAV */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "rgba(0,0,0,0.4)",
        position: "sticky",
        top: 0
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.jpg" style={{ height: 45 }} />
          <b>ସଂଘର୍ଷ ଯୁବ ପରିଷଦ</b>
        </div>

        <div>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("admin")}>Admin</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg,#0b1220,#1a2a6c,#0f2027)"
      }}>
        <h1 style={{ fontSize: 48 }}>
          ସଂଘର୍ଷ ଯୁବ ପରିଷଦ
        </h1>

        <p style={{ maxWidth: 600, opacity: 0.8 }}>
          Empowering youth for social change | ସମାଜ ଉନ୍ନତି ପାଇଁ ଯୁବଶକ୍ତି
        </p>

        <button style={{
          marginTop: 20,
          padding: "12px 25px",
          background: "#00e5ff",
          border: "none",
          borderRadius: 8
        }}>
          Join Us
        </button>
      </section>

      {/* IMPACT */}
      <section style={{ padding: 60 }}>
        <h2>Our Impact</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: 20
        }}>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: 20, borderRadius: 12 }}>
            <h3>30+ Years</h3>
            <p>Service to society</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.05)", padding: 20, borderRadius: 12 }}>
            <h3>100+ Members</h3>
            <p>Active youth network</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.05)", padding: 20, borderRadius: 12 }}>
            <h3>50+ Events</h3>
            <p>Cultural & social programs</p>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section style={{ padding: 40 }}>
        <h2>Events</h2>
        {events.map(e => (
          <div key={e.id}>{e.title}</div>
        ))}
      </section>

      {/* MEMBERS */}
      <section style={{ padding: 40 }}>
        <h2>Members</h2>
        {members.map(m => (
          <div key={m.id}>{m.name}</div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: 20, opacity: 0.6 }}>
        © 2026 ସଂଘର୍ଷ ଯୁବ ପରିଷଦ, ଅଠତିରା
      </footer>

    </div>
  );
}
