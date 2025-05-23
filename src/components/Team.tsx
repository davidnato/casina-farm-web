
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const TeamMember = ({ name, role, image, bio }: TeamMemberProps) => {
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-farm-green">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-farm-beige text-farm-earth text-xl">
            {name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-semibold text-farm-earth mb-1">{name}</h3>
        <p className="text-farm-green font-medium mb-3">{role}</p>
        <p className="text-gray-600">{bio}</p>
      </CardContent>
    </Card>
  );
};

const Team = () => {
  const teamMembers = [
    {
      name: "Levis Sikwa",
      role: "Founder and Managing Director",
      image: "/lovable-uploads/levis.jpg",
      bio: "Levis Sirikwa is the visionary Founder and Managing Director of Casina Farms. With a strong background in Aquaculture and Marine Ecology, he brings deep scientific expertise and a passion for sustainable farming to every aspect of the business. Under his leadership, Casina Farms is pioneering innovative, eco-friendly approaches to aquaculture, helping to shape a more resilient and responsible food system."
    },
    {
      name: "Zipporah",
      role: "Field Operation Manager",
      image: "/lovable-uploads/ziporrah.jpg",
      bio: "Zipporah is currently a Senior  Nature Based solutions Manager at Clime Trek Limited Company where she oversees all the technical aspects of the NBS projects, Support partners in the successful implementation of NBS projects throughout the portfolio, Identifies and develop opportunities for partnerships and collaboration with relevant organizations, Plans and conducts stakeholder engagement activities and manages all NBS projects.Before Joining Clime Trek, zipporah worked at Infinite solutions as NBS manager where she was responsible for managing a team and designing project models for the company. Previous to her work at Infinite Zipporah worked as Lead Community engagement officer at Ceriops Environmental organization, where she supported the company in planning for community events, organizing for Capacity building programs, resource mobilization, high level stakeholder engagement and organized active mangrove restoration activities. Zipporah also spent one year with Base Titanium Limited as an Environmental consultant, where she Provided consultancy services for Bases Environmental Programmes for the purpose of assisting with.  Indigenous tree propagation documentation, restoration activities documentation, wetland healthy assessment documentation, preparation of tree nursery education modules for the community groups"
    },
    {
      name: "Charles Nzovu",
      role: "Beekeper",
      image: "/lovable-uploads/charles.jpg",
      bio: "Levis Sirikwa is the visionary Founder and Managing Director of Casina Farms. With a strong background in Aquaculture and Marine Ecology, he brings deep scientific expertise and a passion for sustainable farming to every aspect of the business. Under his leadership, Casina Farms is pioneering innovative, eco-friendly approaches to aquaculture, helping to shape a more resilient and responsible food system."
    },
    {
      name: "Rejean Marie Darroca",
      role: "Branding Manager",
      image: "/lovable-uploads/rajean.jpg",
      bio: "Rejean is the creative force behind the Casina Farms brand. With a background in food technology and a sharp eye for design, she brings science and storytelling together to make sure everything we do looks as good as it tastes. From packaging to campaigns, Rejean ensures our values shine through in every detail."
    },
    {
      name: "Justin Manya",
      role: "IT Director",
      image: "/lovable-uploads/justin.jpg",
      bio: "Driving digital innovation through artificial intelligence, machine learning, and data-driven solutions. He leads the development of smart agricultural systems that boost efficiency, sustainability, and decision-making across the farm’s operations."
    },
  ];

  return (
    <section id="team" className="section-padding bg-farm-cream/50">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Meet Our Team</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Our passionate team of experts is dedicated to sustainable farming and bringing the best natural products to your table.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
