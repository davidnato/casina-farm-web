
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Phone, CreditCard, ArrowLeft, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const tillNumber = "5677581";
  const businessName = "CASINA FARMS";

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    // If it starts with 0, replace with 254
    if (cleanPhone.startsWith('0')) {
      return '254' + cleanPhone.substring(1);
    }
    
    // If it doesn't start with 254, add it
    if (!cleanPhone.startsWith('254')) {
      return '254' + cleanPhone;
    }
    
    return cleanPhone;
  };

  const copyTillNumber = () => {
    navigator.clipboard.writeText(tillNumber);
    toast({
      title: 'Copied!',
      description: 'Till number copied to clipboard',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !amount) {
      toast({
        title: 'Missing information',
        description: 'Please enter both phone number and amount.',
        variant: 'destructive',
      });
      return;
    }

    if (parseInt(amount) < 1) {
      toast({
        title: 'Invalid amount',
        description: 'Amount must be at least KES 1.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Payment instructions sent!',
        description: `Please use the till number ${tillNumber} to complete your payment via MPesa.`,
      });

      // Reset form
      setPhoneNumber('');
      setAmount('');
      
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-farm-beige/20">
      <div className="farm-container py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link to="/" className="flex items-center text-farm-green hover:text-farm-green/80">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
          
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="/lovable-uploads/0aa3d9cd-e3db-41e8-b1d7-23d27a56d0b9.png"
                  alt="Casina Farms Logo"
                  className="h-16"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-farm-green flex items-center justify-center gap-2">
                <CreditCard size={20} />
                MPesa Payment
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Pay securely using MPesa Buy Goods
              </p>
            </CardHeader>
            
            <CardContent>
              {/* Till Number Display */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-900 mb-2">Payment Instructions:</h3>
                <div className="space-y-2 text-sm text-green-800">
                  <p>1. Go to MPesa on your phone</p>
                  <p>2. Select "Lipa na M-Pesa"</p>
                  <p>3. Select "Buy Goods and Services"</p>
                  <p>4. Enter Till Number: <strong>{tillNumber}</strong></p>
                  <p>5. Enter amount and your MPesa PIN</p>
                </div>
                <div className="mt-4 p-3 bg-white rounded border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{businessName}</p>
                      <p className="text-lg font-bold text-green-600">Till No: {tillNumber}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyTillNumber}
                      className="flex items-center gap-1"
                    >
                      <Copy size={14} />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Your Phone Number (Optional)</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="07XXXXXXXX or 2547XXXXXXXX"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    For order confirmation (optional)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (KES)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">KES</span>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="pl-12"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Get Payment Instructions'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Powered by Safaricom MPesa</p>
                <p className="mt-1">Your payment is secure and encrypted</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
