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

// ---------------- SIMPLE ANIMATION HOOK ----------------
const useReveal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return visible;
};

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newEvent, setNewEvent] = useState("");
  const [newMember, setNewMember] = useState("");

  const reveal = useReveal();

  // AUTH
  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  // LOAD DATA
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

  // ---------------- ADMIN ----------------
  if (page === "admin") {
    if (!user) {
      return (
        <div style={styles.login}>
          <h2>Admin Login</h2>
          <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button style={styles.button} onClick={login}>Login</button>
        </div>
      );
    }

    return (
      <div style={styles.admin}>
        <h2>Admin Panel</h2>
        <button onClick={logout} style={styles.button}>Logout</button>

        <h3>Events</h3>
        <input value={newEvent} onChange={e => setNewEvent(e.target.value)} />
        <button onClick={addEvent}>Add</button>

        {events.map(e => (
          <div key={e.id}>
            {e.title}
            <button onClick={() => removeItem("events", e.id)}>X</button>
          </div>
        ))}

        <h3>Members</h3>
        <input value={newMember} onChange={e => setNewMember(e.target.value)} />
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

  // ---------------- MAIN WEBSITE ----------------
  return (
    <div style={styles.body}>

      {/* NAV */}
      <nav style={{
        ...styles.nav,
        opacity: reveal ? 1 : 0,
        transform: reveal ? "translateY(0)" : "translateY(-20px)"
      }}>
        <div style={styles.brand}>
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
        ...styles.hero,
        opacity: reveal ? 1 : 0,
        transform: reveal ? "scale(1)" : "scale(1.05)"
      }}>
        <h1 style={styles.heroTitle}>
          ସଂଘର୍ଷ ଯୁବ ପରିଷଦ
        </h1>

        <p style={styles.heroText}>
          Empowering Youth • Social Change • Cultural Growth
        </p>

        <button style={styles.cta}>Join Us</button>
      </section>

      {/* IMPACT */}
      <section style={styles.section}>
        <h2 style={styles.title}>Our Impact</h2>

        <div style={styles.grid}>
          <div style={styles.card}>30+ Years Service</div>
          <div style={styles.card}>100+ Members</div>
          <div style={styles.card}>50+ Events</div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section style={styles.section}>
        <h2 style={styles.title}>Programs</h2>

        <div style={styles.grid}>
          <div style={styles.cardHover}>Education Support</div>
          <div style={styles.cardHover}>Health Awareness</div>
          <div style={styles.cardHover}>Cultural Events</div>
        </div>
      </section>

      {/* EVENTS */}
      <section style={styles.section}>
        <h2 style={styles.title}>Events</h2>
        {events.map(e => (
          <div key={e.id} style={styles.listItem}>{e.title}</div>
        ))}
      </section>

      {/* MEMBERS */}
      <section style={styles.section}>
        <h2 style={styles.title}>Members</h2>
        {members.map(m => (
          <div key={m.id} style={styles.listItem}>{m.name}</div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        © 2026 ସଂଘର୍ଷ ଯୁବ ପରିଷଦ
      </footer>

    </div>
  );
}

// ---------------- PREMIUM STYLES ----------------
const styles = {
  body: {
    background: "#0b1220",
    color: "white",
    fontFamily: "sans-serif",
    overflowX: "hidden"
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    position: "sticky",
    top: 0,
    transition: "0.5s"
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },

  hero: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "linear-gradient(135deg,#0b1220,#1a2a6c,#0f2027)",
    transition: "1s ease"
  },

  heroTitle: {
    fontSize: 55,
    animation: "fadeIn 1s ease"
  },

  heroText: {
    opacity: 0.8,
    maxWidth: 600,
    marginTop: 10
  },

  cta: {
    marginTop: 20,
    padding: "12px 25px",
    background: "#00e5ff",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "0.3s"
  },

  section: {
    padding: 60
  },

  title: {
    fontSize: 28,
    marginBottom: 20
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: 20
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 12,
    transition: "0.3s"
  },

  cardHover: {
    background: "rgba(255,255,255,0.05)",
    padding: 20,
    borderRadius: 12,
    transition: "0.3s",
    cursor: "pointer"
  },

  listItem: {
    padding: 10,
    marginBottom: 10,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 8
  },

  footer: {
    textAlign: "center",
    padding: 20,
    opacity: 0.6
  },

  login: {
    padding: 40
  },

  admin: {
    padding: 40
  },

  button: {
    padding: "10px 20px",
    marginTop: 10,
    background: "#00e5ff",
    border: "none",
    borderRadius: 8
  }
};
