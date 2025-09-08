import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

// Import product images
import amulTaazaMilk from '@/assets/products/amul-taaza-milk.jpg';
import motherDairyMilk from '@/assets/products/mother-dairy-milk.jpg';
import amulGoldMilk from '@/assets/products/amul-gold-milk.jpg';
import nestleAPlusMilk from '@/assets/products/nestle-a-plus-milk.jpg';
import amulPaneer from '@/assets/products/amul-paneer.jpg';
import britanniaCheese from '@/assets/products/britannia-cheese.jpg';
import amulButter from '@/assets/products/amul-butter.jpg';
import nestleMilkPowder from '@/assets/products/nestle-milk-powder.jpg';

// Product data mapping (we'll use the same products from ProductSection for now)
const productData: { [key: number]: { id: number; name: string; image: string; price: number; unit: string } } = {
  1: { id: 1, name: 'Amul Taaza Toned Milk', image: amulTaazaMilk, price: 27, unit: '500 ml' },
  2: { id: 2, name: 'Mother Dairy Full Cream Milk', image: motherDairyMilk, price: 32, unit: '500 ml' },
  3: { id: 3, name: 'Amul Gold Full Cream Milk', image: amulGoldMilk, price: 35, unit: '500 ml' },
  4: { id: 4, name: 'Nestle A+ Toned Milk', image: nestleAPlusMilk, price: 28, unit: '500 ml' },
  5: { id: 5, name: 'Amul Fresh Paneer', image: amulPaneer, price: 85, unit: '200 g' },
  6: { id: 6, name: 'Britannia Cheese Cubes', image: britanniaCheese, price: 120, unit: '200 g' },
  7: { id: 7, name: 'Amul Butter', image: amulButter, price: 52, unit: '100 g' },
  8: { id: 8, name: 'Nestle Everyday Milk Powder', image: nestleMilkPowder, price: 185, unit: '400 g' },
};

interface CartSidebarProps {
  cartItems: { [key: number]: number };
  onUpdateCart: (productId: number, quantity: number) => void;
  cartCount: number;
}

export const CartSidebar = ({ cartItems, onUpdateCart, cartCount }: CartSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const cartProducts = Object.entries(cartItems)
    .filter(([_, quantity]) => quantity > 0)
    .map(([productId, quantity]) => ({
      ...productData[parseInt(productId)],
      quantity
    }));

  const totalAmount = cartProducts.reduce((sum, product) => {
    return sum + (product.price * product.quantity);
  }, 0);

  const handleQuantityChange = (productId: number, change: number) => {
    const currentQuantity = cartItems[productId] || 0;
    const newQuantity = Math.max(0, currentQuantity + change);
    onUpdateCart(productId, change);
  };

  const handleRemoveItem = (productId: number) => {
    const currentQuantity = cartItems[productId] || 0;
    onUpdateCart(productId, -currentQuantity);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Shopping Cart ({cartCount} items)</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full py-6">
          {cartProducts.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <div>
                <h3 className="font-semibold text-lg">Your cart is empty</h3>
                <p className="text-muted-foreground">Add some products to get started</p>
              </div>
              <Button onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto">
                {cartProducts.map((product) => (
                  <Card key={product.id} className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm leading-tight">{product.name}</h4>
                        <p className="text-muted-foreground text-sm">{product.unit}</p>
                        <p className="font-semibold text-primary">₹{product.price}</p>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(product.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="font-medium text-sm w-8 text-center">
                            {product.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="space-y-4">
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>₹29</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{totalAmount + 29}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};