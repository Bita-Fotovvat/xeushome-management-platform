import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./OurProjects.scss";

const CATEGORIES = [
  "All",
  "Full Home Renovation",
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Basement Renovation",
  "Commercial/Store",
  "Exterior",
];

export default function OurProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const baseUrl =
        process.env.NODE_ENV === "production" ? "https://renovation-website-pdnn.onrender.com" : "http://localhost:5001";
      const res = await fetch(`${baseUrl}/api/projects`);

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      // Guard: ensure we always set an array
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="projects-page">
      <Helmet>
        <title>Our Projects | Xeus Home</title>
        <meta name="description" content="Explore our portfolio of premium full home, kitchen, bathroom, and basement renovations." />
      </Helmet>

      {/* Hero Section */}
      <section className="projects-hero">
        <div className="projects-hero__overlay"></div>
        <div className="projects-hero__content">
          <span className="projects-hero__label">Our Work</span>
          <h1 className="projects-hero__title">Our Portfolio</h1>
          <p className="projects-hero__subtitle">
            Explore our collection of carefully crafted renovation projects
            across Ontario
          </p>
          <div className="projects-hero__divider"></div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="projects-filter">
        <div className="projects-filter__container">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`projects-filter__btn ${activeCategory === cat ? "projects-filter__btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Count */}
      <div className="projects-count">
        <p>
          Showing <strong>{filteredProjects.length}</strong> of{" "}
          <strong>{projects.length}</strong> projects
        </p>
      </div>

      {/* Projects Grid */}
      <section className="projects-grid">
        {loading ? (
          <div className="projects-loading">
            <div className="projects-loading__spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="projects-empty">
            <p>No projects found in this category.</p>
            <button
              className="projects-empty__btn"
              onClick={() => setActiveCategory("All")}
            >
              View All Projects
            </button>
          </div>
        ) : (
          <div className="projects-grid__container">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}