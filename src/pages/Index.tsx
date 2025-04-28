
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
      <About />
      <Services />
      <Products />
      <Projects />
      <Team />
      <Publications />
      <Partners />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
