import React, { useState } from 'react';
import { AlertCircle, ShoppingCart, Search, Filter, Heart } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import headsetImg from '../img/Premium Gaming Headset.jpg';
import keyboardImg from '../img/Mechanical Keyboard.jpg';
import mouseImg from '../img/Gaming Mouse.jpg';
import monitorImg from '../img/Gaming Monitor.jpg';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const CrimsonShop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [error, setError] = useState<string | null>(null);

  const demoProducts: Product[] = [
    {
      id: 1,
      name: "Premium Gaming Headset",
      price: 129.99,
      image: headsetImg,
      category: "Electronics"
    },
    {
      id: 2,
      name: "Mechanical Keyboard",
      price: 159.99,
      image: keyboardImg,
      category: "Electronics"
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 79.99,
      image: mouseImg,
      category: "Electronics"
    },
    {
      id: 4,
      name: "Gaming Monitor",
      price: 299.99,
      image: monitorImg,
      category: "Electronics"
    }
  ];

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <CardHeader>
            <CardTitle>Crimson Shop</CardTitle>
            <CardDescription>
              Discover our curated collection of premium gaming gear and accessories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {demoProducts.map((product) => (
                  <div key={product.id} className="relative group">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-200"
                      />
                    </div>
                    <div className="mt-2">
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${product.price}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="secondary">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <ShoppingCart className="mr-2 h-4 w-4" />
              View Cart
            </Button>
          </CardFooter>
        </TabsContent>
        <TabsContent value="categories">
          <CardHeader>
            <CardTitle>Shop by Category</CardTitle>
            <CardDescription>
              Browse our products by category.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {["Electronics", "Accessories", "Gaming", "Peripherals"].map((category) => (
                <div
                  key={category}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 cursor-pointer transition-colors"
                >
                  <h3 className="font-semibold">{category}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.floor(Math.random() * 50)} items
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="wishlist">
          <CardHeader>
            <CardTitle>Your Wishlist</CardTitle>
            <CardDescription>
              Items you've saved for later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Your wishlist is empty</p>
              <p className="text-sm">Start adding items you love!</p>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CrimsonShop;
