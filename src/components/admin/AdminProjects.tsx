
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const AdminProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Sustainable Farming Initiative",
      description: "Working with local farmers to implement sustainable farming practices.",
      imageUrl: "",
    },
    {
      id: 2,
      title: "Coastal Ecosystem Restoration",
      description: "Restoring mangroves and coastal ecosystems to protect biodiversity.",
      imageUrl: "",
    },
  ]);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProject = () => {
    if (!newProject.title) return;
    
    const id = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects([...projects, { ...newProject, id }]);
    setNewProject({ title: "", description: "", imageUrl: "" });
    
    toast({
      title: "Project added",
      description: "New project has been added successfully",
    });
  };

  const handleRemoveProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project removed",
      description: "Project has been removed successfully",
    });
  };

  const handleSaveAll = () => {
    setIsLoading(true);

    // In a real application, this would make an API call to update data
    setTimeout(() => {
      toast({
        title: "Projects updated",
        description: "All projects have been saved successfully",
      });
      setIsLoading(false);
    }, 1000);
  };

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
                <Label htmlFor="newTitle">Project Title</Label>
                <Input
                  id="newTitle"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newDescription">Description</Label>
                <Textarea
                  id="newDescription"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newImageUrl">Image URL</Label>
                <Input
                  id="newImageUrl"
                  value={newProject.imageUrl}
                  onChange={(e) =>
                    setNewProject({ ...newProject, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <Button
                className="w-full"
                onClick={handleAddProject}
                disabled={!newProject.title}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Project
              </Button>
            </div>
          </div>

          <h3 className="font-semibold mt-8 mb-4">Current Projects</h3>
          <div className="space-y-6">
            {projects.map((project) => (
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
                    <Label>Project Title</Label>
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input
                      value={project.imageUrl}
                      onChange={(e) => {
                        const updated = projects.map((p) =>
                          p.id === project.id
                            ? { ...p, imageUrl: e.target.value }
                            : p
                        );
                        setProjects(updated);
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
            {isLoading ? "Saving..." : "Save All Projects"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProjects;
