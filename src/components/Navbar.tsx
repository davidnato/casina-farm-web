
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Lock, LogIn, LogOut, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut, loading } = useAuth();

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

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
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
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => scrollToSection('home')} className="flex items-center">
              <img 
                src="/lovable-uploads/0aa3d9cd-e3db-41e8-b1d7-23d27a56d0b9.png" 
                alt="Casina Farms Logo" 
                className="h-12 w-auto"
              />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              
              if (item.isSection) {
                // For section links, use onClick to scroll
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-farm-earth hover:text-farm-green font-medium transition-colors relative ${
                      isActive ? "text-farm-green font-semibold" : ""
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-farm-green rounded animate-fade-in"></span>
                    )}
                  </button>
                );
              } else {
                // For regular page links, use Link component
                return (
                  <Link 
                    key={item.id}
                    to={item.href!}
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
              }
            })}
            
            <Button asChild className="btn-primary">
              <Link to="/payment">Order Now</Link>
            </Button>
            
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-2">
                    {isAdmin && (
                      <Link to="/admin" className="text-farm-earth hover:text-farm-green inline-flex items-center gap-1 opacity-70 hover:opacity-100">
                        <Lock size={16} />
                        <span className="sr-only md:not-sr-only">Admin</span>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      className="text-farm-earth hover:text-farm-green"
                    >
                      <LogOut size={16} className="mr-1" />
                      <span className="sr-only md:not-sr-only">Sign Out</span>
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" className="text-farm-earth hover:text-farm-green inline-flex items-center gap-1 opacity-70 hover:opacity-100">
                    <LogIn size={16} />
                    <span className="sr-only md:not-sr-only">Sign In</span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            {!loading && user && isAdmin && (
              <Link to="/admin" className="text-farm-earth mr-4 opacity-70">
                <Lock size={18} />
              </Link>
            )}
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
                if (item.isSection) {
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-farm-earth hover:text-farm-green font-medium text-left ${
                        activeTab === item.id ? "text-farm-green font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                } else {
                  return (
                    <Link 
                      key={item.id}
                      to={item.href!}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-farm-earth hover:text-farm-green font-medium ${
                        activeTab === item.id ? "text-farm-green font-semibold" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }
              })}
              <Button asChild className="btn-primary w-full mt-2">
                <Link to="/payment" onClick={() => setIsMenuOpen(false)}>Order Now</Link>
              </Button>
              
              {!loading && (
                <>
                  {user ? (
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="text-farm-earth hover:text-farm-green w-full justify-start"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <Link 
                      to="/auth" 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-farm-earth hover:text-farm-green font-medium flex items-center"
                    >
                      <LogIn size={16} className="mr-2" />
                      Sign In
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
