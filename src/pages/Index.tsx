
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import Projects from "@/components/Projects";
import Publications from "@/components/Blog";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="products">
        <Products />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="team">
        <Team />
      </div>
      <div id="publications">
        <Publications />
      </div>
      <Gallery />
      <Partners />
      <Footer />
    </div>
  );
};

export default Index;
