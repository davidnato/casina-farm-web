
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string | null;
  display_order: number;
}

const AdminTeam = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image_url: '',
    display_order: 0
  });

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleSave = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      if (editingId) {
        // Update existing member
        const { error } = await supabase
          .from('team_members')
          .update({
            name: formData.name,
            role: formData.role,
            bio: formData.bio,
            image_url: formData.image_url || null,
            display_order: formData.display_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Team member updated successfully",
        });
      } else {
        // Create new member
        const { error } = await supabase
          .from('team_members')
          .insert({
            name: formData.name,
            role: formData.role,
            bio: formData.bio,
            image_url: formData.image_url || null,
            display_order: formData.display_order
          });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Team member added successfully",
        });
      }
      
      // Reset form and refresh data
      setFormData({ name: '', role: '', bio: '', image_url: '', display_order: 0 });
      setEditingId(null);
      fetchTeamMembers();
      
    } catch (error) {
      console.error('Error saving team member:', error);
      toast({
        title: "Error",
        description: "Failed to save team member",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
      image_url: member.image_url || '',
      display_order: member.display_order
    });
    setEditingId(member.id);
  };

  const handleDelete = async (id: string) => {
    if (!user || !window.confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
      
      fetchTeamMembers();
    } catch (error) {
      console.error('Error deleting team member:', error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', role: '', bio: '', image_url: '', display_order: 0 });
    setEditingId(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Form */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-4">
              {editingId ? 'Edit Team Member' : 'Add New Team Member'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Job title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  placeholder="0"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Team member biography"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleSave}
                disabled={isLoading || !formData.name || !formData.role || !formData.bio}
                className="btn-primary"
              >
                {isLoading ? "Saving..." : (editingId ? "Update" : "Add")}
              </Button>
              {editingId && (
                <Button variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </div>

          {/* Team Members List */}
          <div className="space-y-4">
            <h3 className="font-semibold">Current Team Members</h3>
            {teamMembers.length === 0 ? (
              <p className="text-muted-foreground">No team members found.</p>
            ) : (
              <div className="grid gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <p className="text-sm mt-1 line-clamp-2">{member.bio}</p>
                      {member.image_url && (
                        <img src={member.image_url} alt={member.name} className="w-16 h-16 rounded-full mt-2 object-cover" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(member.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTeam;
