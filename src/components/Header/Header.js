import "./Header.scss";
import Burger from "./Burger";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    return(
    <>
    <header className="header">
        <nav className="header__nav">
            <ul className="header__list">
                <li className= "header__list--brandname" onClick={()=> navigate("/")}>Xeus Home</li>
                <li className={`header__list--item ${currentPath === '/' ? 'headeractive':''}`} onClick={()=> navigate("/")}>Home</li>
                <li className={`header__list--item ${currentPath.includes('/our-projects') ? 'headeractive':''}`} onClick={()=> navigate("/our-projects")}>Our Projects</li>
                <li className={`header__list--item ${currentPath === '/about-us' ? 'headeractive':''}`} onClick={()=> navigate("/about-us")}>About Us</li>
                <li className={`header__list--item ${currentPath.includes('/blog') ? 'headeractive':''}`} onClick={()=> navigate("/blog")}>Blog</li>
                <li className={`header__list--item ${currentPath === '/contact-us' ? 'headeractive':''}`} onClick={()=> navigate("/contact-us")}>Contact Us</li>
            </ul>
        </nav>
    </header>
    <Burger />
    </>
    )
}