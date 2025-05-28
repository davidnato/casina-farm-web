
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

interface ProductSelectionProps {
  products: Product[];
  selectedItems: OrderItem[];
  onProductSelect: (productId: string, productName: string, size: string, price: number, checked: boolean) => void;
  onQuantityChange: (productId: string, size: string, quantity: number) => void;
}

const ProductSelection = ({ 
  products, 
  selectedItems, 
  onProductSelect, 
  onQuantityChange 
}: ProductSelectionProps) => {
  const isItemSelected = (productId: string, size: string) => {
    return selectedItems.some(item => item.productId === productId && item.size === size);
  };

  const getItemQuantity = (productId: string, size: string) => {
    const item = selectedItems.find(item => item.productId === productId && item.size === size);
    return item ? item.quantity : 1;
  };

  return (
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
                    onProductSelect(product.id, product.name, sizeOption.size, sizeOption.price, checked as boolean)
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
                      onChange={(e) => onQuantityChange(product.id, sizeOption.size, parseInt(e.target.value))}
                      className="w-20"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSelection;
