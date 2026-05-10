import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import QuotationApp from "../../QuotationApp";
import "./AdminDashboard.scss";

const CATEGORIES = [
  "Full Home Renovation",
  "Kitchen Renovation",
  "Bathroom Renovation",
  "Basement Renovation",
  "Commercial/Store",
  "Exterior",
];

const BASE_URL =
  process.env.NODE_ENV === "production" ? "https://renovation-website-pdnn.onrender.com" : "http://localhost:5001";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects"); // 'projects' or 'inquiries'
  
  // Projects State
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectFormView, setProjectFormView] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [savingProject, setSavingProject] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(true);

  // Form state
  const [form, setForm] = useState({
    title: "",
    slug: "",
    location: "",
    category: "",
    meta_description: "",
    description: "",
    completed_date: "",
    featured: false,
    display_order: 0,
    tags: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = sessionStorage.getItem("adminToken");

  const authHeaders = useCallback(() => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }), [token]);

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    verifyToken();
    // eslint-disable-next-line
  }, []);

  const verifyToken = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin");
      } else {
        setIsAuthenticated(true);
        fetchProjects();
        fetchInquiries();
      }
    } catch {
      navigate("/admin");
    }
  };

  /* ----- PROJECTS LOGIC ----- */
  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const res = await fetch(`${BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      location: "",
      category: "",
      meta_description: "",
      description: "",
      completed_date: "",
      featured: false,
      display_order: 0,
      tags: "",
    });
    setCoverImage(null);
    setCoverPreview("");
    setGalleryImages([]);
    setExistingImages([]);
    setEditingProject(null);
  };

  const handleNewProject = () => {
    resetForm();
    setProjectFormView(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      location: project.location || "",
      category: project.category || "",
      meta_description: project.meta_description || "",
      description: project.description || "",
      completed_date: project.completed_date || "",
      featured: project.featured || false,
      display_order: project.display_order || 0,
      tags: (project.tags || []).join(", "),
    });
    setCoverPreview(project.cover_image ? getImageUrl(project.cover_image) : "");
    setExistingImages(project.images || []);
    setGalleryImages([]);
    setProjectFormView(true);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setGalleryImages((prev) => [...prev, ...newImages]);
  };

  const removeGalleryImage = (index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setSavingProject(true);

    try {
      let coverUrl = editingProject ? editingProject.cover_image : "";
      if (coverImage) {
        setUploadingImages(true);
        const uploaded = await uploadImage(coverImage);
        coverUrl = uploaded.image_url;
      }

      setUploadingImages(true);
      const uploadedGallery = [];
      for (const img of galleryImages) {
        const uploaded = await uploadImage(img.file);
        uploadedGallery.push({
          image_url: uploaded.image_url,
          alt_text: form.title,
        });
      }
      setUploadingImages(false);

      const allImages = [
        ...existingImages.map((img) => ({
          image_url: img.image_url,
          alt_text: img.alt_text || form.title,
        })),
        ...uploadedGallery,
      ];

      const projectData = {
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        location: form.location,
        category: form.category,
        meta_description: form.meta_description,
        description: form.description,
        cover_image: coverUrl,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        completed_date: form.completed_date,
        featured: form.featured,
        display_order: parseInt(form.display_order) || 0,
        images: allImages,
      };

      const url = editingProject
        ? `${BASE_URL}/api/projects/${editingProject.id}`
        : `${BASE_URL}/api/projects`;

      const res = await fetch(url, {
        method: editingProject ? "PUT" : "POST",
        headers: authHeaders(),
        body: JSON.stringify(projectData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save project");
      }

      await fetchProjects();
      resetForm();
      setProjectFormView(false);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setSavingProject(false);
      setUploadingImages(false);
    }
  };

  /* ----- INQUIRIES LOGIC ----- */
  const fetchInquiries = async () => {
    try {
      setLoadingInquiries(true);
      const res = await fetch(`${BASE_URL}/api/messages`, {
        headers: authHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Failed to fetch inquiries:", err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry permanently?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/messages/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.ok) {
        setInquiries(inquiries.filter((msg) => msg.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };


  /* ----- UTIL ----- */
  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${BASE_URL}${url}`;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    navigate("/admin");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  if (!isAuthenticated) {
    return <div className="admin__loading">Verifying Secure Access...</div>;
  }

  return (
    <main className="admin">
      <header className="admin__header">
        <div className="admin__header-left">
          <h1 className="admin__title">Admin Dashboard</h1>
        </div>
        <div className="admin__header-right">
          <button className="admin__btn admin__btn--ghost" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="admin__tabs">
        <button 
          className={`admin__tab ${activeTab === 'projects' ? 'admin__tab--active' : ''}`}
          onClick={() => { setActiveTab('projects'); setProjectFormView(false); }}
        >
          Projects Management ({projects.length})
        </button>
        <button 
          className={`admin__tab ${activeTab === 'inquiries' ? 'admin__tab--active' : ''}`}
          onClick={() => { setActiveTab('inquiries'); setProjectFormView(false); }}
        >
          Customer Inquiries ({inquiries.length})
        </button>
        <button 
          className={`admin__tab ${activeTab === 'quoting' ? 'admin__tab--active' : ''}`}
          onClick={() => { setActiveTab('quoting'); setProjectFormView(false); }}
        >
          Quotation Engine
        </button>
      </div>

      {activeTab === 'quoting' && (
        <section className="admin__section-content">
          <QuotationApp token={token} baseUrl={BASE_URL} />
        </section>
      )}

      {activeTab === 'projects' && (
        <section className="admin__section-content">
          <div className="admin__toolbar">
            {projectFormView ? (
              <button
                className="admin__btn admin__btn--outline"
                onClick={() => { resetForm(); setProjectFormView(false); }}
              >
                ← Back to List
              </button>
            ) : (
              <button className="admin__btn admin__btn--primary" onClick={handleNewProject}>
                + Add Project
              </button>
            )}
          </div>

          {!projectFormView ? (
            /* PROJECT LIST */
            <div className="admin__list">
              {loadingProjects ? <p>Loading projects...</p> : projects.length === 0 ? <p>No projects found.</p> : null}
              {projects.map((project) => (
                <div key={project.id} className="admin__card">
                  <div className="admin__card-image">
                    {project.cover_image && (
                      <img src={getImageUrl(project.cover_image)} alt={project.title} />
                    )}
                  </div>
                  <div className="admin__card-info">
                    <h3>{project.title}</h3>
                    <p className="admin__card-meta">
                      {project.category} • {project.location}
                    </p>
                    {project.featured && <span className="admin__card-badge">Featured</span>}
                  </div>
                  <div className="admin__card-actions">
                    <button
                      className="admin__btn admin__btn--small admin__btn--outline"
                      onClick={() => handleEditProject(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin__btn admin__btn--small admin__btn--danger"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* PROJECT FORM */
            <form className="admin__form" onSubmit={handleProjectSubmit}>
              <h2 className="admin__form-title">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h2>

              <div className="admin__form-grid">
                <div className="admin__field">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value, slug: editingProject ? form.slug : generateSlug(e.target.value) })}
                    required
                  />
                </div>
                <div className="admin__field">
                  <label>Slug *</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    required
                  />
                </div>
                <div className="admin__field">
                  <label>Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                  />
                </div>
                <div className="admin__field">
                  <label>Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="admin__field">
                  <label>Completed Date</label>
                  <input
                    type="text"
                    value={form.completed_date}
                    onChange={(e) => setForm({ ...form, completed_date: e.target.value })}
                  />
                </div>
                <div className="admin__field">
                  <label>Display Order</label>
                  <input
                    type="number"
                    value={form.display_order}
                    onChange={(e) => setForm({ ...form, display_order: e.target.value })}
                    min="0"
                  />
                </div>
              </div>

              <div className="admin__field admin__field--full">
                <label>
                  Meta Description
                  <span className={`admin__char-count ${
                    form.meta_description.length > 160 ? 'admin__char-count--over'
                    : form.meta_description.length >= 140 ? 'admin__char-count--good'
                    : ''
                  }`}>
                    {form.meta_description.length}/160
                  </span>
                </label>
                <p className="admin__field-hint">🔍 Shown in Google search results. Aim for 150–160 characters.</p>
                <textarea
                  value={form.meta_description}
                  onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                  rows="3"
                  maxLength={160}
                  placeholder="Brief summary for Google search results (150–160 characters)..."
                />
              </div>

              <div className="admin__field admin__field--full">
                <label>Full Description</label>
                <p className="admin__field-hint">📄 The detailed content visitors read on the project page. No character limit.</p>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows="8"
                  placeholder="Full detailed description of the project..."
                />
              </div>

              <div className="admin__field admin__field--full">
                <label>Tags (comma separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>

              <div className="admin__field admin__field--check">
                <label>
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  />
                  Featured Project
                </label>
              </div>

              <div className="admin__section">
                <h3>Cover Image</h3>
                <div className="admin__upload-area">
                  {coverPreview && (
                    <div className="admin__preview-cover">
                      <img src={coverPreview} alt="Cover preview" />
                    </div>
                  )}
                  <label className="admin__upload-btn">
                    <input type="file" accept="image/*" onChange={handleCoverChange} hidden />
                    {coverPreview ? "Change Cover Image" : "Upload Cover Image"}
                  </label>
                </div>
              </div>

              <div className="admin__section">
                <h3>Gallery Images</h3>
                {existingImages.length > 0 && (
                  <div className="admin__gallery-grid">
                    {existingImages.map((img, i) => (
                      <div key={`existing-${i}`} className="admin__gallery-thumb">
                        <img src={getImageUrl(img.image_url)} alt="Gallery" />
                        <button type="button" className="admin__gallery-remove" onClick={() => removeExistingImage(i)}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
                {galleryImages.length > 0 && (
                  <div className="admin__gallery-grid" style={{ marginTop: "1rem" }}>
                    {galleryImages.map((img, i) => (
                      <div key={`new-${i}`} className="admin__gallery-thumb admin__gallery-thumb--new">
                        <img src={img.preview} alt="New upload" />
                        <button type="button" className="admin__gallery-remove" onClick={() => removeGalleryImage(i)}>✕</button>
                        <span className="admin__gallery-badge">New</span>
                      </div>
                    ))}
                  </div>
                )}
                <label className="admin__upload-btn" style={{ marginTop: "1rem" }}>
                  <input type="file" accept="image/*" multiple onChange={handleGalleryChange} hidden />
                  + Add Gallery Images
                </label>
              </div>

              <div className="admin__form-actions">
                <button type="button" className="admin__btn admin__btn--outline" onClick={() => { resetForm(); setProjectFormView(false); }}>
                  Cancel
                </button>
                <button type="submit" className="admin__btn admin__btn--primary" disabled={savingProject}>
                  {savingProject ? (uploadingImages ? "Uploading..." : "Saving...") : (editingProject ? "Update Project" : "Create Project")}
                </button>
              </div>
            </form>
          )}
        </section>
      )}

      {activeTab === 'inquiries' && (
        <section className="admin__section-content">
          <div className="admin__inquiries-list">
            {loadingInquiries ? (
                <p>Loading inquiries...</p>
            ) : inquiries.length === 0 ? (
                <div className="admin__empty-state">
                  <p>No customer inquiries yet.</p>
                </div>
            ) : (
                inquiries.map((msg) => (
                  <div key={msg.id} className="admin__inquiry-card">
                    <div className="admin__inquiry-header">
                      <div className="admin__inquiry-user">
                        <h4>{msg.name}</h4>
                        <span className="admin__inquiry-date">{formatDate(msg.created_at)}</span>
                      </div>
                      <button 
                        className="admin__btn admin__btn--small admin__btn--danger"
                        onClick={() => handleDeleteInquiry(msg.id)}
                      >
                        Delete
                      </button>
                    </div>
                    
                    <div className="admin__inquiry-meta">
                      {msg.email && <span>📧 {msg.email}</span>}
                      {msg.phone && <span>📞 {msg.phone}</span>}
                      {msg.city && <span>📍 {msg.city}</span>}
                    </div>

                    <div className="admin__inquiry-message">
                      <p>{msg.message || <em>No specific message provided.</em>}</p>
                    </div>
                  </div>
                ))
            )}
          </div>
        </section>
      )}
    </main>
  );
}
