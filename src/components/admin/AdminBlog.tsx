
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, ExternalLink } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  link: string;
  date: string;
}

const AdminBlog = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Sustainable Farming Practices",
      excerpt: "Learn about our sustainable farming practices at Casina Farms.",
      imageUrl: "",
      link: "https://casinafarms.wordpress.com/post1",
      date: "2023-06-15",
    },
    {
      id: 2,
      title: "Supporting Local Communities",
      excerpt: "How Casina Farms is working with local communities.",
      imageUrl: "",
      link: "https://casinafarms.wordpress.com/post2",
      date: "2023-07-20",
    },
  ]);
  const [newPost, setNewPost] = useState<Omit<BlogPost, "id">>({
    title: "",
    excerpt: "",
    imageUrl: "",
    link: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [wordpressUrl, setWordpressUrl] = useState("https://casinafarms.wordpress.com/");

  const handleAddPost = () => {
    if (!newPost.title || !newPost.link) return;
    
    const id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    setPosts([...posts, { ...newPost, id }]);
    setNewPost({
      title: "",
      excerpt: "",
      imageUrl: "",
      link: "",
      date: new Date().toISOString().split("T")[0],
    });
    
    toast({
      title: "Blog post added",
      description: "New blog post has been added successfully",
    });
  };

  const handleRemovePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Blog post removed",
      description: "Blog post has been removed successfully",
    });
  };

  const handleSaveAll = () => {
    setIsLoading(true);

    // In a real application, this would make an API call to update data
    setTimeout(() => {
      toast({
        title: "Blog posts updated",
        description: "All blog posts have been saved successfully",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Blog Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-md p-4 mb-6">
            <h3 className="font-semibold mb-4">WordPress Integration</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wordpressUrl">WordPress Blog URL</Label>
                <div className="flex">
                  <Input
                    id="wordpressUrl"
                    value={wordpressUrl}
                    onChange={(e) => setWordpressUrl(e.target.value)}
                    placeholder="https://casinafarms.wordpress.com/"
                  />
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={() => window.open(wordpressUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is your WordPress blog URL where your blog posts are hosted
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-semibold mb-4">Add New Blog Post</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newTitle">Post Title</Label>
                <Input
                  id="newTitle"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newExcerpt">Excerpt/Summary</Label>
                <Textarea
                  id="newExcerpt"
                  value={newPost.excerpt}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      excerpt: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newLink">WordPress Post Link</Label>
                <Input
                  id="newLink"
                  value={newPost.link}
                  onChange={(e) =>
                    setNewPost({ ...newPost, link: e.target.value })
                  }
                  placeholder="https://casinafarms.wordpress.com/post-slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newImageUrl">Featured Image URL</Label>
                <Input
                  id="newImageUrl"
                  value={newPost.imageUrl}
                  onChange={(e) =>
                    setNewPost({ ...newPost, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newDate">Publication Date</Label>
                <Input
                  id="newDate"
                  type="date"
                  value={newPost.date}
                  onChange={(e) =>
                    setNewPost({ ...newPost, date: e.target.value })
                  }
                />
              </div>
              <Button
                className="w-full"
                onClick={handleAddPost}
                disabled={!newPost.title || !newPost.link}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Blog Post
              </Button>
            </div>
          </div>

          <h3 className="font-semibold mt-8 mb-4">Current Blog Posts</h3>
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="border rounded-md p-4 relative group"
              >
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemovePost(post.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <Label>Post Title</Label>
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
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      onClick={() => window.open(post.link, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> View
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Excerpt/Summary</Label>
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
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>WordPress Post Link</Label>
                      <Input
                        value={post.link}
                        onChange={(e) => {
                          const updated = posts.map((p) =>
                            p.id === post.id
                              ? { ...p, link: e.target.value }
                              : p
                          );
                          setPosts(updated);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Publication Date</Label>
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
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Featured Image URL</Label>
                    <Input
                      value={post.imageUrl}
                      onChange={(e) => {
                        const updated = posts.map((p) =>
                          p.id === post.id
                            ? { ...p, imageUrl: e.target.value }
                            : p
                        );
                        setPosts(updated);
                      }}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            className="btn-primary w-full mt-6"
            onClick={handleSaveAll}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save All Blog Posts"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBlog;
