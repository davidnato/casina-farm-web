
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  category: string;
  sizes: {
    size: string;
    price: number;
  }[];
}

interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  price: number;
  quantity: number;
}

const OrderPage = () => {
  const products: Product[] = [
    {
      id: "mangrove-honey",
      name: "Mangrove Honey",
      category: "Honey",
      sizes: [
        { size: "380g", price: 500 },
        { size: "660g", price: 1000 },
        { size: "1kg", price: 1500 }
      ]
    },
    {
      id: "terrestrial-honey",
      name: "Terrestrial Honey", 
      category: "Honey",
      sizes: [
        { size: "380g", price: 400 },
        { size: "660g", price: 700 },
        { size: "1kg", price: 1000 }
      ]
    },
    {
      id: "hibiscus-petals",
      name: "Hibiscus Dried Petals",
      category: "Natural Products",
      sizes: [
        { size: "100g", price: 550 }
      ]
    },
    {
      id: "seaweed-shampoo",
      name: "Seaweed Shampoo",
      category: "Seaweed Products",
      sizes: [
        { size: "300ml", price: 400 }
      ]
    },
    {
      id: "seaweed-hair-food",
      name: "Seaweed Hair Food",
      category: "Seaweed Products",
      sizes: [
        { size: "250ml", price: 300 }
      ]
    },
    {
      id: "seaweed-shower-gel",
      name: "Seaweed Shower Gel",
      category: "Seaweed Products",
      sizes: [
        { size: "300ml", price: 400 }
      ]
    },
    {
      id: "seaweed-body-lotion",
      name: "Seaweed Body Lotion",
      category: "Seaweed Products",
      sizes: [
        { size: "250ml", price: 350 }
      ]
    },
    {
      id: "seaweed-bar-soap",
      name: "Seaweed Bar Soap",
      category: "Seaweed Products",
      sizes: [
        { size: "100g", price: 250 }
      ]
    }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "mpesa",
    tillNumber: "",
    notes: ""
  });
  
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: value }));
  };

  const handleProductSelect = (productId: string, productName: string, size: string, price: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, {
        productId,
        productName,
        size,
        price,
        quantity: 1
      }]);
    } else {
      setSelectedItems(prev => prev.filter(item => 
        !(item.productId === productId && item.size === size)
      ));
    }
  };

  const handleQuantityChange = (productId: string, size: string, quantity: number) => {
    setSelectedItems(prev => prev.map(item => 
      item.productId === productId && item.size === size 
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    ));
  };

  const getTotalAmount = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedItems.length === 0) {
      toast.error("Please select at least one product");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        delivery_address: formData.address,
        order_items: selectedItems,
        total_amount: getTotalAmount(),
        payment_method: formData.paymentMethod,
        till_number: formData.tillNumber || null,
        order_notes: formData.notes || null,
        status: 'pending'
      };

      // Save order to database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Send invoice email
      const { error: emailError } = await supabase.functions.invoke('send-invoice', {
        body: {
          order: order,
          orderItems: selectedItems,
          customerEmail: formData.email,
          customerName: formData.name
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        toast.error("Order placed but failed to send invoice email");
      } else {
        toast.success("Order submitted successfully! Invoice sent to your email.");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        paymentMethod: "mpesa",
        tillNumber: "",
        notes: ""
      });
      setSelectedItems([]);
      
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isItemSelected = (productId: string, size: string) => {
    return selectedItems.some(item => item.productId === productId && item.size === size);
  };

  const getItemQuantity = (productId: string, size: string) => {
    const item = selectedItems.find(item => item.productId === productId && item.size === size);
    return item ? item.quantity : 1;
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
              Select your products and fill out the form below to place an order. 
              An invoice will be sent to your email after payment.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-farm-beige/20 p-8 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Product Selection */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-farm-green mb-4">Select Products</h3>
                
                {products.map((product) => (
                  <div key={product.id} className="bg-white p-6 rounded-lg border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-farm-earth">{product.name}</h4>
                        <span className="bg-farm-beige px-2 py-1 rounded text-farm-green font-medium text-sm">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {product.sizes.map((sizeOption) => (
                        <div key={`${product.id}-${sizeOption.size}`} className="flex items-center space-x-3 p-3 border rounded">
                          <Checkbox
                            id={`${product.id}-${sizeOption.size}`}
                            checked={isItemSelected(product.id, sizeOption.size)}
                            onCheckedChange={(checked) => 
                              handleProductSelect(product.id, product.name, sizeOption.size, sizeOption.price, checked as boolean)
                            }
                          />
                          <div className="flex-1">
                            <Label htmlFor={`${product.id}-${sizeOption.size}`} className="cursor-pointer">
                              <div className="flex justify-between items-center">
                                <span>{sizeOption.size}</span>
                                <span className="font-medium text-farm-green">Ksh. {sizeOption.price}</span>
                              </div>
                            </Label>
                          </div>
                          {isItemSelected(product.id, sizeOption.size) && (
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`qty-${product.id}-${sizeOption.size}`} className="text-sm">Qty:</Label>
                              <Input
                                id={`qty-${product.id}-${sizeOption.size}`}
                                type="number"
                                min={1}
                                value={getItemQuantity(product.id, sizeOption.size)}
                                onChange={(e) => handleQuantityChange(product.id, sizeOption.size, parseInt(e.target.value))}
                                className="w-20"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                {selectedItems.length > 0 && (
                  <div className="bg-farm-green/10 p-4 rounded-lg">
                    <h4 className="font-semibold text-farm-green mb-2">Order Summary</h4>
                    {selectedItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span>{item.productName} ({item.size}) x {item.quantity}</span>
                        <span>Ksh. {item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2 font-bold">
                      <div className="flex justify-between">
                        <span>Total:</span>
                        <span>Ksh. {getTotalAmount()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-farm-green">Customer Information</h3>
                
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full delivery address"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-farm-green">Payment Method</h3>
                
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={handlePaymentMethodChange}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 bg-white p-4 rounded-md border">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <Label htmlFor="mpesa" className="flex-1 cursor-pointer">
                      <div className="font-medium">M-Pesa</div>
                      <div className="text-sm text-gray-600">Pay via M-Pesa mobile money</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-white p-4 rounded-md border">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when your order is delivered</div>
                    </Label>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === "mpesa" && (
                  <div className="space-y-2">
                    <Label htmlFor="tillNumber">Till Number (Optional)</Label>
                    <Input
                      id="tillNumber"
                      name="tillNumber"
                      value={formData.tillNumber}
                      onChange={handleChange}
                      placeholder="Enter till number if you have one"
                    />
                  </div>
                )}
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
                disabled={isSubmitting || selectedItems.length === 0}
              >
                {isSubmitting ? "Processing..." : `Submit Order (Ksh. ${getTotalAmount()})`}
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
