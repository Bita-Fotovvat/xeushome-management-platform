import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import blogArticles from "../../data/blogArticles";
import "./BlogDetailPage.scss";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="blog-detail">
        <Helmet>
          <title>Article Not Found | Xeus Home</title>
        </Helmet>
        <div className="blog-detail__not-found">
          <h2>Article Not Found</h2>
          <p>The article you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/blog")}>
            ← Back to Blog
          </button>
        </div>
      </main>
    );
  }

  const otherArticles = blogArticles.filter((a) => a.slug !== slug);

  const renderBlock = (block, index) => {
    switch (block.type) {
      case "heading":
        return <h2 key={index} className="blog-detail__heading">{block.text}</h2>;

      case "paragraph":
        return (
          <p key={index} className="blog-detail__paragraph">
            {block.bold && <strong>{block.bold}</strong>}
            {block.text}
          </p>
        );

      case "list":
        return (
          <ul key={index} className="blog-detail__list">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );

      case "table":
        return (
          <div key={index} className="blog-detail__table-wrap">
            <table className="blog-detail__table">
              <thead>
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "cta":
        return (
          <div key={index} className="blog-detail__inline-cta">
            <p>
              {block.text}{" "}
              <span
                className="blog-detail__inline-link"
                onClick={() => navigate(block.linkUrl)}
              >
                {block.linkText}
              </span>{" "}
              for a free consultation.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="blog-detail">
      <Helmet>
        <title>{article.seoTitle}</title>
        <meta name="description" content={article.metaDescription} />
        <meta property="og:title" content={article.seoTitle} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={`https://xeushome.ca/blog/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={article.seoTitle} />
        <meta name="twitter:description" content={article.metaDescription} />
        <link rel="canonical" href={`https://xeushome.ca/blog/${article.slug}`} />
      </Helmet>

      {/* Hero */}
      <section className="blog-detail__hero">
        <div className="blog-detail__hero-overlay"></div>
        <div className="blog-detail__hero-content">
          <button className="blog-detail__back" onClick={() => navigate("/blog")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Blog
          </button>
          <div className="blog-detail__hero-tags">
            {article.tags.map((tag) => (
              <span key={tag} className="blog-detail__hero-tag">{tag}</span>
            ))}
          </div>
          <h1 className="blog-detail__hero-title">{article.title}</h1>
          <span className="blog-detail__hero-date">
            {new Date(article.publishedDate).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </section>

      {/* Article Body */}
      <article className="blog-detail__body">
        <div className="blog-detail__content">
          {article.content.map((block, index) => renderBlock(block, index))}
        </div>
      </article>

      {/* Author / Brand */}
      <section className="blog-detail__author">
        <div className="blog-detail__author-content">
          <p className="blog-detail__author-name">Xeus Home</p>
          <p className="blog-detail__author-desc">
            Premium Renovations | Serving Hamilton, Burlington, Oakville, Mississauga, Milton, St. Catharines & the GTA
          </p>
        </div>
      </section>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="blog-detail__related">
          <h2 className="blog-detail__related-title">More Articles</h2>
          <div className="blog-detail__related-grid">
            {otherArticles.map((a) => (
              <article
                key={a.slug}
                className="blog-detail__related-card"
                onClick={() => navigate(`/blog/${a.slug}`)}
              >
                <div className="blog-detail__related-tags">
                  {a.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="blog-detail__related-tag">{tag}</span>
                  ))}
                </div>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <span className="blog-detail__related-link">
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
