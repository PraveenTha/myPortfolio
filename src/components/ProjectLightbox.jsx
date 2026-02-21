const ProjectLightbox = ({ projects, index, setIndex, close }) => {
  if (!projects || !projects.length) return null;

  const project = projects[index];

  const prev = () =>
    setIndex(index === 0 ? projects.length - 1 : index - 1);

  const next = () =>
    setIndex(index === projects.length - 1 ? 0 : index + 1);

  return (
    <div className="lightbox-backdrop">
      <div className="lightbox">
        <button className="close-btn" onClick={close}>
          ×
        </button>

        <div className="d-flex">

          {/* ✅ CLOUDINARY IMAGE */}
          <div className="project-img">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
              />
            )}
          </div>

          <div className="lightbox-content">

            {/* TAGS */}
            <div className="tags">
              {project.tags?.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>

            {/* TITLE */}
            <h3>{project.title}</h3>

            {/* DESCRIPTION */}
            <p>{project.description}</p>

            {/* LINK */}
            {project.projectLink ? (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noreferrer"
                className="visit-btn"
              >
                Visit Project
              </a>
            ) : (
              <span className="coming-soon">Coming Soon</span>
            )}
          </div>
        </div>

        {/* NAVIGATION */}
        <button className="nav prev" onClick={prev}>
          ‹
        </button>

        <button className="nav next" onClick={next}>
          ›
        </button>
      </div>
    </div>
  );
};

export default ProjectLightbox;