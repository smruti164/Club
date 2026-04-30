import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AdminEvents() {
  const [title, setTitle] = useState("");

  const add = async () => {
    await addDoc(collection(db, "events"), { title });
    alert("Event added");
  };

  return (
    <div>
      <h3>Add Event</h3>
      <input onChange={e => setTitle(e.target.value)} />
      <button onClick={add}>Add</button>
    </div>
  );
}
