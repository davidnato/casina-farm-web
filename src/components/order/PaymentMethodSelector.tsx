
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  tillNumber: string;
  onPaymentMethodChange: (value: string) => void;
  onTillNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentMethodSelector = ({ 
  paymentMethod, 
  tillNumber, 
  onPaymentMethodChange, 
  onTillNumberChange 
}: PaymentMethodSelectorProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-farm-green">Payment Method</h3>
      
      <RadioGroup 
        value={paymentMethod} 
        onValueChange={onPaymentMethodChange}
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

      {paymentMethod === "mpesa" && (
        <div className="space-y-2">
          <Label htmlFor="tillNumber">Till Number (Optional)</Label>
          <Input
            id="tillNumber"
            name="tillNumber"
            value={tillNumber}
            onChange={onTillNumberChange}
            placeholder="Enter till number if you have one"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;
