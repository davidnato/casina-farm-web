
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ProjectProps {
  title: string;
  image: string;
  description: string;
  category: string;
}

const Project = ({ title, image, description, category }: ProjectProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-farm-earth">{title}</h3>
          <span className="text-farm-green font-medium bg-farm-beige px-2 py-1 rounded-md text-sm">{category}</span>
        </div>
        <p className="text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching projects:", error);
          return;
        }

        if (data) {
          const formattedProjects = data.map((project) => ({
            title: project.title,
            description: project.description,
            image: project.image_url || "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: project.category || "Project",
          }));
          
          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Error in fetchProjects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fallback content if no projects are available yet
  const fallbackProjects = [
    {
      title: "Honey Production & Beekeeping",
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Sustainable honey production and beekeeping initiatives that support pollination and biodiversity in coastal ecosystems.",
      category: "Agriculture"
    },
    {
      title: "Community Farm Initiative",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Collaborative farming spaces where community members learn sustainable agricultural practices and grow nutritious food together.",
      category: "Community"
    },
    {
      title: "Mangrove Restoration",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Protecting and restoring critical mangrove ecosystems that serve as natural barriers against coastal erosion and climate impacts.",
      category: "Environment"
    },
    {
      title: "Farmer Training Programs",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Educational initiatives to equip local farmers with sustainable farming techniques and climate-resilient agricultural practices.",
      category: "Education"
    },
    {
      title: "Food Security Network",
      image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Creating reliable distribution chains to ensure fresh, local produce reaches communities experiencing food insecurity.",
      category: "Food Systems"
    },
    {
      title: "Youth Agricultural Engagement",
      image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Programs designed to inspire the next generation of agricultural innovators and environmental stewards.",
      category: "Education"
    },
  ];

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Projects</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Explore our ongoing initiatives aimed at promoting sustainable agriculture, ecosystem restoration, and community resilience.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden shadow-md animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, index) => (
              <Project key={index} {...project} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-10">
          <Button className="btn-secondary" asChild>
            <a href="/projects">View All Projects</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
