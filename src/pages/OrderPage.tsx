
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";

interface ProductOrder {
  name: string;
  price: string;
  id: string;
}

const OrderPage = () => {
  const products: ProductOrder[] = [
    { id: "honey-1l", name: "1L Mangrove Honey", price: "$25.00" },
    { id: "honey-380ml", name: "380ml Mangrove Honey", price: "$12.00" },
    { id: "honey-100ml", name: "100ml Mangrove Honey", price: "$6.50" },
    { id: "custom", name: "Customize a Package", price: "Variable" },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    product: products[0].id,
    quantity: 1,
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, product: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate order submission
    setTimeout(() => {
      toast.success("Order submitted successfully! We'll contact you soon to confirm your order.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        product: products[0].id,
        quantity: 1,
        notes: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="section-padding bg-white">
        <div className="farm-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-farm-green mb-4">Place Your Order</h2>
            <div className="w-24 h-1 bg-farm-brown mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-gray-700">
              Fill out the form below to place an order for our organic farm products. 
              We'll contact you to confirm your order details.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-farm-beige/20 p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+254 700 000000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min={1}
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full address"
                />
              </div>
              
              <div className="space-y-3">
                <Label>Select Product</Label>
                <RadioGroup 
                  value={formData.product} 
                  onValueChange={handleRadioChange}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-2 bg-white p-4 rounded-md border">
                      <RadioGroupItem value={product.id} id={product.id} />
                      <Label htmlFor={product.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>{product.name}</span>
                          <span className="font-medium text-farm-green">{product.price}</span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Special requests, delivery instructions, etc."
                />
              </div>
              
              <Button 
                type="submit" 
                className="btn-primary w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit Order"}
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OrderPage;
