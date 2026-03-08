import { useEffect, useState } from "react";
import api from "../services/api";   // 🔥 use central api
import RotatingText from "./RotatingText";
import SocialIcons from "./SocialIcons";
import "../App.css";
import "../assets/css/hero.css";
import ParticleImage from "./ParticleImage";
const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        // 🔥 baseURL already contains /api
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
      <ParticleImage />
      <div className="container">
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