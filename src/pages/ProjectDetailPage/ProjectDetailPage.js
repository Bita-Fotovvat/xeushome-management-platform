import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Lightbox from "../../components/Lightbox/Lightbox";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./ProjectDetailPage.scss";

export default function ProjectDetailPage() {
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, [projectSlug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const baseUrl =
        process.env.NODE_ENV === "production" ? "https://renovation-website-pdnn.onrender.com" : "http://localhost:5001";
      const res = await fetch(`${baseUrl}/api/projects/${projectSlug}`);
      if (!res.ok) throw new Error("Project not found");
      const data = await res.json();
      setProject(data);
    } catch (err) {
      console.error("Failed to fetch project:", err);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    const baseUrl = process.env.NODE_ENV === "production" ? "https://renovation-website-pdnn.onrender.com" : "http://localhost:5001";
    return `${baseUrl}${url}`;
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <main className="project-detail">
        <div className="project-detail__loading">
          <div className="project-detail__spinner"></div>
          <p>Loading project...</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="project-detail">
        <Helmet>
          <title>Project Not Found | Xeus Home</title>
        </Helmet>
        <div className="project-detail__not-found">
          <h2>Project Not Found</h2>
          <p>The project you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/our-projects")}>
            ← Back to Projects
          </button>
        </div>
      </main>
    );
  }

  // Combine cover image with gallery images for the lightbox
  const allImages =
    project.images && project.images.length > 0
      ? project.images
      : [{ image_url: project.cover_image, alt_text: project.title }];

  return (
    <main className="project-detail">
      <Helmet>
        <title>{project.title} | Xeus Home</title>
        <meta name="description" content={project.meta_description || (project.description ? project.description.slice(0, 160) : `${project.title} - A ${project.category} project by Xeus Home.`)} />
        <meta property="og:title" content={`${project.title} | Xeus Home`} />
        <meta property="og:description" content={project.meta_description || (project.description ? project.description.slice(0, 160) : `${project.title} - A ${project.category} project by Xeus Home.`)} />
        <meta property="og:image" content={getImageUrl(project.cover_image)} />
        <meta property="og:url" content={`https://xeushome.ca/our-projects/${projectSlug}`} />
        <meta name="twitter:title" content={`${project.title} | Xeus Home`} />
        <meta name="twitter:description" content={project.meta_description || (project.description ? project.description.slice(0, 160) : `${project.title} - A ${project.category} project by Xeus Home.`)} />
        <meta name="twitter:image" content={getImageUrl(project.cover_image)} />
      </Helmet>
      {/* Hero */}
      <section className="project-detail__hero">
        <div
          className="project-detail__hero-bg"
          style={{ backgroundImage: `url(${getImageUrl(project.cover_image)})` }}
        ></div>
        <div className="project-detail__hero-overlay"></div>
        <div className="project-detail__hero-content">
          <button
            className="project-detail__back"
            onClick={() => navigate("/our-projects")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Projects
          </button>
          <span className="project-detail__hero-cat">{project.category}</span>
          <h1 className="project-detail__hero-title">{project.title}</h1>
          <p className="project-detail__hero-location">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {project.location}
          </p>
        </div>
      </section>

      {/* Project Info */}
      <section className="project-detail__info">
        <div className="project-detail__info-grid">
          <div className="project-detail__description">
            <h2>About This Project</h2>
            <p>{project.description}</p>
          </div>
          <div className="project-detail__meta">
            <div className="project-detail__meta-item">
              <span className="project-detail__meta-label">Location</span>
              <span className="project-detail__meta-value">
                {project.location}
              </span>
            </div>
            <div className="project-detail__meta-item">
              <span className="project-detail__meta-label">Category</span>
              <span className="project-detail__meta-value">
                {project.category}
              </span>
            </div>
            {project.completed_date && (
              <div className="project-detail__meta-item">
                <span className="project-detail__meta-label">Completed</span>
                <span className="project-detail__meta-value">
                  {project.completed_date}
                </span>
              </div>
            )}
            {project.tags && project.tags.length > 0 && (
              <div className="project-detail__tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-detail__tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="project-detail__gallery">
        <h2 className="project-detail__gallery-title">Project Gallery</h2>
        <div className="project-detail__gallery-grid">
          {allImages.map((img, i) => (
            <div
              key={i}
              className="project-detail__gallery-item"
              onClick={() => openLightbox(i)}
            >
              <img
                src={getImageUrl(img.image_url)}
                alt={img.alt_text || `${project.title} - Image ${i + 1}`}
                loading="lazy"
              />
              <div className="project-detail__gallery-hover">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Projects */}
      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section className="project-detail__related">
          <h2 className="project-detail__related-title">Related Projects</h2>
          <div className="project-detail__related-grid">
            {project.relatedProjects.map((rp, i) => (
              <ProjectCard key={rp.id} project={rp} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={allImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </main>
  );
}
