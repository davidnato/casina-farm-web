
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminAbout = () => {
  const { toast } = useToast();
  const [story, setStory] = useState(
    "Casina Farms is a pioneering social enterprise dedicated to integrating sustainable agriculture, coastal ecosystem restoration, and community development to build resilient coastal communities. Rooted in the Kenyan coast, Casina Farms emerged from the shared struggles of smallholder farmers and the urgent need to break the cycle of poverty and hunger. By empowering these farmers — the unsung stewards of the land — the enterprise promotes fair trade, climate-resilient agriculture, and biodiversity preservation."
  );
  const [storyPart2, setStoryPart2] = useState(
    "The strong sense of community and connection to the natural landscape are defining features of coastal Kenya's culture. However, climate change, resource depletion, and economic marginalization have left many communities vulnerable. What if we could change this?"
  );
  const [mission, setMission] = useState(
    "At Casina Farms, we're on a mission to restore ecosystems through sustainable practices, cultivating food security and economic prosperity for smallholder farmers in coastal Kenya, while fostering a flourishing natural environment."
  );
  const [vision, setVision] = useState(
    "A thriving, regenerative food system that nourishes both people and the planet, fostering a future where prosperity, community, and nature flourish together."
  );
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real application, this would make an API call to update data
    setTimeout(() => {
      toast({
        title: "About section updated",
        description: "Your changes have been saved successfully",
      });
      setIsLoading(false);
    }, 1000);
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
