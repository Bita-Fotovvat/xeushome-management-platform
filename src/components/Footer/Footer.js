import "./Footer.scss";
import PhoneIcon from "../../assets/icons/phone.png";
import EmailIcon from "../../assets/icons/email.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const navigate = useNavigate();
    
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <div className="footer__brand">
                    <h2 className="footer__logo-text" onClick={() => navigate("/")}>Xeus Home</h2>
                    <p className="footer__brand-sub">The home solution you deserve</p>
                </div>
                
                <div className="footer__contact">
                    <h3 className="footer__heading">Connect with Us</h3>
                    <div className="footer__info-row">
                        <img className="footer__icon" src={PhoneIcon} alt="phone" />
                        <p>(437) 599-1717</p>
                    </div>
                    <div className="footer__info-row">
                        <img className="footer__icon" src={EmailIcon} alt="email" />
                        <p>contact@xeushome.ca</p>
                    </div>
                </div>

                <div className="footer__nav">
                    <h3 className="footer__heading">Quick Links</h3>
                    <ul>
                        <li onClick={() => navigate("/")}>Home</li>
                        <li onClick={() => navigate("/our-projects")}>Our Projects</li>
                        <li onClick={() => navigate("/about-us")}>About Us</li>
                        <li onClick={() => navigate("/blog")}>Blog</li>
                        <li onClick={() => navigate("/contact-us")}>Contact Us</li>
                    </ul>
                </div>
            </div>

            <div className="footer__bottom">
                <p>Copyright © Xeus Home Ltd. {new Date().getFullYear()}. All Rights Reserved.</p>
                <p>Designed and Developed by Bita Fotovvat</p>
            </div>
        </footer>
    );
}