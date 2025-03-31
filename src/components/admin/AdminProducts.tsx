
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminProducts = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    
    // In a real application, this would make an API call to update data
    setTimeout(() => {
      toast({
        title: "Products updated",
        description: "Your changes have been saved successfully",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Products Section</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-8 text-center border border-dashed rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Products Editor</h3>
          <p className="text-muted-foreground mb-4">
            This section will allow you to manage products, including adding new products,
            updating existing ones, and organizing them into categories.
          </p>
          <Button
            className="btn-primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProducts;
