import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import "../assets/css/experience.css";

const Experience = () => {
  const [data, setData] = useState([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/experience");
        setData(res.data);
      } catch (err) {
        console.error("Experience fetch error", err);
      }
    };
    fetchData();
  }, []);

  /* 🎯 Scroll Reveal Animation */
  useEffect(() => {
    if (!data.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [data]);

  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <div className="exp-wrapper">
          <div className="exp-container">
            {data.map((exp, idx) => (
              <div
                key={exp._id}
                className="exp-card"
                ref={(el) => (itemRefs.current[idx] = el)}
              >
                <div className="exp-icon"></div>

                <div className="exp-content">
                  {/* ✅ Direct Cloudinary URL */}
                  {exp.logo && (
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      loading="lazy"
                    />
                  )}

                  <h4 className="exp-company">{exp.company}</h4>
                  <span className="exp-duration">{exp.duration}</span>
                  <h3 className="exp-role">{exp.role}</h3>
                  <p className="exp-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;