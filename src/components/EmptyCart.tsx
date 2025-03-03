
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="bg-gray-100 p-6 rounded-full mb-6">
        <ShoppingCart className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        Looks like you haven't added any products to your cart yet.
      </p>
      <Button asChild>
        <Link to="/products">Browse Products</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
