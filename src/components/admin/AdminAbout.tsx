
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const AdminAbout = () => {
  const { toast } = useToast();
  const [story, setStory] = useState("");
  const [storyPart2, setStoryPart2] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching about content:', error);
        return;
      }

      if (data) {
        setContentId(data.id);
        setStory(data.story_part_1);
        setStoryPart2(data.story_part_2);
        setMission(data.mission);
        setVision(data.vision);
        setImageUrl(data.image_url || "");
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData = {
        story_part_1: story,
        story_part_2: storyPart2,
        mission,
        vision,
        image_url: imageUrl || null,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (contentId) {
        // Update existing content
        result = await supabase
          .from('about_content')
          .update(updateData)
          .eq('id', contentId);
      } else {
        // Insert new content
        result = await supabase
          .from('about_content')
          .insert(updateData);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "About section updated",
        description: "Your changes have been saved successfully",
      });
    } catch (error) {
      console.error('Error updating about content:', error);
      toast({
        title: "Error",
        description: "Failed to update about section",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit About Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="story">Our Story (Part 1)</Label>
            <Textarea
              id="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storyPart2">Our Story (Part 2)</Label>
            <Textarea
              id="storyPart2"
              value={storyPart2}
              onChange={(e) => setStoryPart2(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mission">Our Mission</Label>
            <Textarea
              id="mission"
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="vision">Our Vision</Label>
            <Textarea
              id="vision"
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-muted-foreground">
              Leave empty to use default image
            </p>
          </div>

          <Button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminAbout;
