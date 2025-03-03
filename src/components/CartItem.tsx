
import { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, CartItem as CartItemType, updateCartItemQuantity, removeFromCart } from '@/lib/data';

interface CartItemProps {
  item: CartItemType;
  product: Product;
  onUpdate: () => void;
}

const CartItem = ({ item, product, onUpdate }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setQuantity(newQuantity);
    updateCartItemQuantity(item.productId, newQuantity);
    onUpdate();
  };
  
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.productId);
      onUpdate();
    }, 300);
  };
  
  return (
    <div 
      className={`flex items-start py-4 space-x-4 rounded-lg transition-opacity duration-300 ${
        isRemoving ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="bg-gray-100 h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow space-y-1">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
        <p className="font-semibold">${product.price.toLocaleString()}</p>
      </div>
      
      <div className="flex flex-col items-end space-y-2">
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-10 text-center text-sm">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none"
            onClick={() => handleQuantityChange(quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <p className="text-sm font-medium">
          Subtotal: ${(product.price * quantity).toLocaleString()}
        </p>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-destructive hover:text-destructive/80"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
