
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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
      
      // Update active tab based on sections on home page when on the homepage
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
    // Only update the active tab when we navigate to a new page, not when scrolling
    const path = location.pathname.substring(1); // Remove leading slash
    
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
    } else if (location.pathname.startsWith('/about')) {
      setActiveTab('about');
    } else {
      setActiveTab(path || 'home');
    }
  }, [location.pathname]);

  // Smooth scroll to section when clicking on a hash link
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    setIsMenuOpen(false); // Close mobile menu
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveTab(sectionId); // Update active tab immediately
    }
  };

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "about", label: "About", href: "/about" },
    { id: "services", label: "Services", href: "/#services" },
    { id: "products", label: "Products", href: "/products" },
    { id: "projects", label: "Projects", href: "/projects" },
    { id: "team", label: "Team", href: "/#team" },
    { id: "publications", label: "Publications", href: "/blog" },
    { id: "contact", label: "Contact", href: "/contact" },
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
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/0aa3d9cd-e3db-41e8-b1d7-23d27a56d0b9.png" 
                alt="Casina Farms Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              // Check if this is a hash link (section on homepage)
              const isHashLink = item.href.includes('#');
              const isActive = activeTab === item.id;
              
              // For hash links, we use onClick to scroll to that section
              return (
                <Link 
                  key={item.id}
                  to={isHashLink ? "/" : item.href}
                  onClick={(e) => {
                    if (isHashLink) {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }
                  }}
                  className={`text-farm-earth hover:text-farm-green font-medium transition-colors relative ${
                    isActive ? "text-farm-green font-semibold" : ""
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-farm-green rounded animate-fade-in"></span>
                  )}
                </Link>
              );
            })}
            <Button asChild className="btn-primary">
              <Link to="/order">Order Now</Link>
            </Button>
            <Link to="/admin" className="text-farm-earth hover:text-farm-green inline-flex items-center gap-1 opacity-70 hover:opacity-100">
              <Lock size={16} />
              <span className="sr-only md:not-sr-only">Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/admin" className="text-farm-earth mr-4 opacity-70">
              <Lock size={18} />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-farm-earth focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const isHashLink = item.href.includes('#');
                
                return (
                  <Link 
                    key={item.id}
                    to={isHashLink ? "/" : item.href}
                    onClick={(e) => {
                      if (isHashLink) {
                        e.preventDefault();
                        scrollToSection(item.id);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    className={`text-farm-earth hover:text-farm-green font-medium ${
                      activeTab === item.id ? "text-farm-green font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button asChild className="btn-primary w-full mt-2">
                <Link to="/order" onClick={() => setIsMenuOpen(false)}>Order Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
