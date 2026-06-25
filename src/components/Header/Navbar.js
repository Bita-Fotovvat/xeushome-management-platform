import "./Navbar.scss";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Navbar({open}){
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState("/");

    return open ? (
        <nav className={`navbar ${open ? 'open' : 'closed'}`}>
            <ul className="navbar__list">
                <li className={`navbar__list--item ${activeLink === '/' ? 'navbaractive':''}`} onClick={()=> {
                    navigate("/"); 
                    setActiveLink('/'); 
                    }}>Home
                </li>
                <li className={`navbar__list--item ${activeLink === '/our-projects' ? 'navbaractive':''}`} onClick={()=>{
                    navigate("/our-projects");
                    setActiveLink('/our-projects')}}>Our Projects</li>
                <li className={`navbar__list--item ${activeLink === '/about-us' ? 'navbaractive':''}`} onClick={()=>{
                    navigate("/about-us");
                    setActiveLink('/about-us')}}>About Us
                </li>
                <li className={`navbar__list--item ${activeLink === '/blog' ? 'navbaractive':''}`} onClick={()=>{
                    navigate("/blog");
                    setActiveLink('/blog')}}>Blog
                </li>
                <li className={`navbar__list--item ${activeLink === '/contact-us' ? 'navbaractive':''}`} onClick={()=>{
                    navigate("/contact-us");
                    setActiveLink('/contact-us')}}>Contact Us
                </li>
                {/* <li className="header__list--item">Log In</li>
                <li className="header__list--item">Get a Quote</li>
                <li className="header__list--item">Request an Appointment</li> */}
            </ul>
        </nav>
    ) : null;
}