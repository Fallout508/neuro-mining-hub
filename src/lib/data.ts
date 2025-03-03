
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'asic' | 'software' | 'service';
  image: string;
  specs?: {
    [key: string]: string;
  };
  inStock: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'processing' | 'shipped' | 'delivered';
  date: string;
  total: number;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// Mock products data
export const products: Product[] = [
  {
    id: '1',
    name: 'NeuroMine AI Optimizer',
    description: 'Our flagship AI software that optimizes your mining operations in real-time, reducing energy consumption while maximizing hash rates.',
    price: 2499.99,
    category: 'software',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop',
    specs: {
      'Compatibility': 'All major ASIC models',
      'Updates': 'Automatic monthly updates',
      'Support': '24/7 technical assistance',
      'Interface': 'Web dashboard & mobile app'
    },
    inStock: true
  },
  {
    id: '2',
    name: 'Antminer S19 Pro (Enhanced)',
    description: 'High-performance ASIC miner with our proprietary firmware pre-installed for maximum efficiency.',
    price: 3899.99,
    category: 'asic',
    image: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?q=80&w=1000&auto=format&fit=crop',
    specs: {
      'Hash Rate': '110 TH/s ±3%',
      'Power Efficiency': '29.5 J/TH ±5%',
      'Power Consumption': '3250W ±5%',
      'Connection': 'Ethernet',
      'Cooling': 'Air-cooled'
    },
    inStock: true
  },
  {
    id: '3',
    name: 'NeuroMine Consulting Package',
    description: 'Full-service consulting to optimize your existing mining operation with AI integration and energy efficiency analysis.',
    price: 5999.99,
    category: 'service',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
    specs: {
      'Duration': '3 months',
      'Deliverables': 'Custom optimization report, implementation plan, follow-up support',
      'Team': 'Senior mining engineer, AI specialist, energy efficiency expert',
      'ROI': 'Average 40% improvement in operational efficiency'
    },
    inStock: true
  },
  {
    id: '4',
    name: 'WhatsMiner M50S+ (AI Enhanced)',
    description: 'Next-generation ASIC miner with integrated NeuroMine AI technology for autonomous operation.',
    price: 4299.99,
    category: 'asic',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1000&auto=format&fit=crop',
    specs: {
      'Hash Rate': '126 TH/s ±3%',
      'Power Efficiency': '26 J/TH ±5%',
      'Power Consumption': '3276W ±5%',
      'Connection': 'Ethernet/WiFi',
      'Cooling': 'Advanced liquid cooling system'
    },
    inStock: false
  },
  {
    id: '5',
    name: 'NeuroMine Predictive Maintenance',
    description: 'AI-driven maintenance prediction software that detects potential hardware failures before they happen.',
    price: 1499.99,
    category: 'software',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    specs: {
      'Compatibility': 'All major ASIC models',
      'Alerts': 'Email, SMS, dashboard notifications',
      'Accuracy': '94% prediction rate',
      'Data Collection': 'Real-time hardware diagnostics'
    },
    inStock: true
  },
  {
    id: '6',
    name: 'Energy Optimization Service',
    description: 'Complete analysis of your mining operation with focus on reducing energy costs while maintaining hash rates.',
    price: 3499.99,
    category: 'service',
    image: 'https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=1000&auto=format&fit=crop',
    specs: {
      'Duration': '2 weeks',
      'Deliverables': 'Energy audit, optimization strategy, implementation support',
      'Savings': 'Average 30% reduction in energy costs',
      'Follow-up': '3 months of monitoring and adjustments'
    },
    inStock: true
  }
];

// Mock order data
export const orders: Order[] = [
  {
    id: 'ORD-1234-5678',
    items: [
      { productId: '1', quantity: 1 },
      { productId: '2', quantity: 2 }
    ],
    status: 'processing',
    date: '2023-04-15',
    total: 10299.97,
    estimatedDelivery: '2023-04-22',
    trackingNumber: 'TRK928374659'
  },
  {
    id: 'ORD-8765-4321',
    items: [
      { productId: '3', quantity: 1 }
    ],
    status: 'shipped',
    date: '2023-04-10',
    total: 5999.99,
    estimatedDelivery: '2023-04-20',
    trackingNumber: 'TRK837465981'
  },
  {
    id: 'ORD-9876-5432',
    items: [
      { productId: '5', quantity: 1 },
      { productId: '6', quantity: 1 }
    ],
    status: 'delivered',
    date: '2023-04-01',
    total: 4999.98,
    estimatedDelivery: '2023-04-08',
    trackingNumber: 'TRK746598132'
  }
];

// Local storage helpers for cart management
export const getCartItems = (): CartItem[] => {
  const cartItems = localStorage.getItem('cart');
  return cartItems ? JSON.parse(cartItems) : [];
};

export const addToCart = (productId: string, quantity: number = 1) => {
  const cartItems = getCartItems();
  const existingItem = cartItems.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({ productId, quantity });
  }
  
  localStorage.setItem('cart', JSON.stringify(cartItems));
  return cartItems;
};

export const removeFromCart = (productId: string) => {
  let cartItems = getCartItems();
  cartItems = cartItems.filter(item => item.productId !== productId);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  return cartItems;
};

export const updateCartItemQuantity = (productId: string, quantity: number) => {
  const cartItems = getCartItems();
  const existingItem = cartItems.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
  
  return cartItems;
};

export const clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
};

export const getCartTotal = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
};
