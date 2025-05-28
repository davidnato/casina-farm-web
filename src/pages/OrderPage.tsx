
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ProductSelection from "@/components/order/ProductSelection";
import CustomerForm from "@/components/order/CustomerForm";
import PaymentMethodSelector from "@/components/order/PaymentMethodSelector";
import OrderSummary from "@/components/order/OrderSummary";
import { useProducts } from "@/hooks/useProducts";

interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  price: number;
  quantity: number;
}

const OrderPage = () => {
  const { products } = useProducts();
  
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
        order_items: selectedItems as any, // Cast to Json type
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
              <ProductSelection
                products={products}
                selectedItems={selectedItems}
                onProductSelect={handleProductSelect}
                onQuantityChange={handleQuantityChange}
              />
              
              <OrderSummary
                selectedItems={selectedItems}
                getTotalAmount={getTotalAmount}
              />

              {/* Customer Information */}
              <CustomerForm
                formData={formData}
                onChange={handleChange}
              />

              {/* Payment Information */}
              <PaymentMethodSelector
                paymentMethod={formData.paymentMethod}
                tillNumber={formData.tillNumber}
                onPaymentMethodChange={handlePaymentMethodChange}
                onTillNumberChange={handleChange}
              />
              
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
