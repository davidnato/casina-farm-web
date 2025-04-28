
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For demo purposes, hardcoded credentials
      // In a real app, this would be a backend authentication call
      if (username === "admin" && password === "password") {
        localStorage.setItem("casinaAdmin", "authenticated");
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        
        navigate("/admin");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred during login",
        variant: "destructive",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-farm-beige/20">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/0aa3d9cd-e3db-41e8-b1d7-23d27a56d0b9.png" 
              alt="Casina Farms Logo" 
              className="h-16" 
            />
          </div>
          <CardTitle className="text-2xl font-bold text-farm-green flex items-center justify-center gap-2">
            <Lock size={20} />
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-farm-green hover:bg-farm-green/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p className="w-full">Use username: <strong>admin</strong> and password: <strong>password</strong> for demo</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
