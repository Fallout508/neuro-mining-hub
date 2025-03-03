
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import OrderForm from '@/components/OrderForm';
import Navbar from '@/components/Navbar';
import { getCartItems, getCartTotal, products } from '@/lib/data';

const Order = () => {
  const [cartItems, setCartItems] = useState(getCartItems());
  const [cartTotal, setCartTotal] = useState(getCartTotal());
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    
    // Calculate cart total
    setCartTotal(getCartTotal());
  }, [cartItems, navigate]);
  
  // Get product details for cart items
  const cartItemsWithProducts = cartItems.map(item => ({
    item,
    product: products.find(product => product.id === item.productId)!
  })).filter(({ product }) => product !== undefined);
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Button variant="ghost" className="mr-4" onClick={() => navigate('/cart')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
            <h1 className="text-3xl font-bold">Order</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Place Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <OrderForm subtotal={cartTotal} />
                </CardContent>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card className="sticky top-28">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Items Summary */}
                    <div className="space-y-3">
                      {cartItemsWithProducts.map(({ item, product }) => (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <div className="flex-1">
                            <span className="font-medium">{product.name}</span>
                            <span className="text-muted-foreground ml-1">× {item.quantity}</span>
                          </div>
                          <span>${(product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Cost Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (Estimated)</span>
                        <span>${(cartTotal * 0.08).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Total */}
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(cartTotal * 1.08).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6 flex justify-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} NeuroMine Technologies. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-300 mr-4">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Order;
