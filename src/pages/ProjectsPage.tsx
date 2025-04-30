
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 pb-8">
        <Projects />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
