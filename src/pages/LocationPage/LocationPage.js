import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import locationPages from "../../data/locationPages";
import "./LocationPage.scss";

export default function LocationPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const page = locationPages.find((p) => p.slug === slug);

  if (!page) {
    return (
      <main className="location-page">
        <Helmet>
          <title>Page Not Found | Xeus Home</title>
        </Helmet>
        <div className="location-page__not-found">
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
          <button onClick={() => navigate("/")}>Go to Homepage</button>
        </div>
      </main>
    );
  }

  return (
    <main className="location-page">
      <Helmet>
        <title>{page.seoTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.seoTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:url" content={`https://xeushome.ca/services/${page.slug}`} />
        <meta name="twitter:title" content={page.seoTitle} />
        <meta name="twitter:description" content={page.metaDescription} />
        <link rel="canonical" href={`https://xeushome.ca/services/${page.slug}`} />
      </Helmet>

      {/* Hero */}
      <section className="location-hero">
        <div className="location-hero__overlay"></div>
        <div className="location-hero__content">
          <span className="location-hero__label">{page.heroLabel}</span>
          <h1 className="location-hero__title">
            {page.heroTitle.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h1>
          <div className="location-hero__divider"></div>
        </div>
      </section>

      {/* Intro */}
      <section className="location-intro">
        <div className="location-intro__container">
          <span className="location-intro__label">{page.service}</span>
          <h2 className="location-intro__title">{page.title}</h2>
          <p className="location-intro__text">{page.intro}</p>
        </div>
      </section>

      {/* Service Sections */}
      {page.sections.map((section, index) => (
        <section
          key={index}
          className={`location-section ${index % 2 === 1 ? 'location-section--alt' : ''}`}
        >
          <div className="location-section__container">
            <h2 className="location-section__heading">{section.heading}</h2>
            <p className="location-section__text">{section.text}</p>
            <ul className="location-section__list">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* Portfolio CTA */}
      <section className="location-portfolio">
        <div className="location-portfolio__container">
          <h2>See Our Work in {page.city}</h2>
          <p>
            Browse our portfolio of completed renovation projects to see the quality and craftsmanship we bring to every home.
          </p>
          <button
            className="location-portfolio__btn location-portfolio__btn--outline"
            onClick={() => navigate("/our-projects")}
          >
            View Our Projects
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="location-cta">
        <div className="location-cta__container">
          <h2>{page.ctaText}</h2>
          <p>
            Schedule a free, no-obligation consultation with our team. We will visit your home,
            discuss your vision, and provide a detailed quote — all at no cost.
          </p>
          <button
            className="location-cta__btn"
            onClick={() => navigate("/contact-us")}
          >
            {page.ctaButton}
          </button>
        </div>
      </section>

      {/* Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `${page.service} in ${page.city}`,
            "description": page.metaDescription,
            "provider": {
              "@type": "GeneralContractor",
              "name": "Xeus Home",
              "url": "https://xeushome.ca",
              "areaServed": {
                "@type": "City",
                "name": page.city,
                "addressRegion": "Ontario",
                "addressCountry": "CA"
              }
            },
            "areaServed": {
              "@type": "City",
              "name": page.city,
              "addressRegion": "Ontario",
              "addressCountry": "CA"
            },
            "url": `https://xeushome.ca/services/${page.slug}`
          })}
        </script>
      </Helmet>
    </main>
  );
}
