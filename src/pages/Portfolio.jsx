import { useEffect, useState } from "react";
import api from "../services/api";
import ProjectLightbox from "../components/ProjectLightbox";
import "../assets/css/portfolio.css";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCat, setActiveCat] = useState("All");

  const [visibleCount, setVisibleCount] = useState(6); // 🔥 visible cards

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ================= FETCH PROJECTS ================= */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        const active = res.data.filter((p) => p.isActive);

        setProjects(active);
        setFiltered(active);

        const cats = [
          "All",
          ...new Set(
            active.map((p) => p.category?.name).filter(Boolean)
          ),
        ];

        setCategories(cats);
      } catch (err) {
        console.error("Project fetch error:", err);
      }
    };

    fetchProjects();
  }, []);

  /* ================= FILTER ================= */
  const filterByCategory = (cat) => {
    setActiveCat(cat);
    setVisibleCount(6); // reset visible

    if (cat === "All") {
      setFiltered(projects);
    } else {
      setFiltered(
        projects.filter((p) => p.category?.name === cat)
      );
    }
  };

  /* ================= LOAD MORE ================= */
  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="container">
        <div className="portfolio-wrapper">

          {/* FILTER BUTTONS */}
          <div className="portfolio-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={activeCat === cat ? "active" : ""}
                onClick={() => filterByCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PROJECT GRID */}
          <div className="portfolio-grid">
            {filtered.slice(0, visibleCount).map((p, i) => (
              <div
                className="project-card"
                key={p._id}
                onClick={() => {
                  setActiveIndex(i);
                  setLightboxOpen(true);
                }}
              >
                <div className="card__inner">

                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                    />
                  )}

                  <div className="project-overlay">
                    <h4>{p.title}</h4>
                    <p>{p.shortDescription}</p>
                    <button className="pro-read-btn">
                      Read more
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* VIEW MORE BUTTON */}
          {visibleCount < filtered.length && (
            <div className="portfolio-loadmore">
              <button onClick={loadMore}>
                View More Projects
              </button>
            </div>
          )}

        </div>

        {/* LIGHTBOX */}
        {lightboxOpen && (
          <ProjectLightbox
            projects={filtered}
            index={activeIndex}
            close={() => setLightboxOpen(false)}
            setIndex={setActiveIndex}
          />
        )}

      </div>
    </section>
  );
};

export default Portfolio;