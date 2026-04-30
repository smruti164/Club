import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Events from "../components/Events";
import Members from "../components/Members";
import Gallery from "../components/Gallery";

export default function Home() {
  return (
    <div style={{ background: "#0b1220", color: "white" }}>
      <Navbar />
      <Hero />
      <Events />
      <Members />
      <Gallery />
    </div>
  );
}
