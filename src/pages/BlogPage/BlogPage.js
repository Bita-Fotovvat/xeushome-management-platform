import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import blogArticles from "../../data/blogArticles";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./BlogPage.scss";

import heroImg from "../../assets/images/blog/kitchen-white-gold.png";
import cardImg1 from "../../assets/images/blog/kitchen-dark-island.png";
import cardImg2 from "../../assets/images/blog/bathroom-dark-vanity.png";

const CARD_IMAGES = [cardImg1, cardImg2];

export default function BlogPage() {
  const navigate = useNavigate();

  return (
    <main className="blog-page">
      <Helmet>
        <title>Blog | Xeus Home</title>
        <meta name="description" content="Renovation tips, guides, and expert advice from Xeus Home. Learn how to plan your renovation, choose the right contractor, and transform your home in Hamilton, Burlington, Mississauga, and the GTA." />
        <meta property="og:title" content="Blog | Xeus Home" />
        <meta property="og:description" content="Renovation tips, guides, and expert advice from Xeus Home." />
        <meta property="og:url" content="https://xeushome.ca/blog" />
        <link rel="canonical" href="https://xeushome.ca/blog" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://xeushome.ca" },
            { "@type": "ListItem", "position": 2, "name": "Blog" },
          ],
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="blog-hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="blog-hero__overlay"></div>
        <div className="blog-hero__content">
          <span className="blog-hero__label">Insights & Guides</span>
          <h1 className="blog-hero__title">Our Blog</h1>
          <p className="blog-hero__subtitle">
            Expert renovation advice for homeowners across Ontario
          </p>
          <div className="blog-hero__divider"></div>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Blog" }]} />

      {/* Articles Grid */}
      <section className="blog-grid">
        <div className="blog-grid__container">
          {blogArticles.map((article, index) => (
            <article
              key={article.slug}
              className="blog-card"
              onClick={() => navigate(`/blog/${article.slug}`)}
            >
              <div className="blog-card__image">
                <img
                  src={CARD_IMAGES[index] || CARD_IMAGES[0]}
                  alt={article.title}
                  loading="lazy"
                />
              </div>
              <div className="blog-card__content">
                <div className="blog-card__tags">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="blog-card__tag">{tag}</span>
                  ))}
                </div>
                <h2 className="blog-card__title">{article.title}</h2>
                <p className="blog-card__excerpt">{article.excerpt}</p>
                <div className="blog-card__footer">
                  <span className="blog-card__date">
                    {new Date(article.publishedDate).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="blog-card__read-more">
                    Read Article
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="blog-cta">
        <div className="blog-cta__content">
          <h2>Have a renovation question?</h2>
          <p>Our team is ready to help you plan your next project.</p>
          <button className="blog-cta__btn" onClick={() => navigate("/contact-us")}>
            Get in Touch
          </button>
        </div>
      </section>
    </main>
  );
}
