
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string | null;
  bio: string;
}

const TeamMember = ({ name, role, image, bio }: TeamMemberProps) => {
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-farm-green">
          <AvatarImage src={image || undefined} alt={name} />
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
  const [teamMembers, setTeamMembers] = useState<TeamMemberProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('name, role, bio, image_url')
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error fetching team members:', error);
          return;
        }

        const formattedMembers = data.map(member => ({
          name: member.name,
          role: member.role,
          image: member.image_url,
          bio: member.bio
        }));

        setTeamMembers(formattedMembers);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <section id="team" className="section-padding bg-farm-cream/50">
        <div className="farm-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Meet Our Team</h2>
            <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-700">Loading team members...</p>
          </div>
        </div>
      </section>
    );
  }

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
