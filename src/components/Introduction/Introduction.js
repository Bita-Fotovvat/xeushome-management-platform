import { useState } from "react";
import { TabsData } from "../../data/TabsData";
import { useNavigate } from "react-router-dom";
import "./Introduction.scss";

export default function Introduction() {
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    const handleClick = (index) => {
        if (activeTab === index) return;
        setActiveTab(index);
    };

    const renderContentAsList = (content) => {
        if (Array.isArray(content)) {
            return content.map((item, index) => (
                <li className="home-services__list-item" key={index}>
                    <span className="home-services__list-bullet"></span>
                    {item}
                </li>
            ));
        } else {
            return content.split(' ').map((word, index) => (
                <li className="home-services__list-item" key={index}>
                    <span className="home-services__list-bullet"></span>
                    {word}
                </li>
            ));
        }
    };

    return (
        <section className="home-services">
            <div className="home-services__header">
                <span className="home-services__label">Expertise</span>
                <h2 className="home-services__title">Our Services at a Glance</h2>
                <div className="home-services__divider"></div>
            </div>

            <div className="home-services__container">
                <div className="home-services__tabs">
                    {TabsData.map((item, index) => (
                        <button
                            key={index}
                            className={`home-services__tab ${index === activeTab ? 'home-services__tab--active' : ''}`}
                            onClick={() => handleClick(index)}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>

                <div className="home-services__content-area">
                    {/* We map all sections but only reveal the active one for clean CSS transitions */}
                    {TabsData.map((item, index) => (
                        <div 
                            key={index}
                            className={`home-services__panel ${index === activeTab ? 'home-services__panel--active' : ''}`}
                        >
                            <div className="home-services__panel-image-wrapper">
                                <img
                                    className="home-services__panel-image"
                                    src={item.image}
                                    alt={item.tag}
                                    loading="lazy"
                                />
                            </div>
                            <div className="home-services__panel-info">
                                <h3>{item.title}</h3>
                                <ul className="home-services__list">
                                    {renderContentAsList(item.content)}
                                </ul>
                                <button 
                                    className="home-services__btn"
                                    onClick={() => navigate('/our-projects')}
                                >
                                    View Related Projects
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}