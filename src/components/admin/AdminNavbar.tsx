
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("casinaAdmin");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/admin/login");
  };

  return (
    <nav className="bg-farm-green text-white shadow-md">
      <div className="farm-container py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="/lovable-uploads/0aa3d9cd-e3db-41e8-b1d7-23d27a56d0b9.png"
            alt="Casina Farms Logo"
            className="h-10"
          />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            View Website
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
