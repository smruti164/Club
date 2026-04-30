export default function Hero() {
  return (
    <section style={{
      height: "90vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      background: "linear-gradient(135deg,#0b1220,#1a2a6c,#0f2027)"
    }}>
      <h1 style={{ fontSize: 52 }}>ସଂଘର୍ଷ ଯୁବ ପରିଷଦ</h1>
      <p style={{ opacity: 0.8, maxWidth: 600 }}>
        Empowering Youth • Social Change • Cultural Growth
      </p>

      <button style={{
        marginTop: 20,
        padding: "12px 25px",
        background: "#00e5ff",
        border: "none",
        borderRadius: 10
      }}>
        Join Us
      </button>
    </section>
  );
}
