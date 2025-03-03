
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Cpu, BarChart, Zap, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { products } from '@/lib/data';

const Index = () => {
  const featuredProducts = products.slice(0, 3);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroElement = heroRef.current;
      
      // Apply parallax effect to hero background
      heroElement.style.backgroundPositionY = `${scrollY * 0.5}px`;
      
      // Apply opacity effect based on scroll position
      const opacity = Math.max(1 - scrollY / 700, 0);
      const heroContent = heroElement.querySelector('.hero-content') as HTMLElement;
      if (heroContent) {
        heroContent.style.opacity = opacity.toString();
        heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-sky-50 to-white"
        style={{ 
          backgroundSize: 'cover', 
          backgroundPosition: 'center' 
        }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        
        <div className="hero-content container mx-auto px-4 py-16 text-center relative z-10 max-w-4xl">
          <div className="space-y-4 animate-fade-in">
            <div className="inline-block mb-4">
              <div className="flex items-center bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-primary border border-primary/10 shadow-sm">
                <span className="animate-pulse-subtle">AI-Optimized Mining Solutions</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900">
              <span className="relative">
                The Future of
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary opacity-30 rounded"></span>
              </span>
              <br />
              Bitcoin Mining
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto pt-4">
              Leverage state-of-the-art AI agents to optimize your Bitcoin mining, reducing costs and maximizing efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="group" asChild>
                <Link to="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/order-tracking">Track Your Order</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-float">
          <ChevronRight size={32} className="rotate-90 text-primary/50" />
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Intelligent Mining Solutions</h2>
            <p className="text-lg text-gray-600">
              Our AI-powered platform optimizes every aspect of your mining operation for maximum efficiency and profitability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Cpu,
                title: 'AI Optimization',
                description: 'Machine learning algorithms that continuously adjust settings for optimal performance.'
              },
              {
                icon: BarChart,
                title: 'Predictive Analytics',
                description: 'Forecast market changes and automatically adjust mining strategies.'
              },
              {
                icon: Zap,
                title: 'Energy Efficiency',
                description: 'Reduce power consumption while maintaining or improving hash rates.'
              },
              {
                icon: Server,
                title: 'Hardware Management',
                description: 'Predictive maintenance and automatic hardware optimization.'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-panel rounded-xl p-6 flex flex-col items-center text-center hover-scale"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="text-gray-600 mt-2">Our top solutions for optimized mining</p>
            </div>
            <Button variant="link" asChild>
              <Link to="/products" className="group">
                View all
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your Mining?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join the future of intelligent Bitcoin mining with our AI-optimized solutions.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-primary font-medium" 
              asChild
            >
              <Link to="/products">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">NeuroMine</h3>
              <p className="text-gray-400">
                AI-powered Bitcoin mining solutions for the modern crypto enterprise.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Products</h4>
              <ul className="space-y-2">
                <li><Link to="/products" className="hover:text-white transition-colors">Hardware</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Software</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors">Services</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/order-tracking" className="hover:text-white transition-colors">Order Tracking</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
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

export default Index;
