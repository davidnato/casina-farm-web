
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, BookOpen } from "lucide-react";

const ServiceCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode 
}) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="w-16 h-16 bg-farm-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-farm-earth mb-3 text-center">{title}</h3>
        <p className="text-gray-700 text-center">{description}</p>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  const services = [
    {
      title: "Agricultural Training",
      description: "Educational workshops and hands-on training for sustainable farming techniques tailored to coastal environments.",
      icon: <BookOpen className="h-8 w-8 text-farm-green" />
    },
    {
      title: "Ecosystem Restoration",
      description: "Mangrove restoration and conservation projects to protect coastal ecosystems and enhance biodiversity.",
      icon: <Leaf className="h-8 w-8 text-farm-green" />
    },
    {
      title: "Community Support",
      description: "Programs designed to empower local farmers and improve food security in vulnerable coastal communities.",
      icon: <Users className="h-8 w-8 text-farm-green" />
    }
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Discover the range of sustainable agricultural services we provide to help communities thrive.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>

        <div className="mt-16 bg-farm-beige/20 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-farm-earth mb-4 text-center">Our Approach</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-farm-green mb-3">Climate-Smart Agriculture</h4>
              <p className="text-gray-700">
                We promote farming techniques that are resilient to climate change, helping farmers adapt to changing weather patterns while reducing environmental impact.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-farm-green mb-3">Sustainable Livelihoods</h4>
              <p className="text-gray-700">
                Our programs focus on creating sustainable income opportunities for coastal communities through diversified farming and value-added processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
