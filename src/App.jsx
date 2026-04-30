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

// ---------------- FIREBASE CONFIG ----------------
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
    onAuthStateChanged(auth, (u) => setUser(u));
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

  // ---------------- AUTH ACTIONS ----------------
  const login = () => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  // ---------------- CRUD ----------------
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

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>
        </div>
      );
    }

    return (
      <div style={{ padding: 40 }}>
        <h2>Admin Panel</h2>
        <button onClick={logout}>Logout</button>

        <h3>Events</h3>
        <input
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
        />
        <button onClick={addEvent}>Add Event</button>

        {events.map((e) => (
          <div key={e.id}>
            {e.title}
            <button onClick={() => removeItem("events", e.id)}>X</button>
          </div>
        ))}

        <h3>Members</h3>
        <input
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
        />
        <button onClick={addMember}>Add Member</button>

        {members.map((m) => (
          <div key={m.id}>
            {m.name}
            <button onClick={() => removeItem("members", m.id)}>X</button>
          </div>
        ))}
      </div>
    );
  }

  // ---------------- MAIN WEBSITE ----------------
  return (
    <div style={{ background: "#0b1220", color: "white", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        background: "rgba(0,0,0,0.5)"
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
      <div style={{ textAlign: "center", padding: 80 }}>
        <h1>ସଂଘର୍ଷ ଯୁବ ପରିଷଦ, ଅଠତିରା</h1>
        <p>Established 1993 | ଯୁବ ଶକ୍ତି ଦ୍ୱାରା ସମାଜ ଉନ୍ନତି</p>
        <button style={{ padding: 10, marginTop: 20 }}>Join Us</button>
      </div>

      {/* ABOUT (IMAGES FROM PUBLIC FOLDER) */}
      <section style={{ padding: 40 }}>
        <h2>About Us</h2>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div>
            <img src="/president.jpg" style={{ width: 200 }} />
            <p>President</p>
          </div>

          <div>
            <img src="/secretary.jpg" style={{ width: 200 }} />
            <p>Secretary</p>
          </div>

          <div>
            <img src="/cashier.jpg" style={{ width: 200 }} />
            <p>Treasurer</p>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section style={{ padding: 40 }}>
        <h2>Events</h2>
        {events.map((e) => (
          <div key={e.id}>{e.title}</div>
        ))}
      </section>

      {/* MEMBERS */}
      <section style={{ padding: 40 }}>
        <h2>Members</h2>
        {members.map((m) => (
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
