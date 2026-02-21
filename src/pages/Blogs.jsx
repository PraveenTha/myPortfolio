import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../assets/css/blog.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs/public/all");
        setBlogs(res.data);
      } catch (err) {
        console.error("Blog fetch error", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="color-white">Blogs</h2>

        <div className="row">
          {blogs.map((b) => (
            <div className="col-md-4 mb-4" key={b._id}>
              <div className="modern-blog-card">
                
                {/* ✅ CLOUDINARY IMAGE */}
                <div className="image-wrap">
                  {b.image && (
                    <img
                      src={b.image}
                      alt={b.title}
                      loading="lazy"
                    />
                  )}

                  <span className="date-badge">
                    {new Date(b.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="card-body">
                  <h4>{b.title}</h4>
                  <p>{b.shortDescription}</p>

                  <Link to={`/blog/${b.slug}`} className="read-btn">
                    Read More
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blogs;