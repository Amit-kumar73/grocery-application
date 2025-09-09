import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PromoBanner } from '@/components/PromoBanner';
import { CategoryGrid } from '@/components/CategoryGrid';
import { EnhancedProductSection } from '@/components/EnhancedProductSection';
import { Footer } from '@/components/Footer';
import { AuthSidebar } from '@/components/AuthSidebar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [showAuthSidebar, setShowAuthSidebar] = useState(false);
  const { toast } = useToast();
  const { user, loading } = useAuth();

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

  const handleAddToCart = (productId: number, quantity: number) => {
    // If user is not logged in, show auth sidebar
    if (!user) {
      setShowAuthSidebar(true);
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
        duration: 3000,
      });
      return;
    }

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
    setSelectedCategoryId(categoryId);
    toast({
      title: "Category selected",
      description: "Showing products from selected category",
      duration: 2000,
    });
  };

  const totalCartItems = Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        cartCount={totalCartItems} 
        cartItems={cartItems} 
        onUpdateCart={handleAddToCart}
        onAuthClick={() => setShowAuthSidebar(true)}
      />
      
      <main>
        <HeroSection />
        <PromoBanner />
        <CategoryGrid onCategorySelect={handleCategorySelect} />
        <EnhancedProductSection 
          onAddToCart={handleAddToCart} 
          cartItems={cartItems} 
          selectedCategoryId={selectedCategoryId}
        />
      </main>
      
      <Footer />
      
      <AuthSidebar 
        isOpen={showAuthSidebar} 
        onClose={() => setShowAuthSidebar(false)} 
      />
    </div>
  );
};

export default Index;
