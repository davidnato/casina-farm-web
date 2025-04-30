
import Navbar from "@/components/Navbar";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";

const ResourcesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 pb-8">
        <Resources />
      </div>
      <Footer />
    </div>
  );
};

export default ResourcesPage;
