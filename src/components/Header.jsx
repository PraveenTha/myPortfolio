import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* SCROLL EFFECT */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* SCROLL TO SECTION (ONLY HOME PAGE) */
  const scrollTo = (id) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  /* OPEN BLOG PAGE */
  const openBlogs = () => {
    setOpen(false);
    navigate("/blogs");
  };

  return (
    <>
      {/* HEADER */}
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          {/* LOGO */}
          <div className="logo" onClick={() => scrollTo("home")}>
            Praveen<span>.</span>
          </div>

          {/* HAMBURGER */}
          <div className="hamburger" onClick={() => setOpen(true)}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </header>

      {/* SIDE MENU */}
      <div className={`side-menu ${open ? "open" : ""}`}>
        <div className="menu-close" onClick={() => setOpen(false)}>
          ✕
        </div>

        <nav>
          <button onClick={() => scrollTo("home")}>Home</button>
          <button onClick={() => scrollTo("about")}>About</button>
          <button onClick={() => scrollTo("skills")}>Skills</button>
          <button onClick={() => scrollTo("services")}>Services</button>
          <button onClick={() => scrollTo("experience")}>Experience</button>
          <button onClick={() => scrollTo("portfolio")}>Portfolio</button>

          {/* 🔥 BLOG NEW PAGE */}
          <button onClick={openBlogs}>Blogs</button>

          <button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
      </div>

      {/* OVERLAY */}
      {open && <div className="menu-overlay" onClick={() => setOpen(false)} />}
    </>
  );
};

export default Header;
