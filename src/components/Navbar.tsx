
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NavbarLogo from './navbar/NavbarLogo';
import NavItems from './navbar/NavItems';
import MobileMenu from './navbar/MobileMenu';
import MobileMenuButton from './navbar/MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin, loading } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll events for styling and highlighting active sections
  useEffect(() => {
    const handleScroll = () => {
      // Detect if the page is scrolled down
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Update active tab based on sections when on the homepage
      if (location.pathname === '/') {
        const sections = document.querySelectorAll("[id]");
        let currentSection = "home";
        
        sections.forEach((section) => {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY - 100;
          const sectionHeight = section.clientHeight;
          const sectionId = section.getAttribute("id") || "";
          
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = sectionId;
          }
        });
        
        setActiveTab(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
  
  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname === '/') {
      // On homepage, let the scroll handler manage the active tab
      const handleInitialSectionHighlight = () => {
        const sections = document.querySelectorAll("[id]");
        if (sections.length > 0) {
          const firstVisible = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
          });
          
          if (firstVisible) {
            setActiveTab(firstVisible.id);
          } else {
            setActiveTab('home');
          }
        }
      };
      
      // Wait for content to load, then check which section is visible
      setTimeout(handleInitialSectionHighlight, 100);
    } else if (location.pathname.startsWith('/blog')) {
      setActiveTab('publications');
    } else {
      setActiveTab('home');
    }
  }, [location.pathname]);

  // Smooth scroll to section - always navigate to homepage first if not already there
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false); // Close mobile menu
    
    if (location.pathname !== '/') {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 80; // Account for navbar height
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
          setActiveTab(sectionId);
        }
      }, 100);
    } else {
      // Already on homepage, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        setActiveTab(sectionId);
      }
    }
  };

  const navItems = [
    { id: "home", label: "Home", isSection: true },
    { id: "about", label: "About", isSection: true },
    { id: "services", label: "Services", isSection: true },
    { id: "products", label: "Products", isSection: true },
    { id: "projects", label: "Projects", isSection: true },
    { id: "team", label: "Team", isSection: true },
    { id: "publications", label: "Publications", href: "/blog", isSection: false },
    { id: "contact", label: "Contact", href: "/contact", isSection: false },
  ];

  return (
    <nav 
      ref={navbarRef} 
      className={`bg-farm-beige/90 sticky top-0 z-50 shadow-sm transition-all duration-300 ${
        isScrolled ? "py-2 shadow-md" : "py-4"
      }`}
    >
      <div className="farm-container">
        <div className="flex items-center justify-between">
          <NavbarLogo onLogoClick={() => scrollToSection('home')} />
          
          <NavItems 
            navItems={navItems}
            activeTab={activeTab}
            scrollToSection={scrollToSection}
            isAdmin={isAdmin}
            loading={loading}
          />

          <MobileMenuButton 
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            isAdmin={isAdmin}
            loading={loading}
          />
        </div>

        <MobileMenu 
          isMenuOpen={isMenuOpen}
          navItems={navItems}
          activeTab={activeTab}
          scrollToSection={scrollToSection}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </nav>
  );
};

export default Navbar;
