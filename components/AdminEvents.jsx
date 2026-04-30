import { useState } from "react";
import { db, storage } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminEvents() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const uploadEvent = async () => {
    let url = "";

    if (file) {
      const imageRef = ref(storage, `events/${file.name}`);
      await uploadBytes(imageRef, file);
      url = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, "events"), {
      title,
      image: url
    });

    alert("Event Added");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Event</h2>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button onClick={uploadEvent}>
        Add Event
      </button>
    </div>
  );
}
