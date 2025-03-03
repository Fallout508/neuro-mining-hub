
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CreditCard, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/CartItem';
import EmptyCart from '@/components/EmptyCart';
import Navbar from '@/components/Navbar';
import { getCartItems, products, getCartTotal, clearCart } from '@/lib/data';

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCartItems());
  const [cartTotal, setCartTotal] = useState(getCartTotal());
  const navigate = useNavigate();
  
  // Refresh cart data when component mounts
  useEffect(() => {
    updateCart();
  }, []);
  
  const updateCart = () => {
    const items = getCartItems();
    setCartItems(items);
    setCartTotal(getCartTotal());
    
    // Notify navbar about cart update
    window.dispatchEvent(new Event('cartUpdated'));
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  // Get product details for each cart item
  const cartItemsWithProducts = cartItems.map(item => ({
    item,
    product: products.find(product => product.id === item.productId)!
  })).filter(({ product }) => product !== undefined);
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-600 mb-8">
            Review your items before proceeding to checkout
          </p>
          
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      <span>Items ({cartItems.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cartItemsWithProducts.map(({ item, product }) => (
                        <div key={item.productId}>
                          <CartItem 
                            item={item} 
                            product={product} 
                            onUpdate={updateCart} 
                          />
                          <Separator />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      asChild
                    >
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        clearCart();
                        updateCart();
                      }}
                    >
                      Clear Cart
                    </Button>
                  </CardFooter>
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
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${cartTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full group" 
                      onClick={handleCheckout}
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
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

export default Cart;
