import { useState } from 'react';
import { LocationSelector } from './LocationSelector';
import { CartSidebar } from './CartSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { User, LogOut, Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface HeaderProps {
  cartCount: number;
  cartItems?: { [key: number]: number };
  onUpdateCart?: (productId: number, quantity: number) => void;
  onAuthClick?: () => void;
}

export const Header = ({ cartCount, cartItems = {}, onUpdateCart = () => {}, onAuthClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState('Select Location');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      if (onAuthClick) {
        onAuthClick();
      } else {
        navigate('/auth');
      }
    }
  };

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
              Groc
            </div>
          </div>

          {/* Location Selector - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2 min-w-0">
            <LocationSelector 
              value={location} 
              onLocationChange={setLocation} 
            />
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

            {/* User Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost" 
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">
                      {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="font-medium">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost" 
                size="sm"
                className="flex items-center space-x-2"
                onClick={handleAuthAction}
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}

            <CartSidebar 
              cartItems={cartItems}
              onUpdateCart={onUpdateCart}
              cartCount={cartCount}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Location */}
              <div className="w-full">
                <LocationSelector 
                  value={location} 
                  onLocationChange={setLocation} 
                />
              </div>
              
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