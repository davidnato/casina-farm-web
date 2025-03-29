
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface PartnerProps {
  name: string;
  logo: string;
  description: string;
}

const Partner = ({ name, logo, description }: PartnerProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-full bg-white p-2 border border-farm-beige">
        <img src={logo} alt={name} className="w-full h-full object-contain" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-farm-earth mb-2 text-center md:text-left">{name}</h3>
        <p className="text-gray-600 text-center md:text-left">{description}</p>
      </div>
    </div>
  );
};

const Partners = () => {
  const partners = [
    {
      name: "Local Farmers Market",
      logo: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "We're proud to be a regular vendor at the Local Farmers Market, bringing our fresh honey and farm products directly to the community every weekend."
    },
    {
      name: "Organic Certification Board",
      logo: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "Our farm is certified organic by the OCB, ensuring that all our products meet the highest standards of organic farming and production."
    },
    {
      name: "Farm-to-Table Restaurants",
      logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      description: "We partner with local restaurants that share our values of sustainability and quality, supplying them with our premium honey and farm products."
    },
  ];

  return (
    <section id="partners" className="section-padding bg-farm-beige/30">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Partners</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            We collaborate with local businesses and organizations that share our commitment to sustainability and community.
          </p>
        </div>
        
        <div className="space-y-6">
          {partners.map((partner, index) => (
            <Partner key={index} {...partner} />
          ))}
        </div>
        
        <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-semibold text-farm-earth mb-4 text-center">Partnership Opportunities</h3>
          <p className="text-gray-700 mb-6 text-center">
            We're always open to new partnerships with businesses and organizations that align with our values.
          </p>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Wholesale Inquiries</TableCell>
                <TableCell>For restaurants, cafes, and stores interested in selling our products</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Educational Partnerships</TableCell>
                <TableCell>For schools and educational institutions interested in farm tours and workshops</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Community Programs</TableCell>
                <TableCell>For community organizations interested in collaborative projects</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Partners;
