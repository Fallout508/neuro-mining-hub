
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PackageSearch, ArrowLeft, Box, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import OrderStatus from '@/components/OrderStatus';
import Navbar from '@/components/Navbar';
import { orders, Order, products } from '@/lib/data';

const OrderTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Check for order ID in URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    
    if (id) {
      setOrderId(id);
      handleTrackOrder(id);
    }
  }, [location]);
  
  // Track order
  const handleTrackOrder = (id: string = orderId) => {
    if (!id) {
      setError('Please enter an order ID');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const foundOrder = orders.find(o => o.id === id);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('Order not found. Please check the order ID and try again.');
      }
      
      setIsLoading(false);
    }, 800);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleTrackOrder();
  };
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">Track Your Order</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Enter your order ID to check the current status and estimated delivery date.
              </p>
            </div>
            
            {/* Search Form */}
            <Card className="mb-10">
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <PackageSearch className="mr-2 h-5 w-5" />
                  Order Tracking
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your order ID (e.g., ORD-1234-5678)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Searching...' : 'Track Order'}
                  </Button>
                </form>
                {error && (
                  <p className="text-destructive mt-3 text-sm">{error}</p>
                )}
              </CardContent>
            </Card>
            
            {/* Order Details */}
            {order && (
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>
                    Placed on {order.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Order Status */}
                  <OrderStatus order={order} />
                  
                  <Separator className="my-8" />
                  
                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {order.items.map(item => {
                        const product = products.find(p => p.id === item.productId);
                        if (!product) return null;
                        
                        return (
                          <div key={item.productId} className="flex items-center gap-4">
                            <div className="h-16 w-16 bg-gray-100 rounded-md overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className="font-medium">
                              ${(product.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Separator className="my-6" />
                    
                    {/* Order Summary */}
                    <div className="flex justify-end">
                      <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>${order.total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax</span>
                          <span>${(order.total * 0.08).toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>${(order.total * 1.08).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Help Section */}
            {!order && !isLoading && !error && (
              <div className="mt-12 text-center">
                <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-6">
                  If you can't find your order or have questions about your purchase,
                  please contact our customer support team.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline">
                    Contact Support
                  </Button>
                  <Button variant="outline">
                    View FAQs
                  </Button>
                </div>
              </div>
            )}
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

export default OrderTracking;
