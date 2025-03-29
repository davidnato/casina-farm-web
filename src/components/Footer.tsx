
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-farm-green text-white">
      <div className="farm-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Casina Farm</h3>
            <p className="mb-4">
              We are committed to sustainable farming practices and providing the freshest organic produce to our community.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/casinafarms/" className="hover:text-farm-beige transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/casinafarms/" className="hover:text-farm-beige transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://chat.whatsapp.com/FmjWWJQDGie1qrAlOiK9dH" className="hover:text-farm-beige transition-colors">
                <Whatsapp size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-farm-beige transition-colors">About Us</a>
              </li>
              <li>
                <a href="#products" className="hover:text-farm-beige transition-colors">Products</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-farm-beige transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-farm-beige transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-farm-beige transition-colors">Farm Tours</a>
              </li>
              <li>
                <a href="#" className="hover:text-farm-beige transition-colors">Recipes</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to our newsletter for seasonal updates, recipes, and farm events.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md w-full text-gray-800 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-farm-brown px-4 py-2 rounded-r-md hover:bg-farm-brown/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Casina Farm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
