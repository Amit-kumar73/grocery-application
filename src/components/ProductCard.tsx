import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  unit: string;
  discount?: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
  cartQuantity: number;
}

export const ProductCard = ({ product, onAddToCart, cartQuantity }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(cartQuantity);

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(product.id, 1);
  };

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onAddToCart(product.id, 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart(product.id, -1);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-200 border-0 bg-card">
      <div className="p-4 space-y-3">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted/30 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              {product.discount}% OFF
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-medium text-sm leading-tight text-foreground line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">{product.unit}</p>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="font-bold text-foreground">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="pt-2">
          {quantity === 0 ? (
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium h-9 text-sm"
            >
              {product.inStock ? 'ADD' : 'Out of Stock'}
            </Button>
          ) : (
            <div className="flex items-center justify-between bg-primary rounded-md">
              <Button
                onClick={handleDecrement}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium text-primary-foreground px-2">
                {quantity}
              </span>
              <Button
                onClick={handleIncrement}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};