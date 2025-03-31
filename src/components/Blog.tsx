
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface BlogPostProps {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  url: string;
}

const BlogPost = ({ title, date, excerpt, image, url }: BlogPostProps) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardContent className="p-6">
        <p className="text-sm text-farm-green font-medium mb-2">{date}</p>
        <h3 className="text-xl font-semibold text-farm-earth mb-2">{title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}</p>
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-farm-brown hover:text-farm-green transition-colors"
        >
          Read More <ExternalLink size={16} className="ml-1" />
        </a>
      </CardContent>
    </Card>
  );
};

const Blog = () => {
  const blogPosts = [
    {
      title: "Sustainable Food Farming in Kenya's Coastal Region",
      date: "May 10, 2023",
      excerpt: "Discover how Casina Farms is revolutionizing sustainable agriculture practices on Kenya's coast, creating resilient food systems for local communities.",
      image: "https://images.unsplash.com/photo-1466621591366-2d5fba72006d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://casinafarms.wordpress.com/"
    },
    {
      title: "Empowering Local Farmers Through Education",
      date: "June 22, 2023",
      excerpt: "Learn about our recent initiatives to provide agricultural training and resources to smallholder farmers in coastal Kenya.",
      image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://casinafarms.wordpress.com/"
    },
    {
      title: "The Impact of Climate Change on Coastal Agriculture",
      date: "July 15, 2023",
      excerpt: "Exploring the challenges faced by coastal farmers due to climate change and our adaptive strategies for resilient farming.",
      image: "https://images.unsplash.com/photo-1498936178812-4b2e558d2937?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      url: "https://casinafarms.wordpress.com/"
    },
  ];

  return (
    <section id="blog" className="section-padding bg-farm-cream/50">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Latest Updates</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Stay updated with our latest news, insights, and stories from Casina Farms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogPost key={index} {...post} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button className="btn-secondary" asChild>
            <a 
              href="https://casinafarms.wordpress.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              Visit Our Blog <ExternalLink size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
