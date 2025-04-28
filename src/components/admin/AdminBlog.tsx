
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, ExternalLink } from "lucide-react";

interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  image_url?: string;
  link?: string;
  date: string;
}

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Sustainable Food Farming in Kenya's Coastal Region",
      excerpt: "Discover how Casina Farms is revolutionizing sustainable agriculture practices on Kenya's coast, creating resilient food systems for local communities.",
      image_url: "https://images.unsplash.com/photo-1466621591366-2d5fba72006d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3",
      date: "2023-05-10"
    },
    {
      id: "2",
      title: "Empowering Local Farmers Through Education",
      excerpt: "Learn about our recent initiatives to provide agricultural training and resources to smallholder farmers in coastal Kenya.",
      image_url: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3",
      date: "2023-06-22"
    }
  ]);
  const [newPost, setNewPost] = useState<Omit<BlogPost, "id">>({
    title: "",
    excerpt: "",
    image_url: "",
    link: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.excerpt || !newPost.date) {
      toast({
        title: "Missing information",
        description: "Please provide at least a title, excerpt, and date for the blog post.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      setTimeout(() => {
        const newId = Math.random().toString(36).substring(2, 9);
        const postToAdd = { ...newPost, id: newId };
        setPosts([postToAdd, ...posts]);
        
        setNewPost({
          title: "",
          excerpt: "",
          image_url: "",
          link: "",
          date: new Date().toISOString().split("T")[0],
        });
        
        toast({
          title: "Blog post added",
          description: "New blog post has been added successfully",
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error in handleAddPost:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleUpdatePost = async (post: BlogPost) => {
    try {
      // Simulate API call
      toast({
        title: "Blog post updated",
        description: "Blog post has been updated successfully",
      });
    } catch (error) {
      console.error("Error in handleUpdatePost:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemovePost = async (id: string) => {
    try {
      // Simulate API call
      setPosts(posts.filter(post => post.id !== id));
      
      toast({
        title: "Blog post removed",
        description: "Blog post has been removed successfully",
      });
    } catch (error) {
      console.error("Error in handleRemovePost:", error);
      toast({
        title: "Error",
        description: "Failed to remove blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isInitialLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading blog posts...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Blog Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <h3 className="font-semibold mb-4">Add New Blog Post</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newTitle">Post Title*</Label>
                <Input
                  id="newTitle"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newExcerpt">Excerpt/Summary*</Label>
                <Textarea
                  id="newExcerpt"
                  value={newPost.excerpt}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      excerpt: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newLink">Post Link (Optional)</Label>
                <Input
                  id="newLink"
                  value={newPost.link || ""}
                  onChange={(e) =>
                    setNewPost({ ...newPost, link: e.target.value })
                  }
                  placeholder="https://example.com/post-slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newImageUrl">Featured Image URL</Label>
                <Input
                  id="newImageUrl"
                  value={newPost.image_url || ""}
                  onChange={(e) =>
                    setNewPost({ ...newPost, image_url: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newDate">Publication Date*</Label>
                <Input
                  id="newDate"
                  type="date"
                  value={newPost.date}
                  onChange={(e) =>
                    setNewPost({ ...newPost, date: e.target.value })
                  }
                  required
                />
              </div>
              <Button
                className="w-full"
                onClick={handleAddPost}
                disabled={loading || !newPost.title || !newPost.excerpt || !newPost.date}
              >
                <Plus className="h-4 w-4 mr-2" /> {loading ? "Adding..." : "Add Blog Post"}
              </Button>
            </div>
          </div>

          <h3 className="font-semibold mt-8 mb-4">Current Blog Posts</h3>
          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No blog posts yet. Add your first blog post above.
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded-md p-4 relative group"
                >
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => post.id && handleRemovePost(post.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-full mr-16">
                        <Label>Post Title*</Label>
                        <Input
                          value={post.title}
                          onChange={(e) => {
                            const updated = posts.map((p) =>
                              p.id === post.id
                                ? { ...p, title: e.target.value }
                                : p
                            );
                            setPosts(updated);
                          }}
                          onBlur={() => handleUpdatePost(post)}
                        />
                      </div>
                      {post.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="ml-2 mt-6"
                          onClick={() => window.open(post.link, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" /> View
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Excerpt/Summary*</Label>
                      <Textarea
                        value={post.excerpt}
                        onChange={(e) => {
                          const updated = posts.map((p) =>
                            p.id === post.id
                              ? { ...p, excerpt: e.target.value }
                              : p
                          );
                          setPosts(updated);
                        }}
                        onBlur={() => handleUpdatePost(post)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Post Link (Optional)</Label>
                        <Input
                          value={post.link || ""}
                          onChange={(e) => {
                            const updated = posts.map((p) =>
                              p.id === post.id
                                ? { ...p, link: e.target.value }
                                : p
                            );
                            setPosts(updated);
                          }}
                          onBlur={() => handleUpdatePost(post)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Publication Date*</Label>
                        <Input
                          type="date"
                          value={post.date}
                          onChange={(e) => {
                            const updated = posts.map((p) =>
                              p.id === post.id
                                ? { ...p, date: e.target.value }
                                : p
                            );
                            setPosts(updated);
                          }}
                          onBlur={() => handleUpdatePost(post)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Featured Image URL</Label>
                      <Input
                        value={post.image_url || ""}
                        onChange={(e) => {
                          const updated = posts.map((p) =>
                            p.id === post.id
                              ? { ...p, image_url: e.target.value }
                              : p
                          );
                          setPosts(updated);
                        }}
                        onBlur={() => handleUpdatePost(post)}
                        placeholder="https://example.com/image.jpg"
                      />
                      {post.image_url && (
                        <div className="mt-2 max-w-xs">
                          <img 
                            src={post.image_url} 
                            alt={post.title}
                            className="rounded-md h-20 object-cover" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBlog;
