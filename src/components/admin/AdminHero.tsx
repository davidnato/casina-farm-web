
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const AdminHero = () => {
  const { toast } = useToast();
  const [headline, setHeadline] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [bgImage, setBgImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const fetchHeroContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_content')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching hero content:', error);
        return;
      }

      if (data) {
        setContentId(data.id);
        setHeadline(data.headline);
        setLine1(data.tagline_1);
        setLine2(data.tagline_2);
        setLine3(data.tagline_3);
        setBgImage(data.background_image_url || "");
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updateData = {
        headline,
        tagline_1: line1,
        tagline_2: line2,
        tagline_3: line3,
        background_image_url: bgImage || null,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (contentId) {
        // Update existing content
        result = await supabase
          .from('hero_content')
          .update(updateData)
          .eq('id', contentId);
      } else {
        // Insert new content
        result = await supabase
          .from('hero_content')
          .insert(updateData);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: "Hero section updated",
        description: "Your changes have been saved successfully",
      });
    } catch (error) {
      console.error('Error updating hero content:', error);
      toast({
        title: "Error",
        description: "Failed to update hero section",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Hero Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="headline">Main Headline</Label>
            <Input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Taglines (One per line)</Label>
            <div className="space-y-2">
              <Input
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                placeholder="Line 1"
              />
              <Input
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                placeholder="Line 2"
              />
              <Input
                value={line3}
                onChange={(e) => setLine3(e.target.value)}
                placeholder="Line 3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bgImage">Background Image URL</Label>
            <Input
              id="bgImage"
              value={bgImage}
              onChange={(e) => setBgImage(e.target.value)}
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

export default AdminHero;
