
import { useState } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-farm-beige/90 sticky top-0 z-50 shadow-sm">
      <div className="farm-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img 
                src="/lovable-uploads/0aa3d9cd-e3db-41e8-b1d7-23d27a56d0b9.png" 
                alt="Casina Farms Logo" 
                className="h-12 w-auto"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-farm-earth hover:text-farm-green font-medium">About</a>
            <a href="#products" className="text-farm-earth hover:text-farm-green font-medium">Products</a>
            <a href="#projects" className="text-farm-earth hover:text-farm-green font-medium">Projects</a>
            <a href="#team" className="text-farm-earth hover:text-farm-green font-medium">Team</a>
            <a href="#blog" className="text-farm-earth hover:text-farm-green font-medium">Blog</a>
            <a href="#resources" className="text-farm-earth hover:text-farm-green font-medium">Resources</a>
            <Button className="btn-primary">Order Now</Button>
            <Link to="/admin/login" className="text-farm-earth hover:text-farm-green inline-flex items-center gap-1 opacity-70 hover:opacity-100">
              <Lock size={16} />
              <span className="sr-only md:not-sr-only">Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/admin/login" className="text-farm-earth mr-4 opacity-70">
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
              <a 
                href="#about" 
                className="text-farm-earth hover:text-farm-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#products"
                className="text-farm-earth hover:text-farm-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </a>
              <a 
                href="#projects"
                className="text-farm-earth hover:text-farm-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a 
                href="#team" 
                className="text-farm-earth hover:text-farm-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </a>
              <a 
                href="#blog" 
                className="text-farm-earth hover:text-farm-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a 
                href="#resources" 
                className="text-farm-earth hover:text-farm-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </a>
              <Button className="btn-primary w-full mt-2">Order Now</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
