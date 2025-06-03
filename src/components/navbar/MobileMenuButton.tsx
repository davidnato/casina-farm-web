
import { Menu, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isAdmin: boolean;
  loading: boolean;
}

const MobileMenuButton = ({ isMenuOpen, toggleMenu, isAdmin, loading }: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden flex items-center">
      {!loading && isAdmin && (
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
  );
};

export default MobileMenuButton;
