
import { Button } from "@/components/ui/button";

interface ProductProps {
  name: string;
  description: string;
  image: string;
  price: string;
}

const ProductCard = ({ name, description, image, price }: ProductProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-farm-earth">{name}</h3>
          <span className="bg-farm-beige px-2 py-1 rounded text-farm-green font-medium">{price}</span>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button className="btn-primary w-full">Add to Cart</Button>
      </div>
    </div>
  );
};

const Products = () => {
  const products = [
    {
      name: "1L Mangrove Honey",
      description: "A seasonal selection of our freshest organic vegetables, harvested daily from our fields.",
      image: "https://photos.fife.usercontent.google.com/pw/AP1GczNQ7HKdXKAFaqZywzvLj2jkFt6RrdazUQMWrcgwmrtYrMPeeLxpUohs-Q=w1348-h953-s-no-gm?authuser=0",
      price: "$25.00"
    },
    {
      name: "380ml Mangrove Honey",
      description: "Farm-fresh eggs from our happy, free-range chickens fed with organic feed.",
      image: "https://photos.fife.usercontent.google.com/pw/AP1GczNQ7HKdXKAFaqZywzvLj2jkFt6RrdazUQMWrcgwmrtYrMPeeLxpUohs-Q=w1348-h953-s-no-gm?authuser=0",
      price: "$6.50"
    },
    {
      name: "100ml Mangrove Honey",
      description: "Handcrafted goat cheese made from the milk of our own goats, aged to perfection.",
      image: "https://photos.fife.usercontent.google.com/pw/AP1GczNQ7HKdXKAFaqZywzvLj2jkFt6RrdazUQMWrcgwmrtYrMPeeLxpUohs-Q=w1348-h953-s-no-gm?authuser=0",
      price: "$8.75"
    },
    {
      name: "Customize a Package",
      description: "Pure, raw honey collected from our own beehives located in our flowering meadows.",
      image: "https://photos.fife.usercontent.google.com/pw/AP1GczNQ7HKdXKAFaqZywzvLj2jkFt6RrdazUQMWrcgwmrtYrMPeeLxpUohs-Q=w1348-h953-s-no-gm?authuser=0",
      price: "$12.00"
    },
  ];

  return (
    <section id="products" className="section-padding bg-farm-beige/50">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Products</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            All our products are grown and made with care on our farm, following sustainable practices and traditional methods.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="btn-secondary">View All Products</Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
