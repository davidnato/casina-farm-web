
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CreateAdminPage = () => {
  const [email, setEmail] = useState('wanyamanato@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-admin', {
        body: { email, password }
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        toast({
          title: 'Success!',
          description: 'Admin account created successfully',
        });
      } else {
        throw new Error(data.error || 'Failed to create admin account');
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create admin account',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-farm-beige/20 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-farm-green">
            Create Admin Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
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
                placeholder="Enter admin password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-farm-green hover:bg-farm-green/90"
              disabled={loading}
            >
              {loading ? 'Creating Admin...' : 'Create Admin Account'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAdminPage;
