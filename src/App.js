import './App.scss';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Header from "../src/components/Header/Header";
import HomePage from './pages/HomePage/HomePage';
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import OurProjectsPage from './pages/OurProjectsPage/OurProjects';
import ProjectDetailPage from './pages/ProjectDetailPage/ProjectDetailPage';
import BlogPage from './pages/BlogPage/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage/BlogDetailPage';
import AdminLogin from './pages/AdminPage/AdminLogin';
import AdminDashboard from './pages/AdminPage/AdminDashboard';
import Footer from "./components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Legacy route mapping - redirects old URLs to new dynamic routes
const LEGACY_ROUTES = {
  'niagara-project-no.1': 'niagara-project-1',
  'oakville-project-no.1': 'oakville-project-1',
  'ancaster-project-no.1': 'ancaster-project-1',
  'burlington-project-no.1': 'burlington-project-1',
  'mississauga-store-project-no.1': 'mississauga-store-project-1',
  'milton-project-no.1': 'milton-project-1',
  'burlington-project-no.2': 'burlington-project-2',
  'colborne-project-no.1': 'colborne-project-1',
  'mississauga-project-no.2': 'mississauga-project-2',
  'toronto-project-no.1': 'toronto-project-1',
  'oakville-project-no.2': 'oakville-project-2',
  'toronto-project-no.2': 'toronto-project-2',
};

function LegacyRedirect() {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const oldSlug = pathParts[pathParts.length - 1];
  const newSlug = LEGACY_ROUTES[oldSlug];
  
  if (newSlug) {
    return <Navigate to={`/our-projects/${newSlug}`} replace />;
  }
  return <Navigate to="/our-projects" replace />;
}

function App() {
  const FooterWithCondition = () => {
    const location = useLocation();
    // Hide footer on contact page and admin pages
    if (location.pathname === '/contact-us' || location.pathname.startsWith('/admin')) {
      return null;
    }
    return <Footer />;
  };

  const HeaderWithCondition = () => {
    const location = useLocation();
    // Hide header on admin pages
    if (location.pathname.startsWith('/admin')) {
      return null;
    }
    return <Header />;
  };

  const ScrollToTop = () => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    }, [location]);
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop></ScrollToTop>
        <ToastContainer
        position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
        <HeaderWithCondition />
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-projects" element={<OurProjectsPage/>} /> 
          
          {/* Dynamic project detail page */}
          <Route path="/our-projects/:projectSlug" element={<ProjectDetailPage/>} />
          
          {/* Legacy redirects for old URLs */}
          <Route path="/our-projects/niagara-project-no.1" element={<LegacyRedirect />} />
          <Route path="/our-projects/oakville-project-no.1" element={<LegacyRedirect />} />
          <Route path="/our-projects/ancaster-project-no.1" element={<LegacyRedirect />} />
          <Route path="/our-projects/burlington-project-no.1" element={<LegacyRedirect />} />
          <Route path="/our-projects/mississauga-store-project-no.1" element={<LegacyRedirect />} />
          <Route path="/our-projects/milton-project-no.1" element={<LegacyRedirect />} />
          <Route path="/our-projects/burlington-project-no.2" element={<LegacyRedirect />} />
          <Route path="/our-projects/colborne-project-no.1" element={<LegacyRedirect />} />
          <Route path="/our-projects/mississauga-project-no.2" element={<LegacyRedirect />} />
          <Route path="/our-projects/toronto-project-no.1" element={<LegacyRedirect />} />
          <Route path="/our-projects/oakville-project-no.2" element={<LegacyRedirect />} />
          <Route path="/our-projects/toronto-project-no.2" element={<LegacyRedirect />} />

          <Route path="/about-us" element={<AboutUsPage/>} />
          <Route path="/blog" element={<BlogPage/>} />
          <Route path="/blog/:slug" element={<BlogDetailPage/>} />
          <Route path="/contact-us" element={<ContactPage/>} />
          
          {/* Admin routes (hidden) */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        <FooterWithCondition/>
      </BrowserRouter>
    </HelmetProvider>
  );
}
export default App;