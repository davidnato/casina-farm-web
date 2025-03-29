
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
              Founded in 2005, Casina Farm has been dedicated to sustainable and organic farming practices. Our 50-acre farm is nestled in the rolling hills of the countryside, where we grow seasonal vegetables, herbs, and fruits without the use of harmful pesticides.
            </p>
            <p className="text-gray-700 mb-4">
              We believe in the harmony between nature and agriculture, implementing practices that preserve the environment while producing nutritious and delicious food for our community.
            </p>
            <h3 className="text-2xl font-semibold text-farm-earth mb-4 mt-6">Our Mission</h3>
            <p className="text-gray-700">
              To provide fresh, seasonal, and sustainably grown food that nourishes both people and the planet, while educating our community about the importance of local food systems.
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
