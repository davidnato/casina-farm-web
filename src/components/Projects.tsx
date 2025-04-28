
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  // Fallback content for projects
  const fallbackProjects = [
    {
      title: "Mangrove Honey Value Chain",
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Casina Farms has partnered with coastal communities living adjacent to mangrove ecosystems to explore and revolutionize the mangrove honey value chain. Our efforts focus on active mangrove restoration and conservation, providing a unique and sustainable source of income for local communities.",
      category: "Agriculture"
    },
    {
      title: "Casina Farms Mkulima - Innovative Climate-Smart Agriculture",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "Casina Farms Mkulima is another transformative project by Casina Farms. We partner with smallholder farmers to enhance food security and promote climate justice through innovative climate-smart agricultural practices.",
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
          {fallbackProjects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
        
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
