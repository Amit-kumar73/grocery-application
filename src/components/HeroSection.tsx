import { Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import groceryHero from '@/assets/grocery-hero.jpg';

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-light to-accent overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Groceries in{' '}
                <span className="text-primary">10 minutes</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Get fresh groceries & essentials delivered to your doorstep in minutes, not hours.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-background/80 rounded-full px-4 py-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">10-minute delivery</span>
              </div>
              <div className="flex items-center space-x-2 bg-background/80 rounded-full px-4 py-2">
                <Truck className="h-4 w-4 text-primary" />
                <span className="font-medium">Free delivery</span>
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8 py-3"
            >
              Start Shopping
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-background/20 backdrop-blur-sm border border-white/20">
              <img
                src={groceryHero}
                alt="Fresh groceries and delivery"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating delivery badge */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-lg">
              🚀 10 min
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};