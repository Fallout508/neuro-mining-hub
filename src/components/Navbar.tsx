
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCartItems } from '@/lib/data';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  
  // Update cart count when it changes
  useEffect(() => {
    const handleStorageChange = () => {
      const cartItems = getCartItems();
      setCartCount(cartItems.reduce((sum, item) => sum + item.quantity, 0));
    };
    
    // Initial count
    handleStorageChange();
    
    // Listen for storage changes (from other components)
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, [location]);
  
  // Track scroll for background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/order-tracking', label: 'Track Order' },
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-primary">
              NeuroMine
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors duration-300',
                  'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary',
                  'after:scale-x-0 after:origin-bottom-right after:transition-transform after:duration-300',
                  'hover:after:scale-x-100 hover:after:origin-bottom-left',
                  location.pathname === link.href ? 'text-primary after:scale-x-100' : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Cart Button */}
          <div className="flex items-center">
            <Link 
              to="/cart"
              className="relative p-2 transition-transform duration-300 hover:scale-105"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 ml-2 rounded-md text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out bg-white/95 backdrop-blur-md',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="text-xl font-semibold text-primary" onClick={() => setIsOpen(false)}>
            NeuroMine
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="px-4 pt-8 pb-4 space-y-6">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="flex items-center py-3 text-base font-medium border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <span className={location.pathname === link.href ? 'text-primary' : 'text-foreground'}>
                {link.label}
              </span>
              <ChevronRight className="ml-auto h-4 w-4" />
            </Link>
          ))}
          <Link
            to="/cart"
            className="flex items-center py-3 text-base font-medium"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
