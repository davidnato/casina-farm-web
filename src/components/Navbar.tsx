
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

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
            <a href="#" className="text-2xl font-bold text-farm-green">Casina Farm</a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-farm-earth hover:text-farm-green font-medium">About</a>
            <a href="#products" className="text-farm-earth hover:text-farm-green font-medium">Products</a>
            <a href="#gallery" className="text-farm-earth hover:text-farm-green font-medium">Gallery</a>
            <a href="#contact" className="text-farm-earth hover:text-farm-green font-medium">Contact</a>
            <Button className="btn-primary">Order Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
                href="#gallery" 
                className="text-farm-earth hover:text-farm-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </a>
              <a 
                href="#contact" 
                className="text-farm-earth hover:text-farm-green font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
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
