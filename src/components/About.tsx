
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
              <p className="text-gray-700 mb-6">
                A thriving, regenerative food system that nourishes both people and the planet, fostering a future where prosperity, community, and nature flourish together.
              </p>
              
              <h3 className="text-2xl font-semibold text-farm-earth mb-4">Our Core Values</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse mb-6">
                  <thead>
                    <tr className="bg-farm-green/10">
                      <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">C - Connectedness</td>
                      <td className="border border-gray-300 px-4 py-2">Build Community through Trust: We cultivate meaningful connections with our customers, delivering personalized experiences that surpass their expectations and nurturing a sense of belonging through open communication, empathy, and mutual support.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">A - Adaptability</td>
                      <td className="border border-gray-300 px-4 py-2">Embrace Change: We stay agile and responsive to our evolving environment, social conditions, and opportunities, adapting our sustainable strategies to ensure long-term viability and success.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">S - Sustainable Practices</td>
                      <td className="border border-gray-300 px-4 py-2">Preserve the Natural World: We prioritize practices that maintain ecological balance, minimize our environmental impact, and preserve the natural world for future generations.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">I - Innovative Solutions</td>
                      <td className="border border-gray-300 px-4 py-2">Innovate for a Better Future: We develop and implement creative solutions to drive positive change, stay ahead of the curve, and address emerging challenges.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">N - Nurturing Communities</td>
                      <td className="border border-gray-300 px-4 py-2">Empower Smallholder Farmers: We foster growth, development, and well-being in our communities and ecosystems, supporting smallholder farmers to improve their livelihoods and contribute to food security.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">A - Authenticity</td>
                      <td className="border border-gray-300 px-4 py-2">Act with Integrity: We ensure transparency, honesty, and integrity in all our interactions and operations, taking ownership of our actions and their impact on the environment and communities.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">F - Fairness</td>
                      <td className="border border-gray-300 px-4 py-2">Foster Fairness: We promote equitable opportunities, fostering fair trade practices that ensure all participants in the supply chain are treated with respect and receive fair compensation.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">A - Agility</td>
                      <td className="border border-gray-300 px-4 py-2">Rise Above Challenges: We build resilience and adaptability, reinforcing our infrastructure and community ties to remain steadfast and productive through challenges and setbacks.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">R - Resource Stewardship</td>
                      <td className="border border-gray-300 px-4 py-2">Optimize Resource Utilization: We stay aware of the interconnectedness of the natural world, mindful of our actions' consequences, and strive to make informed, sustainable decisions, optimizing our resource utilization and minimizing waste.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">M - Mutual Support</td>
                      <td className="border border-gray-300 px-4 py-2">Maintain a Collaborative Culture: We foster a culture of collaboration, growth and development within our team through training opportunities and across partners communities and customers by sharing knowledge, best practices, and expertise to multiply our impact and drive positive change.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-semibold">S - Security</td>
                      <td className="border border-gray-300 px-4 py-2">(Food Security) Provide Nutritious Food: We foster food security by promoting sustainable production practices, supporting local food systems, and ensuring access to nutritious food.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
