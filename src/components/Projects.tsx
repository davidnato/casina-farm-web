
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string | null;
}

const Project = ({ title, image_url, description, category }: Project) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={image_url || 'https://placehold.co/600x400?text=No+Image'} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-farm-earth">{title}</h3>
          {category && (
            <span className="text-farm-green font-medium bg-farm-beige px-2 py-1 rounded-md text-sm">
              {category}
            </span>
          )}
        </div>
        <p className="text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Project[];
    }
  });

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="flex justify-between mb-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-3 text-center text-red-500">
              Failed to load projects. Please try again later.
            </div>
          ) : projects && projects.length > 0 ? (
            projects.map((project) => (
              <Project key={project.id} {...project} />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No projects available at the moment.
            </div>
          )}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild className="btn-secondary">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
