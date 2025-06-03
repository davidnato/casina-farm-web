
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface NavItem {
  id: string;
  label: string;
  href?: string;
  isSection: boolean;
}

interface MobileMenuProps {
  isMenuOpen: boolean;
  navItems: NavItem[];
  activeTab: string;
  scrollToSection: (sectionId: string) => void;
  setIsMenuOpen: (open: boolean) => void;
}

const MobileMenu = ({ isMenuOpen, navItems, activeTab, scrollToSection, setIsMenuOpen }: MobileMenuProps) => {
  if (!isMenuOpen) return null;

  return (
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
      </div>
    </div>
  );
};

export default MobileMenu;
