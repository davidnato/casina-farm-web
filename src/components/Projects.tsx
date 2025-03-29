
import { Card, CardContent } from "@/components/ui/card";

interface ProjectProps {
  title: string;
  image: string;
  description: string;
  year: string;
}

const Project = ({ title, image, description, year }: ProjectProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-farm-earth">{title}</h3>
          <span className="text-farm-green font-medium bg-farm-beige px-2 py-1 rounded-md text-sm">{year}</span>
        </div>
        <p className="text-gray-700">{description}</p>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Honey Production Expansion",
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "We doubled our honey production capacity by adding new beehives and implementing sustainable beekeeping practices.",
      year: "2023"
    },
    {
      title: "Community Garden Initiative",
      image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "We launched a community garden program, providing space and resources for local families to grow their own organic produce.",
      year: "2022"
    },
    {
      title: "Farm-to-School Program",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      description: "We partnered with local schools to provide fresh, organic produce for school lunches and educational farm tours for students.",
      year: "2021"
    },
  ];

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Projects</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Explore some of our recent initiatives aimed at promoting sustainable agriculture and strengthening our community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
