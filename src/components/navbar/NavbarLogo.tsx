
import { Link } from 'react-router-dom';

interface NavbarLogoProps {
  onLogoClick: () => void;
}

const NavbarLogo = ({ onLogoClick }: NavbarLogoProps) => {
  return (
    <div className="flex items-center">
      <button onClick={onLogoClick} className="flex items-center">
        <img 
          src="/lovable-uploads/0aa3d9cd-e3db-41e8-b1d7-23d27a56d0b9.png" 
          alt="Casina Farms Logo" 
          className="h-12 w-auto"
        />
      </button>
    </div>
  );
};

export default NavbarLogo;
