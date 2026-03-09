import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../assets/css/blog.css";

const Blogs = () => {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchBlogs = async () => {

      try {

        const res = await api.get("/blogs/public/all");

        if (Array.isArray(res?.data)) {
          setBlogs(res.data);
        } else {
          setBlogs([]);
        }

      } catch (err) {

        console.error("Blog fetch error:", err);
        setError("Failed to load blogs");
        setBlogs([]);

      } finally {

        setLoading(false);

      }

    };

    fetchBlogs();

  }, []);

  /* ===== Loading State ===== */

  if (loading) {
    return (
      <section className="blog-section">
        <div className="container">
          <h2 className="color-white">Blogs</h2>
          <p className="text-white">Loading blogs...</p>
        </div>
      </section>
    );
  }

  /* ===== Error State ===== */

  if (error) {
    return (
      <section className="blog-section">
        <div className="container">
          <h2 className="color-white">Blogs</h2>
          <p className="text-danger">{error}</p>
        </div>
      </section>
    );
  }

  return (

    <section className="blog-section">

      <div className="container">

        <h2 className="color-white">Blogs</h2>

        <div className="row">

          {blogs?.length > 0 ? (

            blogs.map((b) => (

              <div className="col-md-4 mb-4" key={b._id}>

                <div className="modern-blog-card">

                  {/* IMAGE */}
                  <div className="image-wrap">

                    {b?.image && (
                      <img
                        src={b.image}
                        alt={b.title}
                        loading="lazy"
                      />
                    )}

                    {b?.createdAt && (
                      <span className="date-badge">
                        {new Date(b.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    )}

                  </div>

                  {/* CONTENT */}
                  <div className="card-body">

                    <h4>{b?.title}</h4>

                    <p>{b?.shortDescription}</p>

                    <Link
                      to={`/blog/${b.slug}`}
                      className="read-btn"
                    >
                      Read More
                    </Link>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center mt-5">

              <p className="text-white">
                No blogs available
              </p>

            </div>

          )}

        </div>

      </div>

    </section>

  );

};

export default Blogs;