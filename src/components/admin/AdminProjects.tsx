
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

const AdminProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    image_url: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Fetch projects from Supabase
  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching projects:", error);
          toast({
            title: "Error",
            description: "Failed to fetch projects. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          setProjects(data);
        }
      } catch (error) {
        console.error("Error in fetchProjects:", error);
      } finally {
        setIsInitialLoading(false);
      }
    }

    fetchProjects();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        () => {
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) {
      toast({
        title: "Missing information",
        description: "Please provide at least a title and description for the project.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from("projects")
        .insert([newProject]);
      
      if (error) {
        console.error("Error adding project:", error);
        toast({
          title: "Error",
          description: "Failed to add project. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      setNewProject({
        title: "",
        description: "",
        image_url: "",
        category: "",
      });
      
      toast({
        title: "Project added",
        description: "New project has been added successfully",
      });
    } catch (error) {
      console.error("Error in handleAddProject:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async (project: Project) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({
          title: project.title,
          description: project.description,
          image_url: project.image_url,
          category: project.category,
          updated_at: new Date().toISOString(),
        })
        .eq("id", project.id);
      
      if (error) {
        console.error("Error updating project:", error);
        toast({
          title: "Error",
          description: "Failed to update project. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error in handleUpdateProject:", error);
    }
  };

  const handleRemoveProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);
      
      if (error) {
        console.error("Error removing project:", error);
        toast({
          title: "Error",
          description: "Failed to remove project. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Project removed",
        description: "Project has been removed successfully",
      });
    } catch (error) {
      console.error("Error in handleRemoveProject:", error);
    }
  };

  if (isInitialLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading projects...</CardTitle>
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
        <CardTitle>Manage Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <h3 className="font-semibold mb-4">Add New Project</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newTitle">Project Title*</Label>
                <Input
                  id="newTitle"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newDescription">Description*</Label>
                <Textarea
                  id="newDescription"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newCategory">Category</Label>
                <Input
                  id="newCategory"
                  value={newProject.category}
                  onChange={(e) =>
                    setNewProject({ ...newProject, category: e.target.value })
                  }
                  placeholder="e.g., Agriculture, Environment, Education"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newImageUrl">Image URL</Label>
                <Input
                  id="newImageUrl"
                  value={newProject.image_url}
                  onChange={(e) =>
                    setNewProject({ ...newProject, image_url: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <Button
                className="w-full"
                onClick={handleAddProject}
                disabled={loading || !newProject.title || !newProject.description}
              >
                <Plus className="h-4 w-4 mr-2" /> {loading ? "Adding..." : "Add Project"}
              </Button>
            </div>
          </div>

          <h3 className="font-semibold mt-8 mb-4">Current Projects</h3>
          <div className="space-y-6">
            {projects.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No projects yet. Add your first project above.
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-md p-4 relative group"
                >
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveProject(project.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Project Title*</Label>
                      <Input
                        value={project.title}
                        onChange={(e) => {
                          const updated = projects.map((p) =>
                            p.id === project.id
                              ? { ...p, title: e.target.value }
                              : p
                          );
                          setProjects(updated);
                        }}
                        onBlur={() => handleUpdateProject(project)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description*</Label>
                      <Textarea
                        value={project.description}
                        onChange={(e) => {
                          const updated = projects.map((p) =>
                            p.id === project.id
                              ? { ...p, description: e.target.value }
                              : p
                          );
                          setProjects(updated);
                        }}
                        onBlur={() => handleUpdateProject(project)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        value={project.category || ""}
                        onChange={(e) => {
                          const updated = projects.map((p) =>
                            p.id === project.id
                              ? { ...p, category: e.target.value }
                              : p
                          );
                          setProjects(updated);
                        }}
                        onBlur={() => handleUpdateProject(project)}
                        placeholder="e.g., Agriculture, Environment, Education"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        value={project.image_url || ""}
                        onChange={(e) => {
                          const updated = projects.map((p) =>
                            p.id === project.id
                              ? { ...p, image_url: e.target.value }
                              : p
                          );
                          setProjects(updated);
                        }}
                        onBlur={() => handleUpdateProject(project)}
                        placeholder="https://example.com/image.jpg"
                      />
                      {project.image_url && (
                        <div className="mt-2 max-w-xs">
                          <img 
                            src={project.image_url} 
                            alt={project.title}
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

export default AdminProjects;
