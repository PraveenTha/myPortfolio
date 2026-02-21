import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import "../assets/css/skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const skillRefs = useRef([]);

  /* FETCH SKILLS */
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/skills");
        setSkills(res.data.filter((s) => s.isActive));
      } catch (err) {
        console.error("Skill fetch error", err);
      }
    };

    fetchSkills();
  }, []);

  /* 🔥 SCROLL ANIMATION */
  useEffect(() => {
    if (!skills.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            obs.unobserve(entry.target); // ✅ IMPORTANT
          }
        });
      },
      { threshold: 0.3 },
    );
    skillRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, [skills]);

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="skills-wrapper">
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div
                className="skill-card card"
                key={skill._id}
                ref={(el) => (skillRefs.current[index] = el)}
              >
                <div className="corner top left"></div>
                <div className="corner top right"></div>
                <div className="corner bottom left"></div>
                <div className="corner bottom right"></div>
                {/* ICON */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <i className={`skill-icon ${skill.icon}`}></i>

                  <h4 className="skill-name">{skill.name}</h4>
                </div>
                {/* PROGRESS BAR */}
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ "--level": `${skill.level}%` }}
                  >
                    <span className="progress-text">{skill.level}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
