
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image_url: string | null;
  link: string | null;
}

const BlogPost = ({ title, date, excerpt, image_url, link }: BlogPost) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={image_url || 'https://placehold.co/600x400?text=No+Image'} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <CardContent className="p-6">
        <p className="text-sm text-farm-green font-medium mb-2">{date}</p>
        <h3 className="text-xl font-semibold text-farm-earth mb-2">{title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}</p>
        {link && (
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-farm-brown hover:text-farm-green transition-colors"
          >
            Read More <ExternalLink size={16} className="ml-1" />
          </a>
        )}
      </CardContent>
    </Card>
  );
};

const Publications = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    }
  });

  return (
    <section id="publications" className="section-padding bg-farm-cream/50">
      <div className="farm-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Publications</h2>
          <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-700">
            Explore our research papers, articles, and insights about sustainable farming and ecosystem restoration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-3 text-center text-red-500">
              Failed to load publications. Please try again later.
            </div>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => (
              <BlogPost key={post.id} {...post} />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No publications available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Publications;
