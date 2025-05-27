
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProductProps {
  name: string;
  description: string;
  image: string;
  price: string;
  category: string;
}

const ProductCard = ({ name, description, image, price, category }: ProductProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-farm-earth">{name}</h3>
          <span className="bg-farm-beige px-2 py-1 rounded text-farm-green font-medium text-sm">{category}</span>
        </div>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-farm-green">{price}</span>
          <Button asChild className="btn-primary">
            <Link to="/payment">Order Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const products = [
    {
      name: "Mangrove Honey",
      description: "Premium honey from mangrove ecosystems. Available in 380g (Ksh. 500), 660g (Ksh. 1000), and 1kg (Ksh. 1500).",
      image: "https://casinafarms.wordpress.com/wp-content/uploads/2024/07/18.png",
      price: "From Ksh. 500",
      category: "Honey"
    },
    {
      name: "Terrestrial Honey",
      description: "Pure honey from terrestrial sources. Available in 380g (Ksh. 400), 660g (Ksh. 700), and 1kg (Ksh. 1000).",
      image: "https://casinafarms.wordpress.com/wp-content/uploads/2024/07/18.png",
      price: "From Ksh. 400",
      category: "Honey"
    },
    {
      name: "Hibiscus Dried Petals",
      description: "Premium dried hibiscus petals perfect for teas and natural remedies. Rich in antioxidants and nutrients.",
      image: "https://casinafarms.wordpress.com/wp-content/uploads/2024/07/18.png",
      price: "Ksh. 550",
      category: "Natural Products"
    },
    {
      name: "Seaweed Hair Care",
      description: "Natural seaweed-based hair products including shampoo (Ksh. 400), hair food (Ksh. 300), and more.",
      image: "https://casinafarms.wordpress.com/wp-content/uploads/2024/07/18.png",
      price: "From Ksh. 300",
      category: "Seaweed Products"
    },
    {
      name: "Seaweed Body Care",
      description: "Premium seaweed body care products including shower gel (Ksh. 400), body lotion (Ksh. 350), and bar soap (Ksh. 250).",
      image: "https://casinafarms.wordpress.com/wp-content/uploads/2024/07/18.png",
      price: "From Ksh. 250",
      category: "Seaweed Products"
    },
  ];

  return (
    <section id="products" className="section-padding bg-farm-beige/50">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Our Products</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            All our products are sustainably produced and carefully crafted to bring you the best of nature's bounty.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="btn-secondary">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
