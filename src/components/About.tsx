
const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-farm-earth mb-4">Our Story</h3>
            <p className="text-gray-700 mb-4">
              Casina Farms is a pioneering social enterprise dedicated to integrating sustainable agriculture, coastal ecosystem restoration, and community development to build resilient coastal communities. Rooted in the <strong className="font-bold">Kenyan coast</strong>, Casina Farms emerged from the shared struggles of smallholder farmers and the urgent need to break the cycle of poverty and hunger. By empowering these farmers — the unsung stewards of the land — the enterprise promotes fair trade, climate-resilient agriculture, and biodiversity preservation.
            </p>
            <p className="text-gray-700 mb-4">
              The <strong className="font-bold">strong sense of community</strong> and <strong className="font-bold">connection to the natural landscape</strong> are defining features of coastal Kenya's culture. However, climate change, resource depletion, and economic marginalization have left many communities vulnerable. <strong className="font-bold">What if we could change this?</strong>
            </p>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-farm-earth mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-4">
                At Casina Farms, we're on a mission to restore ecosystems through sustainable practices, cultivating food security and economic prosperity for smallholder farmers in coastal Kenya, while fostering a flourishing natural environment.
              </p>
              <h3 className="text-2xl font-semibold text-farm-earth mb-4">Our Vision</h3>
              <p className="text-gray-700">
                A thriving, regenerative food system that nourishes both people and the planet, fostering a future where prosperity, community, and nature flourish together.
              </p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative h-80 w-full md:h-96 md:w-80 overflow-hidden rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Casina Farm landscape" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
