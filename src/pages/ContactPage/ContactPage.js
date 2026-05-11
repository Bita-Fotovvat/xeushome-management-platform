import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import PhoneIcon from "../../assets/icons/phone.png";
import EmailIcon from "../../assets/icons/email.png";
import "./ContactPage.scss";

export default function ContactPage() {
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            return toast.warn('Please enter your name.', { theme: "dark" });
        }
        if (!formData.phone.trim() && !formData.email.trim()) {
            return toast.warn('Please enter at least a phone number or an email address.', { theme: "dark" });
        }

        setLoading(true);

        try {
            const baseUrl = process.env.NODE_ENV === "production" ? "https://renovation-website-pdnn.onrender.com" : "http://localhost:5001";
            const response = await fetch(`${baseUrl}/api/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            toast.success('Success! You will be contacted soon.', { theme: "dark" });
            
            // Clear form
            setFormData({
                name: '',
                city: '',
                phone: '',
                email: '',
                message: ''
            });

        } catch (error) {
            console.error('Submission failed:', error);
            toast.error('Failed to submit your request. Please try again.', { theme: "dark" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="contact-page">
            <Helmet>
                <title>Contact Us | Xeus Home</title>
                <meta name="description" content="Get in touch with Xeus Home to start your premium renovation journey today." />
            </Helmet>

            <section className="contact-page__hero">
                <div className="contact-page__hero-overlay"></div>
                <div className="contact-page__hero-content">
                    <span className="contact-page__label">Get In Touch</span>
                    <h1 className="contact-page__title">Let's Build Something Beautiful</h1>
                    <p className="contact-page__subtitle">
                        Ready to start your renovation journey? Reach out to us for a free consultation and quote.
                    </p>
                    <div className="contact-page__divider"></div>
                </div>
            </section>

            <section className="contact-page__wrapper">
                {/* Form Section */}
                <div className="contact-page__form-section">
                    <div className="contact-page__form-card">
                        <h2 className="contact-page__form-title">Send an Inquiry</h2>
                        <form className="contact-page__form" onSubmit={handleSubmit}>
                            <div className="contact-page__form-row">
                                <div className="contact-page__field">
                                    <label htmlFor="name">Full Name *</label>
                                    <input 
                                        id="name"
                                        name="name" 
                                        type="text" 
                                        placeholder="John Doe"  
                                        value={formData.name} 
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact-page__field">
                                    <label htmlFor="city">City</label>
                                    <input 
                                        id="city"
                                        name="city" 
                                        type="text" 
                                        placeholder="Toronto, ON"  
                                        value={formData.city} 
                                        onChange={handleChange} 
                                    />
                                </div>
                            </div>
                            
                            <div className="contact-page__form-row">
                                <div className="contact-page__field">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input 
                                        id="phone"
                                        name="phone" 
                                        type="tel" 
                                        placeholder="(555) 123-4567" 
                                        value={formData.phone} 
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="contact-page__field">
                                    <label htmlFor="email">Email Address</label>
                                    <input 
                                        id="email"
                                        name="email" 
                                        type="email"  
                                        placeholder="john@example.com" 
                                        value={formData.email} 
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="contact-page__field contact-page__field--full">
                                <label htmlFor="message">Message Details</label>
                                <textarea 
                                    id="message"
                                    name="message" 
                                    placeholder="Tell us about your project..." 
                                    value={formData.message} 
                                    onChange={handleChange}
                                    rows="5"
                                ></textarea>
                            </div>

                            <button 
                                className="contact-page__submit" 
                                type="submit" 
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Submit Inquiry'}
                            </button>
                        </form>
                    </div>
                </div>

             {/* Info Section */}
             <div className="contact-page__info-section">
                    <div className="contact-page__info-card">
                        <h3 className="contact-page__info-title">Connect with Us</h3>
                        <p className="contact-page__info-desc">
                            We are available to answer your questions and help you plan your next home improvement project.
                        </p>
                        
                        <div className="contact-page__info-item">
                            <div className="contact-page__icon-wrapper">
                                <img src={PhoneIcon} alt="phone" />
                            </div>
                            <div className="contact-page__info-text">
                                <span>Call Us</span>
                                <strong>(437) 599-1717</strong>
                            </div>
                        </div>

                        <div className="contact-page__info-item">
                            <div className="contact-page__icon-wrapper">
                                <img src={EmailIcon} alt="email" />
                            </div>
                            <div className="contact-page__info-text">
                                <span>Email Us</span>
                                <strong>contact@xeushome.ca</strong>
                            </div>
                        </div>

                        <hr className="contact-page__separator" />

                        <div className="contact-page__hours">
                            <h4 className="contact-page__hours-title">Hours of Operation</h4>
                            <div className="contact-page__hours-row">
                                <span>Monday - Friday</span>
                                <span>8:30 AM - 6:30 PM</span>
                            </div>
                            <div className="contact-page__hours-row">
                                <span>Saturday - Sunday</span>
                                <span>8:30 AM - 6:30 PM <br/><em>(By Appt. Only)</em></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}