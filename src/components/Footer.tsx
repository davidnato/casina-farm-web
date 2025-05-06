
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { toast } from "sonner";
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-farm-green text-white">
      <div className="farm-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Link to="/">
                <img 
                  src="/lovable-uploads/0aa3d9cd-e3db-41e8-b1d7-23d27a56d0b9.png" 
                  alt="Casina Farms Logo" 
                  className="h-12 w-auto mr-3"
                />
              </Link>
            </div>
            <p className="mb-6 text-sm opacity-80">
              Casina Farms is a pioneering social enterprise dedicated to sustainable agriculture, 
              coastal ecosystem restoration, and community development.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-farm-beige transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-farm-beige transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-farm-beige transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-farm-beige transition-colors">Our Team</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-farm-beige transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-farm-beige transition-colors">Blog</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>Mombasa, Kenya, East Africa</span>
              </li>
              <li className="flex items-start">
                <Phone size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>(254)726 245 357</span>
              </li>
              <li className="flex items-start">
                <Mail size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>casinafarms.ke@gmail.com</span>
              </li>
            </ul>
            <div className="flex space-x-3 mt-4">
              <a href="https://www.facebook.com/casinafarms/" className="bg-white/10 hover:bg-white/30 p-2 rounded-full transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/casinafarms/" className="bg-white/10 hover:bg-white/30 p-2 rounded-full transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={18} />
              </a>
              <a href="https://chat.whatsapp.com/FmjWWJQDGie1qrAlOiK9dH" className="bg-white/10 hover:bg-white/30 p-2 rounded-full transition-colors" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Newsletter</h3>
            <p className="mb-4 text-sm">
              Subscribe for updates on our latest projects and initiatives.
            </p>
            <form className="space-y-2" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 rounded-md w-full text-gray-800 text-sm focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                type="submit" 
                className="bg-farm-brown w-full px-3 py-2 rounded-md hover:bg-farm-brown/90 transition-colors text-sm"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-farm-earth/20 py-4">
        <div className="farm-container flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Casina Farms. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="/privacy-policy" className="hover:text-farm-beige transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-farm-beige transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
