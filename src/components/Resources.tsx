
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, BookOpen, FileImage, PieChart } from "lucide-react";

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <Resource key={index} {...resource} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button className="btn-secondary">Browse All Resources</Button>
        </div>
      </div>
    </section>
  );
};

export default Resources;
