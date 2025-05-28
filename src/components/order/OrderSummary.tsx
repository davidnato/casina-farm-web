
interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  selectedItems: OrderItem[];
  getTotalAmount: () => number;
}

const OrderSummary = ({ selectedItems, getTotalAmount }: OrderSummaryProps) => {
  if (selectedItems.length === 0) return null;

  return (
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
  );
};

export default OrderSummary;
