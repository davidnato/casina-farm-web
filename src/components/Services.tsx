
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, BookOpen, TreePine, Lightbulb, Bug, Beaker } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const coreServices = [
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

  const additionalServices = [
    {
      title: "Terrestrial Tree Nursery & Sustainable Land Restoration",
      description: "We supply local fruit trees, endangered indigenous species, and vegetable seedlings to promote farm forestry and regenerative agriculture. By restoring soil health and enhancing biodiversity, we empower farmers to create resilient landscapes that sustain both communities and nature.",
      icon: <TreePine className="h-8 w-8 text-farm-green" />
    },
    {
      title: "Expert Consultancy for Sustainable Solutions",
      description: "Casina Farms offers specialized consultancy in forestry, carbon projects, aquaculture, and mariculture—bridging technical expertise with community-driven approaches. Whether guiding carbon offset initiatives or optimizing marine ecosystems, we craft innovative strategies that align with sustainability goals.",
      icon: <Lightbulb className="h-8 w-8 text-farm-green" />
    },
    {
      title: "Technology for Environment & Agriculture",
      description: "Leveraging cutting-edge environmental and food technology, we develop solutions that enhance resource efficiency and food security. From precision agriculture to eco-friendly processing methods, our innovations drive sustainability while supporting local economies.",
      icon: <Beaker className="h-8 w-8 text-farm-green" />
    },
    {
      title: "Bee-Keeping & Natural Product Development",
      description: "With a commitment to biodiversity, Casina Farms champions bee-keeping as a key pillar of regenerative agriculture. Additionally, our production of seaweed-based goods and hibiscus products fosters sustainable livelihoods while harnessing the nutritional and commercial potential of natural resources.",
      icon: <Bug className="h-8 w-8 text-farm-green" />
    }
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700 mb-8">
            Casina Farms: Cultivating a Regenerative Future
          </p>
        </div>
        
        <Tabs defaultValue="core" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="core">Core Services</TabsTrigger>
            <TabsTrigger value="additional">Additional Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="core">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <ServiceCard 
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="additional">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {additionalServices.map((service, index) => (
                <ServiceCard 
                  key={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

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
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-farm-earth">
              Casina Farms stands at the intersection of ecological restoration, community empowerment, and sustainable innovation—shaping a greener, more resilient future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
