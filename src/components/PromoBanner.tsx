import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Smartphone, Calendar, Tag, Download, Apple } from 'lucide-react';

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const upcomingEvents = [
    {
      title: "Weekend Flash Sale",
      description: "Up to 50% off on fresh fruits & vegetables",
      date: "Sat-Sun",
      discount: "50% OFF",
      type: "sale"
    },
    {
      title: "New Product Launch", 
      description: "Premium organic dairy products arriving soon",
      date: "Next Week",
      discount: "NEW",
      type: "product"
    },
    {
      title: "Mega Grocery Sale",
      description: "Flat 30% off on orders above ₹999",
      date: "15-17 Jan",
      discount: "30% OFF", 
      type: "sale"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Tag className="h-6 w-6 text-primary" />
            Upcoming Deals & Events
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upcoming Events Section */}
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant={event.type === 'sale' ? 'destructive' : 'secondary'}
                          className="text-xs"
                        >
                          {event.discount}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {event.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground text-sm">{event.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* App Download Section */}
          <div className="space-y-4">
            <div className="text-center space-y-4 p-6 rounded-lg bg-muted/20 border">
              <div className="flex justify-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-foreground">Get Our Mobile App</h3>
                <p className="text-sm text-muted-foreground">
                  Shop faster and get exclusive mobile-only deals
                </p>
              </div>

              <div className="space-y-3">
                {/* Apple App Store Button */}
                <Button 
                  className="w-full bg-black hover:bg-black/90 text-white flex items-center justify-center gap-3 h-12"
                  onClick={() => window.open('#', '_blank')}
                >
                  <Apple className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Button>

                {/* Google Play Store Button */}
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-3 h-12"
                  onClick={() => window.open('#', '_blank')}
                >
                  <div className="h-6 w-6 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.88 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-4">
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>Free Download</span>
                </div>
                <div>•</div>
                <div>Faster Checkout</div>
                <div>•</div>
                <div>Exclusive Offers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};