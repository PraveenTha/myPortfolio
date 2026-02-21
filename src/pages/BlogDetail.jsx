import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../assets/css/blog.css";

const BlogDetail = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BLOG ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, recentRes] = await Promise.all([
          api.get(`/blogs/public/${slug}`),
          api.get("/blogs/public/all"),
        ]);

        setBlog(blogRes.data);

        const filtered = recentRes.data.filter(
          (b) => b.slug !== slug
        );

        setRecent(filtered.slice(0, 5));
      } catch (err) {
        console.error("Blog detail error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (!blog) return <p className="text-white">Blog not found</p>;

  return (
    <>
      <Header />

      <section className="blog-detail-section">
        <div className="container">
          <div className="blog-layout">

            {/* ================= LEFT CONTENT ================= */}
            <div className="blog-main">
              <h1 className="color-white">{blog.title}</h1>

              {/* ✅ CLOUDINARY IMAGE */}
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="blog-detail-img"
                  loading="lazy"
                />
              )}

              <p className="blog-short color-white">
                {blog.shortDescription}
              </p>

              <div
                className="blog-content color-white"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* ================= RIGHT SIDEBAR ================= */}
            <aside className="blog-sidebar">
              <h4 className="color-white mb-3">Recent Posts</h4>

              {recent.length === 0 && (
                <p className="text-white">No recent posts</p>
              )}

              {recent.map((r) => (
                <Link
                  to={`/blog/${r.slug}`}
                  key={r._id}
                  className="recent-post-card"
                >
                  {r.image && (
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                    />
                  )}

                  <div>
                    <h6>{r.title}</h6>
                    <p>
                      {r.shortDescription.slice(0, 60)}...
                    </p>
                  </div>
                </Link>
              ))}
            </aside>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetail;