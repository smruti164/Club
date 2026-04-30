export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: 20,
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)"
    }}>
      <div style={{ display: "flex", gap: 10 }}>
        <img src="/logo.jpg" style={{ height: 40 }} />
        <b>ସଂଘର୍ଷ ଯୁବ ପରିଷଦ</b>
      </div>

      <div>
        <button>Home</button>
        <button>Admin</button>
      </div>
    </nav>
  );
}
