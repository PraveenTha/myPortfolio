import { useEffect, useState } from "react";
import api from "../services/api";
import RotatingText from "./RotatingText";
import SocialIcons from "./SocialIcons";
import ParticleImage from "./ParticleImage";

import "../App.css";
import "../assets/css/hero.css";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get("/admin/hero/public");
        setHero(res.data);
      } catch (err) {
        console.error("Hero fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return <section className="hero">Loading...</section>;
  }

  if (!hero) return null;

  return (
    <section className="hero">

      {/* 🔥 Three.js Particle Background */}
      <div className="hero-bg">
        <ParticleImage />
      </div>

      {/* 🔥 Hero Content */}
      <div className="container hero-content">
        <div className="dynemic-contant">

          <h1>{hero.heading}</h1>

          {hero.rotatingTexts?.length > 0 && (
            <RotatingText texts={hero.rotatingTexts} />
          )}

          {hero.subheading && <h4>{hero.subheading}</h4>}

          <SocialIcons />

        </div>
      </div>

    </section>
  );
};

export default Hero;