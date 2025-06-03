
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Lock } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href?: string;
  isSection: boolean;
}

interface NavItemsProps {
  navItems: NavItem[];
  activeTab: string;
  scrollToSection: (sectionId: string) => void;
  isAdmin: boolean;
  loading: boolean;
}

const NavItems = ({ navItems, activeTab, scrollToSection, isAdmin, loading }: NavItemsProps) => {
  return (
    <div className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        
        if (item.isSection) {
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
      
      {!loading && isAdmin && (
        <Link to="/admin" className="text-farm-earth hover:text-farm-green inline-flex items-center gap-1 opacity-70 hover:opacity-100">
          <Lock size={16} />
          <span className="sr-only md:not-sr-only">Admin</span>
        </Link>
      )}
    </div>
  );
};

export default NavItems;
