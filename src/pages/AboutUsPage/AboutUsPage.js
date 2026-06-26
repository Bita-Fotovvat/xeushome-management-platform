import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import OurTeam from "../../assets/images/aboutus1.png";
import WhyHireUs from "../../assets/images/whyhireus.png";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./AboutUsPage.scss";

export default function AboutUsPage() {
    const navigate = useNavigate();

    return (
        <main className="about-page">
            <Helmet>
                <title>About Us | Xeus Home</title>
                <meta name="description" content="Meet the specialized core team and trusted network of skilled trades leading Xeus Home renovations." />
                <link rel="canonical" href="https://xeushome.ca/about-us" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://xeushome.ca" },
                        { "@type": "ListItem", "position": 2, "name": "About Us" },
                    ],
                })}</script>
            </Helmet>
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero__overlay"></div>
                <div className="about-hero__content">
                    <span className="about-hero__label">Our Story</span>
                    <h1 className="about-hero__title">Building Dreams,<br/>One Home at a Time</h1>
                    <div className="about-hero__divider"></div>
                </div>
            </section>

            <Breadcrumbs items={[{ label: "About Us" }]} />

            {/* What We Do Section */}
            <section className="about-section about-section--padded">
                <div className="container">
                    <div className="about-intro">
                        <span className="section-label">Who we are</span>
                        <h2 className="section-title">A Legacy of Excellence in Ontario</h2>
                        <div className="about-intro__content">
                            <p className="lead-text">
                                Xeus Home is a leading home remodeling and renovation company serving clients all over Ontario.
                            </p>
                            <p>
                                We specialize in a wide range of home remodeling and renovation projects, both interior and exterior. 
                                This includes full interior remodeling, additions to homes, as well as kitchen and bathroom updates, 
                                and basement overhauls. 
                            </p>
                            <p>
                                Additionally, we are proficient in the renovation and restoration of historic homes throughout the GTA. 
                                As your primary contractor, we secure all necessary permits and conduct thorough inspections, 
                                providing our clients with complete assurance and peace of mind.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="about-team">
                <div className="container">
                    <div className="team-grid">
                        <div className="team-grid__image">
                            <img src={OurTeam} alt="Our Renovation Team" />
                            <div className="team-card">
                                <h3>Dedicated Experts</h3>
                                <p>Unmatched quality from start to finish.</p>
                            </div>
                        </div>
                        <div className="team-grid__content">
                            <span className="section-label section-label--maroon">The People</span>
                            <h2 className="section-title section-title--maroon">Meet Our Team</h2>
                            <p>
                                Led by our dedicated director, Xeus Home is a specialized core team that manages 
                                every detail of your renovation with care and precision. To bring your vision to life, 
                                we collaborate with a trusted network of top-tier engineers, designers, and skilled 
                                tradespeople; from master cabinet makers to expert plumbers.
                            </p>
                            <p>
                                This allows us to deliver comprehensive, high-quality craftsmanship while preserving 
                                the personalized service and competitive pricing of a boutique firm.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Hire Us Section */}
            <section className="about-why">
                <div className="container">
                    <div className="why-grid">
                        <div className="why-grid__content">
                            <span className="section-label">The Xeus Standard</span>
                            <h2 className="section-title">Why Hire Us?</h2>
                            <p className="lead-text">
                                Embarking on a home renovation journey can be daunting. The key to a successful renovation is partnering with the right contractor.
                            </p>
                            
                            <ul className="why-list">
                                <li>
                                    <strong>Commitment to Integrity:</strong>
                                    We pledge to uphold rigorous industry standards, ensuring your project is handled with utmost care.
                                </li>
                                <li>
                                    <strong>Assurance of Quality:</strong>
                                    Forget stories of incomplete jobs or delays. Xeus Home signifies reliability and premium craftsmanship.
                                </li>
                                <li>
                                    <strong>Complete Transparency:</strong>
                                    Detailed quotes, solid warranties, and written contracts reduce risks and guarantee satisfaction.
                                </li>
                            </ul>
                        </div>
                        <div className="why-grid__image">
                            <img src={WhyHireUs} alt="Why Hire Us" />
                            <div className="why-grid__overlay"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="about-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to transform your home?</h2>
                        <p>Schedule your free, no-obligation consultation with our design team today.</p>
                        <button className="cta-btn" onClick={() => navigate("/contact-us")}>
                            Contact Us Now
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}