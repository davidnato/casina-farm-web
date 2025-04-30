
import Navbar from "@/components/Navbar";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

const ProductsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 pb-8">
        <Products />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
