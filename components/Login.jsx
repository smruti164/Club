import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div style={{ padding: 30 }}>
      <h2>Admin Login</h2>

      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="password" onChange={e => setPass(e.target.value)} />

      <button onClick={() =>
        signInWithEmailAndPassword(auth, email, pass)
      }>
        Login
      </button>
    </div>
  );
}
