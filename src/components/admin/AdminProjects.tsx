
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Project {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

const AdminProjects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Mangrove Honey Value Chain",
      description: "Casina Farms has partnered with coastal communities living adjacent to mangrove ecosystems to explore and revolutionize the mangrove honey value chain.",
      image_url: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Agriculture"
    },
    {
      id: "2",
      title: "Casina Farms Mkulima",
      description: "Casina Farms Mkulima is another transformative project by Casina Farms. We partner with smallholder farmers to enhance food security and promote climate justice.",
      image_url: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      category: "Community"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>({
    title: "",
    description: "",
    image_url: "",
    category: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProject({ ...currentProject, [name]: value });
  };

  const resetForm = () => {
    setCurrentProject({
      title: "",
      description: "",
      image_url: "",
      category: ""
    });
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing && currentProject.id) {
        // Simulate update API call
        setTimeout(() => {
          setProjects(projects.map(project => 
            project.id === currentProject.id ? currentProject : project
          ));
          
          toast({
            title: "Success",
            description: "Project updated successfully",
          });
          
          resetForm();
          setIsLoading(false);
        }, 500);
      } else {
        // Simulate create API call
        setTimeout(() => {
          const newId = Math.random().toString(36).substring(2, 9);
          setProjects([...projects, { ...currentProject, id: newId }]);
          
          toast({
            title: "Success",
            description: "Project created successfully",
          });
          
          resetForm();
          setIsLoading(false);
        }, 500);
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Error",
        description: "Could not save project",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    setIsLoading(true);
    try {
      // Simulate delete API call
      setTimeout(() => {
        setProjects(projects.filter(project => project.id !== id));
        
        toast({
          title: "Success",
          description: "Project deleted successfully",
        });
        
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "Could not delete project",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-farm-earth">Manage Projects</h2>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Project
        </Button>
      </div>

      {isLoading && projects.length === 0 ? (
        <div className="text-center p-10">
          <div className="animate-spin h-8 w-8 border-4 border-farm-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading projects...</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-4">
                  No projects found. Add your first project!
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {project.description}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => project.id && handleDelete(project.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Project" : "Add New Project"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={currentProject.title}
                onChange={handleInputChange}
                placeholder="Project title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={currentProject.category}
                onChange={handleInputChange}
                placeholder="e.g. Agriculture, Community, Environment"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={currentProject.description}
                onChange={handleInputChange}
                placeholder="Project description"
                required
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={currentProject.image_url}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline"
                onClick={resetForm}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : isEditing ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
