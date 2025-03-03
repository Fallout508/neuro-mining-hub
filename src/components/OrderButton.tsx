
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { addToCart } from '@/lib/data';

interface OrderButtonProps {
  productId: string;
  inStock: boolean;
}

const OrderButton = ({ productId, inStock }: OrderButtonProps) => {
  const [isOrdering, setIsOrdering] = useState(false);
  const navigate = useNavigate();
  
  const handleOrderClick = () => {
    if (!inStock) {
      toast.error("This product is currently out of stock");
      return;
    }
    
    setIsOrdering(true);
    
    // Add product to cart
    addToCart(productId, 1);
    
    // Update cart indicator
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success toast
    toast.success("Product added to cart");
    
    // Navigate to order page
    setTimeout(() => {
      navigate('/order');
      setIsOrdering(false);
    }, 500);
  };
  
  return (
    <Button 
      className="w-full"
      disabled={!inStock || isOrdering}
      onClick={handleOrderClick}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      {isOrdering ? 'Processing...' : inStock ? 'Order Now' : 'Out of Stock'}
    </Button>
  );
};

export default OrderButton;
