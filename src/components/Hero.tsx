
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative bg-farm-beige overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1743224569136-593a7094103b?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" 
        }}
      />
      <div className="farm-container relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-farm-green mb-6">
            Casina Farms
          </h1>
          <div className="space-y-2 mb-8">
            <p className="text-lg md:text-xl text-farm-earth">Building Resilience on the <strong className="font-bold">Kenyan Coast</strong></p>
            <p className="text-lg md:text-xl text-farm-earth">Restoring Ecosystems</p>
            <p className="text-lg md:text-xl text-farm-earth">Scaling a Model for Food Security and Fairness</p>
          </div>
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
