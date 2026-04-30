import { useState } from "react";
import { db, storage } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AdminMembers() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);

  const uploadMember = async () => {
    if (!file) return;

    // 1. upload image to storage
    const imageRef = ref(storage, `members/${file.name}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);

    // 2. save data to firestore
    await addDoc(collection(db, "members"), {
      name,
      role,
      photo: url
    });

    alert("Member Added Successfully");
    setName("");
    setRole("");
    setFile(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Member</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Role" onChange={e => setRole(e.target.value)} />

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <button onClick={uploadMember}>
        Upload Member
      </button>
    </div>
  );
}
