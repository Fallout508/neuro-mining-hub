
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Product, addToCart } from '@/lib/data';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product.id);
      setIsAdding(false);
      // Dispatch event to notify navbar
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`${product.name} added to cart`);
    }, 500);
  };
  
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-md hover:translate-y-[-3px] bg-white border border-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {!product.inStock && (
            <Badge variant="destructive" className="px-2 py-1 text-xs font-medium">
              Out of Stock
            </Badge>
          )}
          <Badge variant="secondary" className="px-2 py-1 text-xs font-medium uppercase">
            {product.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="flex flex-col flex-grow p-4">
        <h3 className="font-semibold text-lg line-clamp-1 mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</p>
        <div className="mt-auto pt-4">
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-lg">${product.price.toLocaleString()}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" align="end" className="max-w-xs">
                  <div className="space-y-1 p-1">
                    {product.specs && Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2">
                        <span className="text-xs font-medium">{key}:</span>
                        <span className="text-xs">{value}</span>
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full transition-all duration-300"
          onClick={handleAddToCart}
          disabled={isAdding || !product.inStock}
        >
          {isAdding ? (
            <Check className="mr-2 h-4 w-4 animate-scale-in" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" />
          )}
          {isAdding ? 'Added' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
