
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminHero = () => {
  const { toast } = useToast();
  const [headline, setHeadline] = useState("Casina Farms");
  const [line1, setLine1] = useState("Building Resilience on the Kenyan Coast");
  const [line2, setLine2] = useState("Restoring Ecosystems");
  const [line3, setLine3] = useState("Scaling a Model for Food Security and Fairness");
  const [bgImage, setBgImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real application, this would make an API call to update data
    setTimeout(() => {
      toast({
        title: "Hero section updated",
        description: "Your changes have been saved successfully",
      });
      setIsLoading(false);
    }, 1000);
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
