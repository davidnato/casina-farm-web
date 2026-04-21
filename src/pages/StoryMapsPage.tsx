import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, Leaf, Users, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

interface StoryMap {
  title: string;
  description: string;
  highlights: string[];
  link: string;
  embedUrl: string;
  type: string;
  featured?: boolean;
}

const storyMaps: StoryMap[] = [
  {
    title: "Agro-Ecological Initiatives in Jomvu and Mwawesa",
    description:
      "An interactive story map showcasing Casina Farms' partnership with GLFx Mombasa to implement agro-ecological practices in coastal Kenya. Discover how we are building sustainable food systems alongside local communities in Jomvu and Mwawesa.",
    highlights: [
      "Partnership with GLFx Mombasa",
      "Community-led agro-ecology in Jomvu & Mwawesa",
      "Restoration of coastal food systems",
    ],
    link: "https://arcg.is/1nrPfX0",
    embedUrl: "https://arcg.is/1nrPfX0",
    type: "Featured Story Map",
    featured: true,
  },
  {
    title: "Casina Farms Story Map",
    description:
      "A comprehensive journey through Casina Farms' sustainable farming initiatives, mangrove conservation efforts, and community partnerships across coastal Kenya.",
    highlights: [
      "Sustainable farming practices",
      "Mangrove and ecosystem restoration",
      "Farmer training programs",
    ],
    link: "https://storymaps.arcgis.com/stories/3c439b0ed1354893960d9c8c9c924d24",
    embedUrl:
      "https://storymaps.arcgis.com/stories/3c439b0ed1354893960d9c8c9c924d24",
    type: "Story Map",
  },
];

const StoryMapsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-farm-green/10 via-farm-beige to-farm-cream py-16 md:py-24">
        <div className="farm-container text-center">
          <div className="inline-flex items-center gap-2 bg-farm-green/10 text-farm-green px-4 py-2 rounded-full mb-4">
            <MapPin size={18} />
            <span className="text-sm font-semibold">Our Stories</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-farm-earth mb-4">
            Story Maps & Publications
          </h1>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-700 text-lg">
            Explore interactive story maps documenting our agro-ecological
            initiatives, partnerships, and impact across coastal Kenya.
          </p>
        </div>
      </section>

      {/* Story Maps */}
      <section className="section-padding">
        <div className="farm-container space-y-16">
          {storyMaps.map((sm, index) => (
            <article key={index} className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                      sm.featured
                        ? "bg-farm-green text-white"
                        : "bg-farm-beige text-farm-brown"
                    }`}
                  >
                    {sm.type}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-farm-earth">
                    {sm.title}
                  </h2>
                </div>
                <Button asChild className="btn-primary">
                  <a href={sm.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="mr-2" /> Open Story Map
                  </a>
                </Button>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                {sm.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sm.highlights.map((h, i) => {
                  const icons = [Leaf, Users, Sprout];
                  const Icon = icons[i % icons.length];
                  return (
                    <Card
                      key={i}
                      className="border-farm-green/20 bg-farm-cream/40"
                    >
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="h-9 w-9 flex items-center justify-center bg-farm-green/10 rounded-full shrink-0">
                          <Icon className="text-farm-green" size={18} />
                        </div>
                        <p className="text-sm text-farm-earth font-medium">
                          {h}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Embedded preview */}
              <div className="rounded-lg overflow-hidden border-2 border-farm-green/20 shadow-lg bg-white">
                <iframe
                  src={sm.embedUrl}
                  title={sm.title}
                  className="w-full h-[500px] md:h-[600px]"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="text-center">
                <a
                  href={sm.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-farm-green hover:text-farm-brown transition-colors font-medium"
                >
                  <ExternalLink size={16} className="mr-2" />
                  View full story map in new tab
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-farm-green/5 py-12">
        <div className="farm-container text-center">
          <h3 className="text-2xl font-bold text-farm-earth mb-3">
            Want to learn more about our work?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Get in touch to explore partnership opportunities or read our
            latest publications.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="btn-primary">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/blog">Browse Publications</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StoryMapsPage;
