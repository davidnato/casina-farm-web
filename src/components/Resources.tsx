import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, BookOpen, FileImage, PieChart, MapPin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  type: string;
}

const Resource = ({ title, description, icon, link, type }: ResourceProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="h-10 w-10 flex items-center justify-center bg-farm-beige rounded-full mr-4">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-farm-earth mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-farm-green bg-farm-beige/50 px-2 py-1 rounded">{type}</span>
              <Button
                size="sm" 
                className="btn-primary flex items-center" 
                variant="outline"
                asChild
              >
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <Download size={14} className="mr-1" /> Download
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Resources = () => {
  const storyMaps = [
    {
      title: "Agro-Ecological Initiatives in Jomvu and Mwawesa",
      description: "Explore our interactive story map showcasing Casina Farms' partnership with GLFx Mombasa to implement agro-ecological practices in coastal Kenya, building sustainable food systems for local communities.",
      link: "https://arcg.is/1nrPfX0",
      type: "Story Map"
    },
    {
      title: "Casina Farms Story Map",
      description: "Discover our journey and impact through this comprehensive story map featuring our sustainable farming initiatives and community partnerships.",
      link: "https://storymaps.arcgis.com/stories/3c439b0ed1354893960d9c8c9c924d24",
      displayLink: "storymaps.arcgis.com/stories/3c439b0ed...",
      type: "Story Map"
    }
  ];

  const resources = [
    {
      title: "Casina Farms Corporate Profile",
      description: "Learn about our organization, mission, values, and strategic objectives in this comprehensive overview.",
      icon: <FileText className="text-farm-green" size={20} />,
      link: "#",
      type: "Company Document"
    },
    {
      title: "Sustainable Farming Guide",
      description: "A practical guide to implementing sustainable farming practices in coastal regions of Kenya.",
      icon: <BookOpen className="text-farm-green" size={20} />,
      link: "#",
      type: "Research"
    },
    {
      title: "Annual Impact Report",
      description: "Detailed report on our environmental and community impact achievements over the past year.",
      icon: <PieChart className="text-farm-green" size={20} />,
      link: "#",
      type: "Report"
    },
    {
      title: "Casina Farms Brochure",
      description: "Visual overview of our projects, products, and partnerships for potential collaborators.",
      icon: <FileImage className="text-farm-green" size={20} />,
      link: "#",
      type: "Marketing Material"
    },
  ];

  return (
    <section id="resources" className="section-padding bg-farm-beige/30">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Resources</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Access our collection of research papers, guides, reports, and marketing materials about sustainable agriculture and coastal ecosystem restoration.
          </p>
        </div>

        {/* Story Maps Section */}
        <div className="mb-8 space-y-4">
          <h3 className="text-xl font-semibold text-farm-earth mb-4">Story Maps & Publications</h3>
          {storyMaps.map((storyMap, index) => (
            <Card key={index} className="overflow-hidden border-2 border-farm-green/30 bg-gradient-to-r from-farm-cream to-farm-beige/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="h-14 w-14 flex items-center justify-center bg-farm-green rounded-full shrink-0">
                    <MapPin className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {index === 0 && (
                        <span className="text-xs font-semibold text-white bg-farm-green px-3 py-1 rounded-full">
                          Featured Publication
                        </span>
                      )}
                      <span className="text-xs text-farm-brown bg-farm-beige px-2 py-1 rounded">
                        {storyMap.type}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-farm-earth mb-2">{storyMap.title}</h3>
                    <p className="text-gray-700 mb-4">{storyMap.description}</p>
                    <a 
                      href={storyMap.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-farm-green hover:text-farm-brown transition-colors font-medium"
                    >
                      <ExternalLink size={16} className="mr-2" /> 
                      {storyMap.displayLink || "Explore Story Map"}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <Resource key={index} {...resource} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild className="btn-secondary">
            <Link to="/resources">Browse All Resources</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Resources;
