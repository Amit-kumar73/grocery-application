import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock product data
const milkProducts = [
  {
    id: 1,
    name: 'Amul Taaza Toned Milk',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85169f?w=300&h=300&fit=crop',
    price: 27,
    originalPrice: 30,
    unit: '500 ml',
    discount: 10,
    inStock: true,
    category: 'milk'
  },
  {
    id: 2,
    name: 'Mother Dairy Full Cream Milk',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop',
    price: 32,
    unit: '500 ml',
    inStock: true,
    category: 'milk'
  },
  {
    id: 3,
    name: 'Amul Gold Full Cream Milk',
    image: 'https://images.unsplash.com/photo-1600717421821-bd55dc43f8b5?w=300&h=300&fit=crop',
    price: 35,
    originalPrice: 38,
    unit: '500 ml',
    discount: 8,
    inStock: true,
    category: 'milk'
  },
  {
    id: 4,
    name: 'Nestle A+ Toned Milk',
    image: 'https://images.unsplash.com/photo-1585515656663-fae33794aa5a?w=300&h=300&fit=crop',
    price: 28,
    unit: '500 ml',
    inStock: true,
    category: 'milk'
  },
  {
    id: 5,
    name: 'Amul Fresh Paneer',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&h=300&fit=crop',
    price: 85,
    originalPrice: 90,
    unit: '200 g',
    discount: 6,
    inStock: true,
    category: 'dairy'
  },
  {
    id: 6,
    name: 'Britannia Cheese Cubes',
    image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=300&h=300&fit=crop',
    price: 120,
    unit: '200 g',
    inStock: true,
    category: 'dairy'
  },
  {
    id: 7,
    name: 'Amul Butter',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop',
    price: 52,
    originalPrice: 55,
    unit: '100 g',
    discount: 5,
    inStock: true,
    category: 'dairy'
  },
  {
    id: 8,
    name: 'Nestle Everyday Milk Powder',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    price: 185,
    unit: '400 g',
    inStock: false,
    category: 'milk'
  }
];

interface ProductSectionProps {
  onAddToCart: (productId: number, quantity: number) => void;
  cartItems: { [key: number]: number };
}

export const ProductSection = ({ onAddToCart, cartItems }: ProductSectionProps) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return milkProducts;
    return milkProducts.filter(product => product.category === activeTab);
  }, [activeTab]);

  return (
    <section className="py-8 md:py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Dairy & Milk Products
          </h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="milk">Milk</TabsTrigger>
            <TabsTrigger value="dairy">Dairy</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  cartQuantity={cartItems[product.id] || 0}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};