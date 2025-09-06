import { Card } from '@/components/ui/card';

const categories = [
  { id: 1, name: 'Vegetables & Fruits', emoji: '🥬', color: 'bg-green-50' },
  { id: 2, name: 'Dairy & Breakfast', emoji: '🥛', color: 'bg-blue-50' },
  { id: 3, name: 'Munchies', emoji: '🍿', color: 'bg-yellow-50' },
  { id: 4, name: 'Cold Drinks & Juices', emoji: '🥤', color: 'bg-orange-50' },
  { id: 5, name: 'Instant & Frozen Food', emoji: '🍕', color: 'bg-red-50' },
  { id: 6, name: 'Tea, Coffee & Health Drink', emoji: '☕', color: 'bg-amber-50' },
  { id: 7, name: 'Bakery & Biscuits', emoji: '🍞', color: 'bg-orange-50' },
  { id: 8, name: 'Sweet Tooth', emoji: '🍭', color: 'bg-pink-50' },
];

interface CategoryGridProps {
  onCategorySelect: (categoryId: number) => void;
}

export const CategoryGrid = ({ onCategorySelect }: CategoryGridProps) => {
  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 md:mb-8">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 bg-card"
              onClick={() => onCategorySelect(category.id)}
            >
              <div className="p-4 md:p-6 text-center space-y-3">
                <div className={`${category.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200`}>
                  <span className="text-2xl md:text-3xl">{category.emoji}</span>
                </div>
                <h3 className="font-semibold text-sm md:text-base text-foreground leading-tight">
                  {category.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};