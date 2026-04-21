import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface StoryMap {
  title: string;
  date?: string;
  summary: string;
  body: string[];
  link: string;
}

const storyMaps: StoryMap[] = [
  {
    title: "Agro-Ecological Initiatives in Jomvu and Mwawesa",
    date: "2025",
    summary:
      "Casina Farms has partnered with GLFx Mombasa to run agro-ecological initiatives in Jomvu and Mwawesa, building sustainable food systems with coastal communities in Kenya.",
    body: [
      "This story documents the joint work between Casina Farms and GLFx Mombasa to introduce agro-ecological practices in two coastal communities, Jomvu and Mwawesa. The work focuses on soil regeneration, water conservation, agroforestry, and crop diversification, alongside training that puts farmers at the centre of decision making.",
      "The initiative also strengthens local seed systems, encourages indigenous crop varieties, and connects farmers to markets so that ecological gains translate into improved livelihoods. Through community dialogues, demonstration plots, and farmer-to-farmer exchanges, the programme is building a model of sustainable agriculture that other coastal villages can adapt.",
      "Read the full interactive story to see maps, photos, and field updates from the ground.",
    ],
    link: "https://arcg.is/1nrPfX0",
  },
  {
    title: "Casina Farms Story Map",
    summary:
      "A broader look at Casina Farms’ journey, sustainable farming initiatives, mangrove restoration work, and community partnerships across coastal Kenya.",
    body: [
      "This story map traces our work from the early days of Casina Farms through our flagship initiatives, including Waves Root and the Casina Farm Mkulima programme. It highlights how regenerative practices, training, and partnerships are shaping a healthier coastal ecosystem.",
      "It also captures the people behind the work, our farmers, trainers, and partners, and the landscapes we are helping to restore, from farmland to mangroves.",
    ],
    link: "https://storymaps.arcgis.com/stories/3c439b0ed1354893960d9c8c9c924d24",
  },
];

const StoryMapsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 farm-container py-12 md:py-16">
        <header className="mb-10 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-farm-green mb-3">
            Story Maps & Publications
          </h1>
          <div className="w-20 h-1 bg-farm-brown mb-5"></div>
          <p className="text-gray-700 leading-relaxed">
            Our story maps document Casina Farms’ work in agro-ecology,
            mangrove restoration, and community partnerships. Each entry below
            includes a short summary and a link to the full interactive story.
          </p>
        </header>

        <div className="space-y-12 max-w-3xl">
          {storyMaps.map((sm, i) => (
            <article key={i} className="border-b border-farm-beige pb-10 last:border-0">
              <h2 className="text-2xl font-semibold text-farm-earth mb-1">
                {sm.title}
              </h2>
              {sm.date && (
                <p className="text-sm text-farm-green font-medium mb-3">
                  {sm.date}
                </p>
              )}
              <p className="text-gray-800 font-medium mb-4">{sm.summary}</p>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                {sm.body.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
              <p className="mt-5">
                <a
                  href={sm.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-farm-green hover:text-farm-brown underline font-medium break-all"
                >
                  {sm.link}
                </a>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 max-w-3xl text-gray-700">
          <p>
            For more publications and updates, visit our{" "}
            <Link to="/blog" className="text-farm-green underline hover:text-farm-brown">
              Publications page
            </Link>{" "}
            or{" "}
            <Link to="/contact" className="text-farm-green underline hover:text-farm-brown">
              get in touch
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoryMapsPage;
