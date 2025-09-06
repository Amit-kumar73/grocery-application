import { useState } from 'react';
import { Search, ShoppingCart, MapPin, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  cartCount: number;
}

export const Header = ({ cartCount }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState('Select Location');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="text-2xl font-bold text-primary">
              blinkit
            </div>
          </div>

          {/* Location Selector - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2 min-w-0">
            <Button
              variant="outline"
              className="flex items-center space-x-2 max-w-[200px] truncate"
            >
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="truncate text-sm">{location}</span>
            </Button>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for products..."
                className="pl-10 bg-muted/30 border-muted focus:bg-background"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Icon for Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Login */}
            <Button
              variant="ghost" 
              size="sm"
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary hover:bg-primary">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Location */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-start space-x-2"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">{location}</span>
              </Button>
              
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};