
const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">About Casina Farm</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold text-farm-earth mb-4">Our Story</h3>
            <p className="text-gray-700 mb-4">
              Casina Farms is a pioneering social enterprise dedicated to integrating sustainable agriculture, coastal ecosystem restoration, and community development to build resilient coastal communities. Rooted in the Kenyan coast, Casina Farms emerged from the shared struggles of smallholder farmers and the urgent need to break the cycle of poverty and hunger. By empowering these farmers — the unsung stewards of the land — the enterprise promotes fair trade, climate-resilient agriculture, and biodiversity preservation. Through sustainable farming practices, Casina Farms contributes to multiple Sustainable Development Goals (SDGs), including No Poverty (SDG 1), Climate Action (SDG 13), and Life Below Water and Life on Land (SDGs 14 & 15). The mission is to create a food system that nourishes both people and the planet, fostering a future where prosperity, community, and nature thrive together
            </p>
            <p className="text-gray-700 mb-4">
              Today, this vision is blossoming into reality. Coastal ecosystems once depleted are now vibrant with life — lush vegetation flourishes, marine life thrives, and the hum of pollinators fills the air. Coastal Kenyans, once burdened by food insecurity, now harvest abundant, nutritious produce that sustains their families. Children who once faced malnutrition now run and play with renewed vitality, nourished by nature’s bounty. Casina Farms stands as a testament to the power of sustainable farming and community resilience, where every seed sown is a step toward a healthier, more equitable future.
            </p>
            <h3 className="text-2xl font-semibold text-farm-earth mb-4 mt-6">Our Mission</h3>
            <p className="text-gray-700">
              At Casina Farms, we’re on a mission to restore ecosystems through sustainable practices, cultivating food security and economic prosperity for smallholder farmers in coastal Kenya, while fostering a flourishing natural environment
            </p>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative h-80 w-full md:h-96 md:w-80 overflow-hidden rounded-lg shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" 
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
