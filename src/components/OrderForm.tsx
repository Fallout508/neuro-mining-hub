
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createOrder, clearCart, getCartItems } from '@/lib/data';

interface OrderFormProps {
  subtotal: number;
}

const OrderForm = ({ subtotal }: OrderFormProps) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit-card' as 'credit-card' | 'bitcoin'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      paymentMethod: value as 'credit-card' | 'bitcoin' 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get cart items
      const cartItems = getCartItems();
      
      if (cartItems.length === 0) {
        toast.error('Your cart is empty');
        setIsSubmitting(false);
        return;
      }
      
      // Create order
      const order = createOrder(cartItems, formData);
      
      // Clear cart
      clearCart();
      
      // Update cart indicator
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Show success toast
      toast.success('Order placed successfully!');
      
      // Redirect to order tracking page
      navigate(`/order-tracking?id=${order.id}`);
    } catch (error) {
      console.error('Order creation failed:', error);
      toast.error('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <Label htmlFor="address">Shipping Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            placeholder="Enter your full address"
          />
        </div>
        
        <div>
          <Label>Payment Method</Label>
          <RadioGroup 
            value={formData.paymentMethod}
            onValueChange={handlePaymentMethodChange}
            className="mt-2 space-y-2"
          >
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="credit-card" id="credit-card" />
              <Label htmlFor="credit-card" className="flex-grow cursor-pointer">
                Credit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="bitcoin" id="bitcoin" />
              <Label htmlFor="bitcoin" className="flex-grow cursor-pointer">
                Bitcoin
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex justify-between font-medium mb-4">
          <span>Total</span>
          <span>${(subtotal * 1.08).toFixed(2)}</span>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
