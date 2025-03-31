
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, ExternalLink, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Resource {
  id: number;
  title: string;
  description: string;
  type: "document" | "research" | "profile" | "marketing";
  fileUrl: string;
}

const AdminResources = () => {
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "Casina Farms Corporate Profile",
      description: "Official corporate profile for Casina Farms",
      type: "profile",
      fileUrl: "#",
    },
    {
      id: 2,
      title: "2023 Impact Report",
      description: "Annual report on our impact and activities",
      type: "research",
      fileUrl: "#",
    },
  ]);
  const [newResource, setNewResource] = useState<Omit<Resource, "id">>({
    title: "",
    description: "",
    type: "document",
    fileUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddResource = () => {
    if (!newResource.title || !newResource.fileUrl) return;
    
    const id = resources.length ? Math.max(...resources.map(r => r.id)) + 1 : 1;
    setResources([...resources, { ...newResource, id }]);
    setNewResource({
      title: "",
      description: "",
      type: "document",
      fileUrl: "",
    });
    
    toast({
      title: "Resource added",
      description: "New resource has been added successfully",
    });
  };

  const handleRemoveResource = (id: number) => {
    setResources(resources.filter(resource => resource.id !== id));
    toast({
      title: "Resource removed",
      description: "Resource has been removed successfully",
    });
  };

  const handleSaveAll = () => {
    setIsLoading(true);

    // In a real application, this would make an API call to update data
    setTimeout(() => {
      toast({
        title: "Resources updated",
        description: "All resources have been saved successfully",
      });
      setIsLoading(false);
    }, 1000);
  };

  const resourceTypeOptions = [
    { value: "document", label: "Document" },
    { value: "research", label: "Research Paper" },
    { value: "profile", label: "Corporate Profile" },
    { value: "marketing", label: "Marketing Material" },
  ];

  const getTypeLabel = (type: string) => {
    return resourceTypeOptions.find(option => option.value === type)?.label || type;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-md p-4">
            <h3 className="font-semibold mb-4">Add New Resource</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newTitle">Resource Title</Label>
                <Input
                  id="newTitle"
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newDescription">Description</Label>
                <Textarea
                  id="newDescription"
                  value={newResource.description}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newType">Resource Type</Label>
                <Select
                  value={newResource.type}
                  onValueChange={(value) =>
                    setNewResource({
                      ...newResource,
                      type: value as Resource["type"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    {resourceTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newFileUrl">File URL</Label>
                <Input
                  id="newFileUrl"
                  value={newResource.fileUrl}
                  onChange={(e) =>
                    setNewResource({ ...newResource, fileUrl: e.target.value })
                  }
                  placeholder="https://example.com/document.pdf"
                />
                <p className="text-sm text-muted-foreground">
                  Link to the resource file (PDF, DOCX, etc.)
                </p>
              </div>
              <Button
                className="w-full"
                onClick={handleAddResource}
                disabled={!newResource.title || !newResource.fileUrl}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Resource
              </Button>
            </div>
          </div>

          <h3 className="font-semibold mt-8 mb-4">Current Resources</h3>
          <div className="space-y-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="border rounded-md p-4 relative group"
              >
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveResource(resource.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex-1">
                      <Label>Resource Title</Label>
                      <Input
                        value={resource.title}
                        onChange={(e) => {
                          const updated = resources.map((r) =>
                            r.id === resource.id
                              ? { ...r, title: e.target.value }
                              : r
                          );
                          setResources(updated);
                        }}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 whitespace-nowrap"
                      onClick={() => window.open(resource.fileUrl, "_blank")}
                    >
                      <FileText className="h-4 w-4 mr-1" /> View File
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={resource.description}
                      onChange={(e) => {
                        const updated = resources.map((r) =>
                          r.id === resource.id
                            ? { ...r, description: e.target.value }
                            : r
                        );
                        setResources(updated);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Resource Type</Label>
                      <Select
                        value={resource.type}
                        onValueChange={(value) => {
                          const updated = resources.map((r) =>
                            r.id === resource.id
                              ? { ...r, type: value as Resource["type"] }
                              : r
                          );
                          setResources(updated);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {resourceTypeOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>File URL</Label>
                      <Input
                        value={resource.fileUrl}
                        onChange={(e) => {
                          const updated = resources.map((r) =>
                            r.id === resource.id
                              ? { ...r, fileUrl: e.target.value }
                              : r
                          );
                          setResources(updated);
                        }}
                      />
                    </div>
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
            {isLoading ? "Saving..." : "Save All Resources"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminResources;
