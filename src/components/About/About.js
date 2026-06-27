import { useNavigate } from "react-router-dom";
import AboutPhoto from "../../assets/images/about.png";
import "./About.scss";

export default function About() {
    const navigate = useNavigate();

    return (
        <section className="home-about">
            <div className="home-about__container">
                
                <div className="home-about__image-column">
                    <div className="home-about__image-wrapper">
                        <img src={AboutPhoto} alt="XeusHome Renovation completed interior" className="home-about__image" loading="lazy" />
                        <div className="home-about__experience-badge">
                            <span className="home-about__years">10+</span>
                            <span className="home-about__text">Years of<br/>Experience</span>
                        </div>
                    </div>
                </div>

                <div className="home-about__content-column">
                    <span className="home-about__label">We Are Xeus Home</span>
                    <h2 className="home-about__title">Your Trusted Renovation Partner</h2>
                    
                    <p className="home-about__desc">
                        Welcome to Xeus Home, where we specialize in revitalizing spaces through exceptional renovation services.
                        With a focus on quality craftsmanship, efficiency, and affordability, we are committed to turning your vision into reality.
                    </p>
                    
                    <p className="home-about__desc">
                        Whether it's a residential upgrade or a commercial transformation, Xeus Home is your trusted partner 
                        in achieving beautiful, fast, and cost-effective renovations across Ontario.
                    </p>

                    <button 
                        className="home-about__btn"
                        onClick={() => navigate('/about-us')}
                    >
                        Learn More About Us
                    </button>
                </div>
                
            </div>
        </section>
    );
}