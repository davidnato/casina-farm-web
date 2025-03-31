
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminHero from "@/components/admin/AdminHero";
import AdminAbout from "@/components/admin/AdminAbout";
import AdminProjects from "@/components/admin/AdminProjects";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminTeam from "@/components/admin/AdminTeam";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminResources from "@/components/admin/AdminResources";
import AdminNavbar from "@/components/admin/AdminNavbar";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("casinaAdmin");
    if (auth !== "authenticated") {
      navigate("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Checking authentication...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      
      <div className="farm-container py-8">
        <h1 className="text-3xl font-bold text-farm-green mb-6">
          Website Content Management
        </h1>
        
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hero">
            <AdminHero />
          </TabsContent>
          
          <TabsContent value="about">
            <AdminAbout />
          </TabsContent>
          
          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>
          
          <TabsContent value="products">
            <AdminProducts />
          </TabsContent>
          
          <TabsContent value="team">
            <AdminTeam />
          </TabsContent>
          
          <TabsContent value="blog">
            <AdminBlog />
          </TabsContent>
          
          <TabsContent value="resources">
            <AdminResources />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
