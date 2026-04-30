import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AdminMembers from "../components/AdminMembers";
import AdminEvents from "../components/AdminEvents";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState(null);

  const login = async () => {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    setUser(res.user);
  };

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Admin Login</h2>
        <input placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={e => setPass(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h2>CMS Admin</h2>
      <AdminMembers />
      <AdminEvents />
    </div>
  );
}
