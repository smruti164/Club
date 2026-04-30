export default function Gallery() {
  return (
    <section style={{ padding: 50 }}>
      <h2>Gallery</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
        gap: 10
      }}>
        <img src="/gallery/1.jpg" />
        <img src="/gallery/2.jpg" />
      </div>
    </section>
  );
}
