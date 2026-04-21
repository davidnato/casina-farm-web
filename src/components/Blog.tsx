import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image_url: string | null;
  link: string | null;
}

interface BlogPostCardProps extends BlogPost {
  expanded: boolean;
  onToggle: () => void;
}

const BlogPostCard = ({ title, date, excerpt, image_url, link, expanded, onToggle }: BlogPostCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden shadow-md hover:shadow-lg transition-all duration-300",
        expanded && "md:col-span-3"
      )}
    >
      <div className={cn("overflow-hidden", expanded ? "h-72 md:h-96" : "h-48")}>
        <img
          src={image_url || 'https://placehold.co/600x400?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <p className="text-sm text-farm-green font-medium mb-2">{date}</p>
        <h3 className="text-xl font-semibold text-farm-earth mb-2">{title}</h3>
        <p className={cn("text-gray-700 mb-4 whitespace-pre-line", !expanded && "line-clamp-3")}>
          {excerpt}
        </p>
        {expanded ? (
          <div className="flex flex-wrap items-center gap-4">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-farm-brown hover:text-farm-green transition-colors"
              >
                Visit Source <ExternalLink size={16} className="ml-1" />
              </a>
            )}
            <button
              onClick={onToggle}
              className="inline-flex items-center text-farm-brown hover:text-farm-green transition-colors"
            >
              Show Less <ChevronUp size={16} className="ml-1" />
            </button>
          </div>
        ) : (
          <button
            onClick={onToggle}
            className="inline-flex items-center text-farm-brown hover:text-farm-green transition-colors"
          >
            Read More <ExternalLink size={16} className="ml-1" />
          </button>
        )}
      </CardContent>
    </Card>
  );
};

const Publications = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
          <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Publications and Story Maps</h2>
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
              <BlogPostCard
                key={post.id}
                {...post}
                expanded={expandedId === post.id}
                onToggle={() => setExpandedId(expandedId === post.id ? null : post.id)}
              />
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">
              No publications available at the moment.
            </div>
          )}
        </div>

        <div className="text-center mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild className="btn-primary">
            <Link to="/story-maps">Explore Story Maps</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary">
            <Link to="/blog">View All Publications</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Publications;
