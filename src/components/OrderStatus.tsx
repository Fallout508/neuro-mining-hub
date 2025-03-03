
import { ClipboardCheck, Package, Truck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  created_at: string;
}

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  payment_method: 'credit-card' | 'bitcoin';
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  tracking_number: string;
  estimated_delivery: string;
  items?: OrderItem[];
}

interface OrderStatusProps {
  order: Order;
}

const OrderStatus = ({ order }: OrderStatusProps) => {
  // Define status steps
  const steps = [
    { key: 'processing', label: 'Processing', icon: ClipboardCheck },
    { key: 'shipped', label: 'Shipped', icon: Package },
    { key: 'outForDelivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle2 },
  ];
  
  // Determine current step based on order status
  let currentStepIndex = 0;
  if (order.status === 'processing') currentStepIndex = 0;
  if (order.status === 'shipped') currentStepIndex = 1;
  if (order.status === 'delivered') currentStepIndex = 3;
  
  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Track */}
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10" />
        
        {/* Status Steps */}
        {steps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          const isPast = index < currentStepIndex;
          
          return (
            <div key={step.key} className="flex flex-col items-center space-y-2 z-10">
              {/* Step Circle */}
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100 text-gray-400"
                )}
              >
                <step.icon className="h-5 w-5" />
              </div>
              
              {/* Step Label */}
              <span className={cn(
                "text-xs font-medium text-center",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
              
              {/* Date/Time if available */}
              {isPast && (
                <span className="text-[10px] text-muted-foreground">
                  {step.key === 'processing' ? new Date(order.created_at).toLocaleDateString() : ''}
                </span>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Additional Order Details */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Tracking Number</h4>
          <p className="font-mono text-sm">{order.tracking_number || 'Not available'}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Estimated Delivery</h4>
          <p className="text-sm">{order.estimated_delivery || 'Not available'}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
