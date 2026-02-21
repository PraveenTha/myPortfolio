import { useEffect, useState } from "react";
import axios from "axios";
import RotatingText from "./RotatingText";
import SocialIcons from "./SocialIcons";
import "../App.css";
import "../assets/css/hero.css";

const Hero = () => {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/hero/public"
        );
        setHero(res.data);
      } catch (err) {
        console.error("Hero fetch failed", err);
      }
    };

    fetchHero();
  }, []);

  if (!hero) {
    return <section className="hero">Loading...</section>;
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="dynemic-contant">
          <h1>{hero.heading}</h1>

          {/* ✅ Optional rotating text */}
          {hero.rotatingTexts?.length > 0 && (
            <RotatingText texts={hero.rotatingTexts} />
          )}

          {/* ✅ Optional subtitle */}
          {hero.subheading && <h4>{hero.subheading}</h4>}

          {/* ✅ Global social icons */}
          <SocialIcons />
        </div>
      </div>
    </section>
  );
};

export default Hero;
