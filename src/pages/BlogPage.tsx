
import Navbar from "@/components/Navbar";
import Publications from "@/components/Blog";
import Footer from "@/components/Footer";

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16 pb-8">
        <Publications />
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
