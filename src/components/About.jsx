import { useEffect, useState } from "react";
import api from "../services/api";
import RotatingText from "./RotatingText";
import "../assets/css/about.css";

const About = () => {

  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAbout = async () => {

      try {

        const res = await api.get("/about");

        if (res.data) {
          setAbout(res.data);
        }

      } catch (err) {

        console.error("About fetch failed:", err);

      } finally {

        setLoading(false);

      }

    };

    fetchAbout();

  }, []);

  if (loading) {
    return (
      <section className="about-section">
        Loading...
      </section>
    );
  }

  if (!about) return null;

  const imageUrl = about?.image || null;
  const resumeLink = about?.resumeFile || "";

  return (

    <section className="about-section" id="about">

      <div className="container">

        <div className="about-content-wrapper">

          <div className="about-content row">

            {/* PROFILE IMAGE */}

            {imageUrl && (

              <div className="about-image col-12 col-md-3">

                <div className="about-img-box card">

                  <div className="corner top left"></div>
                  <div className="corner top right"></div>
                  <div className="corner bottom left"></div>
                  <div className="corner bottom right"></div>

                  <img
                    src={imageUrl}
                    alt="Profile"
                    loading="lazy"
                  />

                </div>

              </div>

            )}

            {/* TEXT */}

            <div className="about-text col-12 col-md-9">

              {about.title && (
                <h2 className="about-title">
                  {about.title}
                </h2>
              )}

              {about.rotatingSubtitles?.length > 0 && (
                <h4 className="about-subtitle">
                  <RotatingText texts={about.rotatingSubtitles} />
                </h4>
              )}

              {about.description && (
                <p className="about-description">
                  {about.description}
                </p>
              )}

              {/* RESUME BUTTONS */}

              {resumeLink && (

                <div className="mt-3 d-flex gap-3">

                  <a
                    href={resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    View Resume
                  </a>

                  <a
                    href={resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary btn-primary"
                  >
                    Download Resume
                  </a>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </section>

  );

};

export default About;