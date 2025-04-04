
import { useRef, useEffect } from "react";

interface PartnerProps {
  name: string;
  logo: string;
  description: string;
}

const Partner = ({ name, logo }: PartnerProps) => {
  return (
    <div className="flex flex-col items-center mx-4 w-40 shrink-0">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-full bg-white p-2 border border-farm-beige">
        <img src={logo} alt={name} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-lg font-semibold text-farm-earth mt-2 text-center">{name}</h3>
    </div>
  );
};

const Partners = () => {
  const partners = [
    {
      name: "Local Farmers Market",
      logo: "https://images.unsplash.com/photo-1743708882698-70c7493fc146?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "We're proud to be a regular vendor at the Local Farmers Market."
    },
    {
      name: "Organic Certification",
      logo: "https://images.unsplash.com/photo-1743708887470-f09dfde13160?q=80&w=2123&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Our farm is certified organic by the OCB."
    },
    {
      name: "Community Farm",
      logo: "/lovable-uploads/plogo2.jpg",
      description: "Supporting local community farming initiatives."
    },
    {
      name: "Conservation Trust",
      logo: "/lovable-uploads/plogo1.jpg",
      description: "Working together to preserve coastal ecosystems."
    },
    {
      name: "Agricultural College",
      logo: "/lovable-uploads/plogo3.jpg",
      description: "Partnering for education and research in sustainable farming."
    }
  ];

  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const marqueeAnimation = () => {
      if (marqueeRef.current) {
        if (marqueeRef.current.scrollLeft >= marqueeRef.current.scrollWidth / 2) {
          marqueeRef.current.scrollLeft = 0;
        } else {
          marqueeRef.current.scrollLeft += 1;
        }
      }
    };
    
    const animationInterval = setInterval(marqueeAnimation, 30);
    return () => clearInterval(animationInterval);
  }, []);

  return (
    <section id="partners" className="section-padding bg-farm-beige/30">
      <div className="farm-container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Partners</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            We collaborate with local businesses and organizations that share our commitment to sustainability and community.
          </p>
        </div>
        
        <div className="relative overflow-hidden w-full">
          <div 
            ref={marqueeRef}
            className="flex overflow-x-auto scrollbar-hide py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* First set of partners */}
            {partners.map((partner, index) => (
              <Partner key={`first-${index}`} {...partner} />
            ))}
            
            {/* Duplicate set for continuous scrolling */}
            {partners.map((partner, index) => (
              <Partner key={`second-${index}`} {...partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
