
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Gallery from "@/components/Gallery";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Resources from "@/components/Resources";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Products />
      <Team />
      <Blog />
      <Resources />
      <Partners />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Index;
