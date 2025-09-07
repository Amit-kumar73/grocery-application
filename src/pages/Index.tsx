import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProductSection } from '@/components/ProductSection';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartCount={0} />
        <main className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Welcome to Groc</h1>
            <p className="text-muted-foreground">
              Please sign in to access your grocery shopping experience
            </p>
            <Button onClick={() => navigate('/auth')} size="lg">
              Sign In to Continue
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = (productId: number, quantity: number) => {
    setCartItems(prev => {
      const currentQuantity = prev[productId] || 0;
      const newQuantity = Math.max(0, currentQuantity + quantity);
      
      if (newQuantity === 0) {
        const { [productId]: removed, ...rest } = prev;
        return rest;
      }
      
      return {
        ...prev,
        [productId]: newQuantity
      };
    });

    if (quantity > 0) {
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart",
        duration: 2000,
      });
    }
  };

  const handleCategorySelect = (categoryId: number) => {
    toast({
      title: "Category selected",
      description: "Showing products from selected category",
      duration: 2000,
    });
  };

  const totalCartItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={totalCartItems} />
      
      <main>
        <HeroSection />
        <CategoryGrid onCategorySelect={handleCategorySelect} />
        <ProductSection onAddToCart={handleAddToCart} cartItems={cartItems} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
