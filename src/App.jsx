import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Services from "./components/Services";
import Contact from "./components/Contact";

import Portfolio from "./pages/Portfolio";
import Blogs from "./pages/Blogs"; // 🔥 NEW

/* ================= HOME PAGE ================= */
const Home = () => {
  return (
    <>
      <section className="p-0" id="home">
        <Hero />
      </section>

      <section className="p-0" id="about">
        <About />
      </section>

      <section className="p-0" id="skills">
        <Skills />
      </section>

      <section className="p-0" id="experience">
        <Experience />
      </section>

      <section className="p-0" id="portfolio">
        <Portfolio />
      </section>

        {/* <section className="p-0" id="blogs">
        <Blogs />
      </section> */}

      <section className="p-0" id="services">
        <Services />
      </section>

      <section className="p-0" id="contact">
        <Contact />
      </section>
    </>
  );
};

/* ================= APP ================= */
function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* 🏠 HOME */}
        <Route path="/" element={<Home />} />

        {/* 📝 BLOG PAGE */}
        <Route path="/blogs" element={<Blogs />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
