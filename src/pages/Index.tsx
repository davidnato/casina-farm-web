
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Team />
      <Projects />
      <Partners />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
