import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import all product images
import amulTaazaMilk from '@/assets/products/amul-taaza-milk.jpg';
import motherDairyMilk from '@/assets/products/mother-dairy-milk.jpg';
import amulGoldMilk from '@/assets/products/amul-gold-milk.jpg';
import nestleAPlusMilk from '@/assets/products/nestle-a-plus-milk.jpg';
import amulPaneer from '@/assets/products/amul-paneer.jpg';
import britanniaCheese from '@/assets/products/britannia-cheese.jpg';
import amulButter from '@/assets/products/amul-butter.jpg';
import nestleMilkPowder from '@/assets/products/nestle-milk-powder.jpg';

// Newly generated images
import tomatoes from '@/assets/products/tomatoes.jpg';
import spinach from '@/assets/products/spinach.jpg';
import oranges from '@/assets/products/oranges.jpg';
import bananas from '@/assets/products/bananas.jpg';
import chips from '@/assets/products/chips.jpg';
import popcorn from '@/assets/products/popcorn.jpg';
import orangeJuice from '@/assets/products/orange-juice.jpg';
import cola from '@/assets/products/cola.jpg';
import frozenPizza from '@/assets/products/frozen-pizza.jpg';
import instantNoodles from '@/assets/products/instant-noodles.jpg';
import blackTea from '@/assets/products/black-tea.jpg';
import coffeeBeans from '@/assets/products/coffee-beans.jpg';
import breadLoaf from '@/assets/products/bread-loaf.jpg';
import cookies from '@/assets/products/cookies.jpg';
import chocolateBar from '@/assets/products/chocolate-bar.jpg';
import lollipops from '@/assets/products/lollipops.jpg';
import greenApples from '@/assets/products/green-apples.jpg';
import carrots from '@/assets/products/carrots.jpg';
import potatoes from '@/assets/products/potatoes.jpg';
import onions from '@/assets/products/onions.jpg';

// Comprehensive product data for all 8 categories
const allProducts = [
  // Category 1: Vegetables & Fruits (20 items)
  { id: 101, name: 'Fresh Tomatoes', image: tomatoes, price: 40, originalPrice: 45, unit: '500 g', discount: 11, inStock: true, category: 'vegetables-fruits' },
  { id: 102, name: 'Spinach Leaves', image: spinach, price: 25, unit: '250 g', inStock: true, category: 'vegetables-fruits' },
  { id: 103, name: 'Fresh Oranges', image: oranges, price: 80, originalPrice: 90, unit: '1 kg', discount: 11, inStock: true, category: 'vegetables-fruits' },
  { id: 104, name: 'Ripe Bananas', image: bananas, price: 60, unit: '1 kg', inStock: true, category: 'vegetables-fruits' },
  { id: 105, name: 'Green Apples', image: greenApples, price: 120, originalPrice: 140, unit: '1 kg', discount: 14, inStock: true, category: 'vegetables-fruits' },
  { id: 106, name: 'Fresh Carrots', image: carrots, price: 35, unit: '500 g', inStock: true, category: 'vegetables-fruits' },
  { id: 107, name: 'Potatoes', image: potatoes, price: 30, unit: '1 kg', inStock: true, category: 'vegetables-fruits' },
  { id: 108, name: 'White Onions', image: onions, price: 45, originalPrice: 50, unit: '1 kg', discount: 10, inStock: true, category: 'vegetables-fruits' },
  { id: 109, name: 'Fresh Lemon', image: oranges, price: 60, unit: '500 g', inStock: true, category: 'vegetables-fruits' },
  { id: 110, name: 'Cucumber', image: spinach, price: 35, unit: '500 g', inStock: true, category: 'vegetables-fruits' },
  { id: 111, name: 'Bell Peppers', image: carrots, price: 80, originalPrice: 90, unit: '500 g', discount: 11, inStock: true, category: 'vegetables-fruits' },
  { id: 112, name: 'Fresh Cauliflower', image: potatoes, price: 40, unit: '1 piece', inStock: true, category: 'vegetables-fruits' },
  { id: 113, name: 'Broccoli', image: spinach, price: 60, originalPrice: 70, unit: '500 g', discount: 14, inStock: true, category: 'vegetables-fruits' },
  { id: 114, name: 'Sweet Potato', image: potatoes, price: 50, unit: '500 g', inStock: true, category: 'vegetables-fruits' },
  { id: 115, name: 'Fresh Ginger', image: onions, price: 120, unit: '250 g', inStock: true, category: 'vegetables-fruits' },
  { id: 116, name: 'Garlic', image: onions, price: 200, originalPrice: 220, unit: '250 g', discount: 9, inStock: true, category: 'vegetables-fruits' },
  { id: 117, name: 'Papaya', image: oranges, price: 45, unit: '1 kg', inStock: true, category: 'vegetables-fruits' },
  { id: 118, name: 'Mango', image: oranges, price: 150, originalPrice: 180, unit: '1 kg', discount: 17, inStock: false, category: 'vegetables-fruits' },
  { id: 119, name: 'Grapes', image: bananas, price: 100, unit: '500 g', inStock: true, category: 'vegetables-fruits' },
  { id: 120, name: 'Pomegranate', image: oranges, price: 180, originalPrice: 200, unit: '1 kg', discount: 10, inStock: true, category: 'vegetables-fruits' },

  // Category 2: Dairy & Breakfast (20 items)
  { id: 201, name: 'Amul Taaza Toned Milk', image: amulTaazaMilk, price: 27, originalPrice: 30, unit: '500 ml', discount: 10, inStock: true, category: 'dairy-breakfast' },
  { id: 202, name: 'Mother Dairy Full Cream Milk', image: motherDairyMilk, price: 32, unit: '500 ml', inStock: true, category: 'dairy-breakfast' },
  { id: 203, name: 'Amul Gold Full Cream Milk', image: amulGoldMilk, price: 35, originalPrice: 38, unit: '500 ml', discount: 8, inStock: true, category: 'dairy-breakfast' },
  { id: 204, name: 'Nestle A+ Toned Milk', image: nestleAPlusMilk, price: 28, unit: '500 ml', inStock: true, category: 'dairy-breakfast' },
  { id: 205, name: 'Amul Fresh Paneer', image: amulPaneer, price: 85, originalPrice: 90, unit: '200 g', discount: 6, inStock: true, category: 'dairy-breakfast' },
  { id: 206, name: 'Britannia Cheese Cubes', image: britanniaCheese, price: 120, unit: '200 g', inStock: true, category: 'dairy-breakfast' },
  { id: 207, name: 'Amul Butter', image: amulButter, price: 52, originalPrice: 55, unit: '100 g', discount: 5, inStock: true, category: 'dairy-breakfast' },
  { id: 208, name: 'Nestle Everyday Milk Powder', image: nestleMilkPowder, price: 185, unit: '400 g', inStock: false, category: 'dairy-breakfast' },
  { id: 209, name: 'Fresh Curd', image: amulPaneer, price: 35, unit: '400 g', inStock: true, category: 'dairy-breakfast' },
  { id: 210, name: 'Greek Yogurt', image: amulPaneer, price: 65, originalPrice: 70, unit: '200 g', discount: 7, inStock: true, category: 'dairy-breakfast' },
  { id: 211, name: 'Mozzarella Cheese', image: britanniaCheese, price: 180, unit: '200 g', inStock: true, category: 'dairy-breakfast' },
  { id: 212, name: 'Cottage Cheese', image: amulPaneer, price: 90, originalPrice: 95, unit: '250 g', discount: 5, inStock: true, category: 'dairy-breakfast' },
  { id: 213, name: 'Ghee', image: amulButter, price: 220, unit: '200 ml', inStock: true, category: 'dairy-breakfast' },
  { id: 214, name: 'Fresh Cream', image: motherDairyMilk, price: 45, unit: '200 ml', inStock: true, category: 'dairy-breakfast' },
  { id: 215, name: 'Buttermilk', image: motherDairyMilk, price: 18, unit: '200 ml', inStock: true, category: 'dairy-breakfast' },
  { id: 216, name: 'Flavored Milk - Chocolate', image: nestleAPlusMilk, price: 25, originalPrice: 28, unit: '200 ml', discount: 11, inStock: true, category: 'dairy-breakfast' },
  { id: 217, name: 'Strawberry Yogurt', image: amulPaneer, price: 35, unit: '100 g', inStock: true, category: 'dairy-breakfast' },
  { id: 218, name: 'Processed Cheese', image: britanniaCheese, price: 95, originalPrice: 100, unit: '200 g', discount: 5, inStock: true, category: 'dairy-breakfast' },
  { id: 219, name: 'Milk Bread', image: breadLoaf, price: 28, unit: '400 g', inStock: true, category: 'dairy-breakfast' },
  { id: 220, name: 'Egg Whites', image: motherDairyMilk, price: 80, unit: '500 ml', inStock: false, category: 'dairy-breakfast' },

  // Category 3: Munchies (20 items)
  { id: 301, name: 'Potato Chips', image: chips, price: 35, originalPrice: 40, unit: '150 g', discount: 13, inStock: true, category: 'munchies' },
  { id: 302, name: 'Popcorn', image: popcorn, price: 55, unit: '100 g', inStock: true, category: 'munchies' },
  { id: 303, name: 'Salted Peanuts', image: chips, price: 45, originalPrice: 50, unit: '200 g', discount: 10, inStock: true, category: 'munchies' },
  { id: 304, name: 'Masala Chips', image: chips, price: 40, unit: '150 g', inStock: true, category: 'munchies' },
  { id: 305, name: 'Mixed Nuts', image: chips, price: 180, originalPrice: 200, unit: '250 g', discount: 10, inStock: true, category: 'munchies' },
  { id: 306, name: 'Cheese Balls', image: popcorn, price: 30, unit: '50 g', inStock: true, category: 'munchies' },
  { id: 307, name: 'Corn Flakes', image: popcorn, price: 25, originalPrice: 30, unit: '75 g', discount: 17, inStock: true, category: 'munchies' },
  { id: 308, name: 'Nachos', image: chips, price: 50, unit: '150 g', inStock: true, category: 'munchies' },
  { id: 309, name: 'Roasted Almonds', image: chips, price: 250, originalPrice: 280, unit: '250 g', discount: 11, inStock: true, category: 'munchies' },
  { id: 310, name: 'Cashew Nuts', image: chips, price: 320, unit: '250 g', inStock: true, category: 'munchies' },
  { id: 311, name: 'Banana Chips', image: chips, price: 40, originalPrice: 45, unit: '100 g', discount: 11, inStock: true, category: 'munchies' },
  { id: 312, name: 'Chocolate Wafer', image: popcorn, price: 35, unit: '100 g', inStock: true, category: 'munchies' },
  { id: 313, name: 'Pretzels', image: chips, price: 60, originalPrice: 65, unit: '150 g', discount: 8, inStock: true, category: 'munchies' },
  { id: 314, name: 'Trail Mix', image: chips, price: 120, unit: '200 g', inStock: true, category: 'munchies' },
  { id: 315, name: 'Rice Crackers', image: popcorn, price: 45, originalPrice: 50, unit: '100 g', discount: 10, inStock: true, category: 'munchies' },
  { id: 316, name: 'Spicy Bhujia', image: chips, price: 38, unit: '150 g', inStock: true, category: 'munchies' },
  { id: 317, name: 'Roasted Seeds Mix', image: chips, price: 85, originalPrice: 90, unit: '200 g', discount: 6, inStock: true, category: 'munchies' },
  { id: 318, name: 'Protein Bar', image: popcorn, price: 75, unit: '50 g', inStock: false, category: 'munchies' },
  { id: 319, name: 'Granola Bar', image: popcorn, price: 65, originalPrice: 70, unit: '40 g', discount: 7, inStock: true, category: 'munchies' },
  { id: 320, name: 'Quinoa Puffs', image: popcorn, price: 95, unit: '100 g', inStock: true, category: 'munchies' },

  // Category 4: Cold Drinks & Juices (20 items)
  { id: 401, name: 'Orange Juice', image: orangeJuice, price: 45, originalPrice: 50, unit: '500 ml', discount: 10, inStock: true, category: 'cold-drinks-juices' },
  { id: 402, name: 'Coca Cola', image: cola, price: 35, unit: '600 ml', inStock: true, category: 'cold-drinks-juices' },
  { id: 403, name: 'Apple Juice', image: orangeJuice, price: 55, originalPrice: 60, unit: '500 ml', discount: 8, inStock: true, category: 'cold-drinks-juices' },
  { id: 404, name: 'Mango Juice', image: orangeJuice, price: 50, unit: '500 ml', inStock: true, category: 'cold-drinks-juices' },
  { id: 405, name: 'Pepsi', image: cola, price: 35, originalPrice: 40, unit: '600 ml', discount: 13, inStock: true, category: 'cold-drinks-juices' },
  { id: 406, name: 'Sprite', image: cola, price: 35, unit: '600 ml', inStock: true, category: 'cold-drinks-juices' },
  { id: 407, name: 'Fresh Lime Water', image: orangeJuice, price: 25, originalPrice: 30, unit: '300 ml', discount: 17, inStock: true, category: 'cold-drinks-juices' },
  { id: 408, name: 'Coconut Water', image: orangeJuice, price: 40, unit: '300 ml', inStock: true, category: 'cold-drinks-juices' },
  { id: 409, name: 'Energy Drink', image: cola, price: 80, originalPrice: 85, unit: '250 ml', discount: 6, inStock: true, category: 'cold-drinks-juices' },
  { id: 410, name: 'Sports Drink', image: cola, price: 45, unit: '500 ml', inStock: true, category: 'cold-drinks-juices' },
  { id: 411, name: 'Iced Tea', image: orangeJuice, price: 40, originalPrice: 45, unit: '500 ml', discount: 11, inStock: true, category: 'cold-drinks-juices' },
  { id: 412, name: 'Cranberry Juice', image: orangeJuice, price: 85, unit: '500 ml', inStock: true, category: 'cold-drinks-juices' },
  { id: 413, name: 'Grape Juice', image: orangeJuice, price: 60, originalPrice: 65, unit: '500 ml', discount: 8, inStock: true, category: 'cold-drinks-juices' },
  { id: 414, name: 'Pomegranate Juice', image: orangeJuice, price: 95, unit: '500 ml', inStock: true, category: 'cold-drinks-juices' },
  { id: 415, name: 'Watermelon Juice', image: orangeJuice, price: 35, originalPrice: 40, unit: '500 ml', discount: 13, inStock: true, category: 'cold-drinks-juices' },
  { id: 416, name: 'Lemonade', image: orangeJuice, price: 30, unit: '300 ml', inStock: true, category: 'cold-drinks-juices' },
  { id: 417, name: 'Green Tea', image: orangeJuice, price: 50, originalPrice: 55, unit: '500 ml', discount: 9, inStock: true, category: 'cold-drinks-juices' },
  { id: 418, name: 'Mineral Water', image: cola, price: 20, unit: '1 liter', inStock: true, category: 'cold-drinks-juices' },
  { id: 419, name: 'Flavored Soda', image: cola, price: 40, originalPrice: 45, unit: '500 ml', discount: 11, inStock: true, category: 'cold-drinks-juices' },
  { id: 420, name: 'Vitamin Water', image: orangeJuice, price: 65, unit: '500 ml', inStock: false, category: 'cold-drinks-juices' },

  // Category 5: Instant & Frozen Food (20 items)
  { id: 501, name: 'Frozen Pizza', image: frozenPizza, price: 180, originalPrice: 200, unit: '400 g', discount: 10, inStock: true, category: 'instant-frozen-food' },
  { id: 502, name: 'Instant Noodles', image: instantNoodles, price: 35, unit: '75 g', inStock: true, category: 'instant-frozen-food' },
  { id: 503, name: 'Frozen Samosa', image: frozenPizza, price: 120, originalPrice: 140, unit: '500 g', discount: 14, inStock: true, category: 'instant-frozen-food' },
  { id: 504, name: 'Ready Pasta', image: instantNoodles, price: 85, unit: '250 g', inStock: true, category: 'instant-frozen-food' },
  { id: 505, name: 'Frozen Burger Patty', image: frozenPizza, price: 160, originalPrice: 180, unit: '400 g', discount: 11, inStock: true, category: 'instant-frozen-food' },
  { id: 506, name: 'Instant Soup', image: instantNoodles, price: 45, unit: '100 g', inStock: true, category: 'instant-frozen-food' },
  { id: 507, name: 'Frozen French Fries', image: frozenPizza, price: 95, originalPrice: 105, unit: '500 g', discount: 10, inStock: true, category: 'instant-frozen-food' },
  { id: 508, name: 'Cup Noodles', image: instantNoodles, price: 40, unit: '70 g', inStock: true, category: 'instant-frozen-food' },
  { id: 509, name: 'Frozen Momos', image: frozenPizza, price: 140, originalPrice: 150, unit: '400 g', discount: 7, inStock: true, category: 'instant-frozen-food' },
  { id: 510, name: 'Instant Oats', image: instantNoodles, price: 65, unit: '500 g', inStock: true, category: 'instant-frozen-food' },
  { id: 511, name: 'Frozen Nuggets', image: frozenPizza, price: 185, originalPrice: 200, unit: '500 g', discount: 8, inStock: true, category: 'instant-frozen-food' },
  { id: 512, name: 'Instant Pancake Mix', image: instantNoodles, price: 75, unit: '200 g', inStock: true, category: 'instant-frozen-food' },
  { id: 513, name: 'Frozen Paratha', image: frozenPizza, price: 80, originalPrice: 90, unit: '400 g', discount: 11, inStock: true, category: 'instant-frozen-food' },
  { id: 514, name: 'Ready-to-eat Curry', image: instantNoodles, price: 120, unit: '300 g', inStock: true, category: 'instant-frozen-food' },
  { id: 515, name: 'Frozen Corn', image: frozenPizza, price: 60, originalPrice: 65, unit: '500 g', discount: 8, inStock: true, category: 'instant-frozen-food' },
  { id: 516, name: 'Instant Khichdi', image: instantNoodles, price: 55, unit: '200 g', inStock: true, category: 'instant-frozen-food' },
  { id: 517, name: 'Frozen Spring Rolls', image: frozenPizza, price: 155, originalPrice: 170, unit: '400 g', discount: 9, inStock: true, category: 'instant-frozen-food' },
  { id: 518, name: 'Instant Upma Mix', image: instantNoodles, price: 50, unit: '500 g', inStock: false, category: 'instant-frozen-food' },
  { id: 519, name: 'Frozen Peas', image: frozenPizza, price: 45, originalPrice: 50, unit: '500 g', discount: 10, inStock: true, category: 'instant-frozen-food' },
  { id: 520, name: 'Ready Rice', image: instantNoodles, price: 90, unit: '250 g', inStock: true, category: 'instant-frozen-food' },

  // Category 6: Tea, Coffee & Health Drink (20 items)
  { id: 601, name: 'Black Tea', image: blackTea, price: 125, originalPrice: 140, unit: '250 g', discount: 11, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 602, name: 'Coffee Beans', image: coffeeBeans, price: 280, unit: '250 g', inStock: true, category: 'tea-coffee-health-drink' },
  { id: 603, name: 'Green Tea', image: blackTea, price: 180, originalPrice: 200, unit: '100 g', discount: 10, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 604, name: 'Instant Coffee', image: coffeeBeans, price: 220, unit: '200 g', inStock: true, category: 'tea-coffee-health-drink' },
  { id: 605, name: 'Masala Tea', image: blackTea, price: 150, originalPrice: 160, unit: '250 g', discount: 6, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 606, name: 'Herbal Tea', image: blackTea, price: 240, unit: '100 g', inStock: true, category: 'tea-coffee-health-drink' },
  { id: 607, name: 'Espresso Coffee', image: coffeeBeans, price: 350, originalPrice: 380, unit: '250 g', discount: 8, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 608, name: 'Chamomile Tea', image: blackTea, price: 195, unit: '50 g', inStock: true, category: 'tea-coffee-health-drink' },
  { id: 609, name: 'Protein Powder', image: coffeeBeans, price: 890, originalPrice: 950, unit: '1 kg', discount: 6, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 610, name: 'Energy Drink Mix', image: coffeeBeans, price: 450, unit: '500 g', inStock: true, category: 'tea-coffee-health-drink' },
  { id: 611, name: 'Earl Grey Tea', image: blackTea, price: 220, originalPrice: 240, unit: '100 g', discount: 8, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 612, name: 'Cold Brew Coffee', image: coffeeBeans, price: 320, unit: '250 g', inStock: true, category: 'tea-coffee-health-drink' },
  { id: 613, name: 'Turmeric Latte Mix', image: blackTea, price: 185, originalPrice: 200, unit: '200 g', discount: 8, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 614, name: 'Matcha Powder', image: blackTea, price: 650, unit: '100 g', inStock: true, category: 'tea-coffee-health-drink' },
  { id: 615, name: 'Decaf Coffee', image: coffeeBeans, price: 285, originalPrice: 300, unit: '250 g', discount: 5, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 616, name: 'Oolong Tea', image: blackTea, price: 380, unit: '100 g', inStock: true, category: 'tea-coffee-health-drink' },
  { id: 617, name: 'Whey Protein', image: coffeeBeans, price: 1200, originalPrice: 1350, unit: '1 kg', discount: 11, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 618, name: 'Ginger Tea', image: blackTea, price: 165, unit: '100 g', inStock: false, category: 'tea-coffee-health-drink' },
  { id: 619, name: 'French Press Coffee', image: coffeeBeans, price: 395, originalPrice: 420, unit: '250 g', discount: 6, inStock: true, category: 'tea-coffee-health-drink' },
  { id: 620, name: 'Vitamin C Powder', image: coffeeBeans, price: 250, unit: '100 g', inStock: true, category: 'tea-coffee-health-drink' },

  // Category 7: Bakery & Biscuits (20 items)
  { id: 701, name: 'Bread Loaf', image: breadLoaf, price: 28, originalPrice: 32, unit: '400 g', discount: 13, inStock: true, category: 'bakery-biscuits' },
  { id: 702, name: 'Chocolate Cookies', image: cookies, price: 65, unit: '200 g', inStock: true, category: 'bakery-biscuits' },
  { id: 703, name: 'Whole Wheat Bread', image: breadLoaf, price: 35, originalPrice: 40, unit: '400 g', discount: 13, inStock: true, category: 'bakery-biscuits' },
  { id: 704, name: 'Digestive Biscuits', image: cookies, price: 45, unit: '250 g', inStock: true, category: 'bakery-biscuits' },
  { id: 705, name: 'Croissant', image: breadLoaf, price: 25, originalPrice: 30, unit: '1 piece', discount: 17, inStock: true, category: 'bakery-biscuits' },
  { id: 706, name: 'Oatmeal Cookies', image: cookies, price: 75, unit: '200 g', inStock: true, category: 'bakery-biscuits' },
  { id: 707, name: 'Garlic Bread', image: breadLoaf, price: 55, originalPrice: 60, unit: '200 g', discount: 8, inStock: true, category: 'bakery-biscuits' },
  { id: 708, name: 'Cream Biscuits', image: cookies, price: 35, unit: '150 g', inStock: true, category: 'bakery-biscuits' },
  { id: 709, name: 'Multigrain Bread', image: breadLoaf, price: 45, originalPrice: 50, unit: '400 g', discount: 10, inStock: true, category: 'bakery-biscuits' },
  { id: 710, name: 'Butter Cookies', image: cookies, price: 85, unit: '200 g', inStock: true, category: 'bakery-biscuits' },
  { id: 711, name: 'Pav Bread', image: breadLoaf, price: 22, originalPrice: 25, unit: '4 pieces', discount: 12, inStock: true, category: 'bakery-biscuits' },
  { id: 712, name: 'Marie Biscuits', image: cookies, price: 30, unit: '200 g', inStock: true, category: 'bakery-biscuits' },
  { id: 713, name: 'Focaccia Bread', image: breadLoaf, price: 95, originalPrice: 105, unit: '300 g', discount: 10, inStock: true, category: 'bakery-biscuits' },
  { id: 714, name: 'Ginger Biscuits', image: cookies, price: 50, unit: '200 g', inStock: true, category: 'bakery-biscuits' },
  { id: 715, name: 'Dinner Rolls', image: breadLoaf, price: 40, originalPrice: 45, unit: '6 pieces', discount: 11, inStock: true, category: 'bakery-biscuits' },
  { id: 716, name: 'Chocolate Chip Cookies', image: cookies, price: 95, unit: '200 g', inStock: true, category: 'bakery-biscuits' },
  { id: 717, name: 'Sourdough Bread', image: breadLoaf, price: 85, originalPrice: 95, unit: '500 g', discount: 11, inStock: true, category: 'bakery-biscuits' },
  { id: 718, name: 'Wafer Biscuits', image: cookies, price: 40, unit: '150 g', inStock: false, category: 'bakery-biscuits' },
  { id: 719, name: 'Baguette', image: breadLoaf, price: 60, originalPrice: 65, unit: '300 g', discount: 8, inStock: true, category: 'bakery-biscuits' },
  { id: 720, name: 'Shortbread', image: cookies, price: 110, unit: '250 g', inStock: true, category: 'bakery-biscuits' },

  // Category 8: Sweet Tooth (20 items)
  { id: 801, name: 'Chocolate Bar', image: chocolateBar, price: 45, originalPrice: 50, unit: '100 g', discount: 10, inStock: true, category: 'sweet-tooth' },
  { id: 802, name: 'Lollipops', image: lollipops, price: 25, unit: '5 pieces', inStock: true, category: 'sweet-tooth' },
  { id: 803, name: 'Dark Chocolate', image: chocolateBar, price: 85, originalPrice: 95, unit: '100 g', discount: 11, inStock: true, category: 'sweet-tooth' },
  { id: 804, name: 'Gummy Bears', image: lollipops, price: 35, unit: '100 g', inStock: true, category: 'sweet-tooth' },
  { id: 805, name: 'Milk Chocolate', image: chocolateBar, price: 55, originalPrice: 60, unit: '100 g', discount: 8, inStock: true, category: 'sweet-tooth' },
  { id: 806, name: 'Hard Candies', image: lollipops, price: 30, unit: '150 g', inStock: true, category: 'sweet-tooth' },
  { id: 807, name: 'White Chocolate', image: chocolateBar, price: 75, originalPrice: 80, unit: '100 g', discount: 6, inStock: true, category: 'sweet-tooth' },
  { id: 808, name: 'Jelly Beans', image: lollipops, price: 40, unit: '200 g', inStock: true, category: 'sweet-tooth' },
  { id: 809, name: 'Chocolate Truffles', image: chocolateBar, price: 120, originalPrice: 135, unit: '150 g', discount: 11, inStock: true, category: 'sweet-tooth' },
  { id: 810, name: 'Marshmallows', image: lollipops, price: 50, unit: '200 g', inStock: true, category: 'sweet-tooth' },
  { id: 811, name: 'Caramel Candies', image: lollipops, price: 45, originalPrice: 50, unit: '200 g', discount: 10, inStock: true, category: 'sweet-tooth' },
  { id: 812, name: 'Nutty Chocolate', image: chocolateBar, price: 95, unit: '100 g', inStock: true, category: 'sweet-tooth' },
  { id: 813, name: 'Rock Candy', image: lollipops, price: 35, originalPrice: 40, unit: '150 g', discount: 13, inStock: true, category: 'sweet-tooth' },
  { id: 814, name: 'Chocolate Spread', image: chocolateBar, price: 180, unit: '350 g', inStock: true, category: 'sweet-tooth' },
  { id: 815, name: 'Fruit Candies', image: lollipops, price: 38, originalPrice: 42, unit: '200 g', discount: 10, inStock: true, category: 'sweet-tooth' },
  { id: 816, name: 'Chocolate Wafers', image: chocolateBar, price: 65, unit: '150 g', inStock: true, category: 'sweet-tooth' },
  { id: 817, name: 'Mint Candies', image: lollipops, price: 25, originalPrice: 30, unit: '100 g', discount: 17, inStock: true, category: 'sweet-tooth' },
  { id: 818, name: 'Fudge', image: chocolateBar, price: 155, unit: '200 g', inStock: false, category: 'sweet-tooth' },
  { id: 819, name: 'Toffees', image: lollipops, price: 42, originalPrice: 45, unit: '200 g', discount: 7, inStock: true, category: 'sweet-tooth' },
  { id: 820, name: 'Peanut Butter Cups', image: chocolateBar, price: 85, unit: '150 g', inStock: true, category: 'sweet-tooth' },
];

// Category mapping for the tabs
const categoryMapping = {
  1: 'vegetables-fruits',
  2: 'dairy-breakfast', 
  3: 'munchies',
  4: 'cold-drinks-juices',
  5: 'instant-frozen-food',
  6: 'tea-coffee-health-drink',
  7: 'bakery-biscuits',
  8: 'sweet-tooth'
};

interface EnhancedProductSectionProps {
  onAddToCart: (productId: number, quantity: number) => void;
  cartItems: { [key: number]: number };
  selectedCategoryId?: number;
}

export const EnhancedProductSection = ({ onAddToCart, cartItems, selectedCategoryId }: EnhancedProductSectionProps) => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategoryId && categoryMapping[selectedCategoryId as keyof typeof categoryMapping]) {
      return allProducts.filter(product => product.category === categoryMapping[selectedCategoryId as keyof typeof categoryMapping]);
    }
    if (activeTab === 'all') return allProducts;
    return allProducts.filter(product => product.category === activeTab);
  }, [activeTab, selectedCategoryId]);

  // Update active tab when category is selected
  React.useEffect(() => {
    if (selectedCategoryId && categoryMapping[selectedCategoryId as keyof typeof categoryMapping]) {
      setActiveTab(categoryMapping[selectedCategoryId as keyof typeof categoryMapping]);
    }
  }, [selectedCategoryId]);

  return (
    <section className="py-8 md:py-12 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Our Products
          </h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 lg:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="vegetables-fruits">Fruits</TabsTrigger>
            <TabsTrigger value="dairy-breakfast">Dairy</TabsTrigger>
            <TabsTrigger value="munchies">Snacks</TabsTrigger>
            <TabsTrigger value="cold-drinks-juices">Drinks</TabsTrigger>
            <TabsTrigger value="instant-frozen-food">Instant</TabsTrigger>
            <TabsTrigger value="tea-coffee-health-drink">Beverages</TabsTrigger>
            <TabsTrigger value="bakery-biscuits">Bakery</TabsTrigger>
            <TabsTrigger value="sweet-tooth">Sweets</TabsTrigger>
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