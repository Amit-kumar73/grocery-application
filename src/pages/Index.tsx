import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoryGrid } from '@/components/CategoryGrid';
import { ProductSection } from '@/components/ProductSection';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const { toast } = useToast();

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
