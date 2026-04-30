import { useState } from "react";
import { db, storage } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminMembers() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);

  const upload = async () => {
    const imageRef = ref(storage, `members/${file.name}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    await addDoc(collection(db, "members"), {
      name,
      role,
      photo: url
    });

    alert("Member added");
  };

  return (
    <div>
      <h3>Add Member</h3>
      <input placeholder="name" onChange={e => setName(e.target.value)} />
      <input placeholder="role" onChange={e => setRole(e.target.value)} />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
