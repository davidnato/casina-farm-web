
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-farm-beige overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80')" 
        }}
      />
      <div className="farm-container relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-farm-green mb-6">
            Fresh From Our Farm To Your Table
          </h1>
          <p className="text-lg md:text-xl text-farm-earth mb-8">
            We grow organic vegetables, raise free-range chickens, and produce artisanal cheeses the old-fashioned way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="btn-primary">Learn More</Button>
            <Button className="btn-secondary">Visit Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
