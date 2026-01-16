
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-farm-earth mb-4">Our Story</h3>
            <p className="text-gray-700 mb-4">
              Casina Farms is a pioneering social enterprise dedicated to integrating sustainable agriculture, coastal ecosystem restoration, and community development to build resilient coastal communities. Rooted in the <strong className="font-bold">Kenyan coast</strong>, Casina Farms emerged from the shared struggles of smallholder farmers and the urgent need to break the cycle of poverty and hunger. By empowering these farmers — the unsung stewards of the land — the enterprise promotes fair trade, climate-resilient agriculture, and biodiversity preservation.
            </p>
            <p className="text-gray-700 mb-4">
              The <strong className="font-bold">strong sense of community</strong> and <strong className="font-bold">connection to the natural landscape</strong> are defining features of coastal Kenya's culture. However, climate change, resource depletion, and economic marginalization have left many communities vulnerable. <strong className="font-bold">What if we could change this?</strong>
            </p>
            <div className="bg-farm-beige/50 border-l-4 border-farm-green p-4 rounded-r-lg mb-4">
              <p className="text-gray-700">
                <strong className="font-bold text-farm-green">Partnership Highlight:</strong> Casina Farms has partnered with <strong>GLFx Mombasa</strong> to run agro-ecological initiatives in <strong>Jomvu and Mwawesa</strong>, advancing sustainable farming practices and community resilience.{" "}
                <a 
                  href="https://arcg.is/1nrPfX0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-farm-green hover:text-farm-brown underline font-semibold"
                >
                  Explore our interactive story map →
                </a>
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-farm-earth mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                At Casina Farms, we're on a mission to restore ecosystems through sustainable practices, cultivating food security and economic prosperity for smallholder farmers in coastal Kenya, while fostering a flourishing natural environment.
              </p>
              <h3 className="text-2xl font-semibold text-farm-earth mb-4">Our Vision</h3>
              <p className="text-gray-700 mb-6">
                A thriving, regenerative food system that nourishes both people and the planet, fostering a future where prosperity, community, and nature flourish together.
              </p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative h-80 w-full md:h-96 md:w-80 overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/lovable-uploads/4.jpg" 
                alt="Casina Farm landscape" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4 text-center">Our Core Values</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-10"></div>
          
          <Card className="w-full border-farm-green/20 shadow-lg">
            <ScrollArea className="h-[70vh] w-full rounded-md">
              <Table>
                <TableHeader className="sticky top-0 bg-farm-green/10">
                  <TableRow>
                    <TableHead className="w-[100px] font-bold text-farm-green">Letter</TableHead>
                    <TableHead className="w-[150px] font-bold text-farm-green">Value</TableHead>
                    <TableHead className="font-bold text-farm-green">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">C</TableCell>
                    <TableCell className="font-semibold">Connectedness</TableCell>
                    <TableCell>Build Community through Trust: We cultivate meaningful connections with our customers, delivering personalized experiences that surpass their expectations and nurturing a sense of belonging through open communication, empathy, and mutual support.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">A</TableCell>
                    <TableCell className="font-semibold">Adaptability</TableCell>
                    <TableCell>Embrace Change: We stay agile and responsive to our evolving environment, social conditions, and opportunities, adapting our sustainable strategies to ensure long-term viability and success.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">S</TableCell>
                    <TableCell className="font-semibold">Sustainable Practices</TableCell>
                    <TableCell>Preserve the Natural World: We prioritize practices that maintain ecological balance, minimize our environmental impact, and preserve the natural world for future generations.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">I</TableCell>
                    <TableCell className="font-semibold">Innovative Solutions</TableCell>
                    <TableCell>Innovate for a Better Future: We develop and implement creative solutions to drive positive change, stay ahead of the curve, and address emerging challenges.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">N</TableCell>
                    <TableCell className="font-semibold">Nurturing Communities</TableCell>
                    <TableCell>Empower Smallholder Farmers: We foster growth, development, and well-being in our communities and ecosystems, supporting smallholder farmers to improve their livelihoods and contribute to food security.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">A</TableCell>
                    <TableCell className="font-semibold">Authenticity</TableCell>
                    <TableCell>Act with Integrity: We ensure transparency, honesty, and integrity in all our interactions and operations, taking ownership of our actions and their impact on the environment and communities.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">F</TableCell>
                    <TableCell className="font-semibold">Fairness</TableCell>
                    <TableCell>Foster Fairness: We promote equitable opportunities, fostering fair trade practices that ensure all participants in the supply chain are treated with respect and receive fair compensation.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">A</TableCell>
                    <TableCell className="font-semibold">Agility</TableCell>
                    <TableCell>Rise Above Challenges: We build resilience and adaptability, reinforcing our infrastructure and community ties to remain steadfast and productive through challenges and setbacks.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">R</TableCell>
                    <TableCell className="font-semibold">Resource Stewardship</TableCell>
                    <TableCell>Optimize Resource Utilization: We stay aware of the interconnectedness of the natural world, mindful of our actions' consequences, and strive to make informed, sustainable decisions, optimizing our resource utilization and minimizing waste.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">M</TableCell>
                    <TableCell className="font-semibold">Mutual Support</TableCell>
                    <TableCell>Maintain a Collaborative Culture: We foster a culture of collaboration, growth and development within our team through training opportunities and across partners communities and customers by sharing knowledge, best practices, and expertise to multiply our impact and drive positive change.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-bold text-xl text-farm-green">S</TableCell>
                    <TableCell className="font-semibold">Security</TableCell>
                    <TableCell>(Food Security) Provide Nutritious Food: We foster food security by promoting sustainable production practices, supporting local food systems, and ensuring access to nutritious food.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
