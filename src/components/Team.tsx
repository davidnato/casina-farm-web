
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
      name: "Maria Johnson",
      role: "Farm Owner",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      bio: "Maria founded Casina Farm with a vision to create sustainable, organic farming practices while providing the community with healthy food options."
    },
    {
      name: "David Chen",
      role: "Beekeeper",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      bio: "David manages our bee colonies with care and expertise, ensuring our honey production is of the highest quality while supporting local pollinators."
    },
    {
      name: "Sarah Williams",
      role: "Agricultural Specialist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      bio: "With a degree in agriculture, Sarah oversees our sustainable farming practices, crop rotation, and soil health management."
    },
    {
      name: "Michael Thompson",
      role: "Sales Manager",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      bio: "Michael handles our customer relationships and ensures our products reach local markets, restaurants, and community members."
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
