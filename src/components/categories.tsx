import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

interface Category {
  icon: string;
  label: string;
}

const categories: Category[] = [
  { icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT21qM4zE1gUne1mx9jH3Rb7WxyIJE5tDzVkEFCuMS81veMjmIivh-BuNHU4hXmVfIfFg&usqp=CAU/50", label: "Men's Apparel" },
  { icon: "https://shop.lucerneluxe.com/cdn/shop/products/T127.410.11.041.00_300x300.png?v=1737084342", label: "Men's Bags & Accessories" },
  { icon: "https://m.media-amazon.com/images/I/516eahV5TxL.jpg", label: "Mobiles Accessories" },
  { icon: "https://images.philips.com/is/image/philipsconsumer/90f9f91dd8694f48b566b0d200ef190b?wid=700&hei=700&$pnglarge$", label: "Home Entertainment" },
  { icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYJFVtZEFTGhK3evOFC4_For0TbR05gwYpBg&s", label: "Home & Living" },
  { icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz-zug3beaEHM6PXfDsCigwKQ5PkFa-SeMSQ&s/50", label: "Women's Apparel" },
  { icon: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/tortoise-gold-brown-gradient-full-rim-cat-eye-john-jacobs-jj-tints-jj-s13150-c1-sunglasses_john-jacobs-jj-s13150-c1-sunglasses_eyeglasses_g_2468_05_july23.jpg", label: "Women Accessories" },
  { icon: "https://s3.credihealth.com/2xns3539wlminxt4ni6pc7xjakw5", label: "Health & Personal Care" },
  { icon: "https://makeupforever.ph/cdn/shop/products/I000064100_1.png?v=1676866434", label: "Makeup & Fragrances" },
  { icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-k3gvdV4H9JgllYiJPzUwBHFLwtvaKyVPsg&s", label: "Pet Care" },
];

const sampleProducts = [
  { image: "https://via.placeholder.com/150", name: "Product 1", price: "₱99.99" },
  { image: "https://via.placeholder.com/150", name: "Product 2", price: "₱89.99" },
  { image: "https://via.placeholder.com/150", name: "Product 3", price: "₱79.99" },
  { image: "https://via.placeholder.com/150", name: "Product 4", price: "₱69.99" },
  { image: "https://via.placeholder.com/150", name: "Product 4", price: "₱59.99" },
  { image: "https://via.placeholder.com/150", name: "Product 6", price: "₱49.99" },
];

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="bg-white py-4">
      <div className="container mx-auto px-4">
        {!selectedCategory ? (
          <div className="grid grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setSelectedCategory(category.label)}
              >
                <img src={category.icon} alt={category.label} className="w-12 h-12 rounded-full" />
                <p className="text-sm text-center text-gray-700">{category.label}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center bg-white z-50 p-4">
            <button
              className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setSelectedCategory(null)}
            >
              Back
            </button>
            <h1 className="text-2xl font-bold mb-4">{selectedCategory}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sampleProducts.map((product, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-lg bg-[#D2B48C] relative">
                  {/* Discount Badge */}
                  
            

                  {/* Favorite and Compare Buttons */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button className="text-gray-600 hover:text-red-500">
                      <Heart size={20} />
                    </button>
                    <button className="text-gray-600 hover:text-gray-800">
                      ⇅
                    </button>
                  </div>

                  <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded" />
                  <h2 className="font-bold mt-2 text-sm truncate">{product.name}</h2>
                  <p className="text-gray-600 text-xs">My Store</p>

                  {/* Price Section */}
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-lg">{product.price}</p>
                    <p className="text-sm line-through text-gray-500">₱80.00</p>
                  </div>

                  {/* Variant Options */}
                  <div className="flex flex-wrap gap-2 my-2">
                    <span className="text-xs bg-black text-white px-2 py-1 rounded-full">50ml pet cologne orange</span>
                    <span className="text-xs bg-black text-white px-2 py-1 rounded-full">100ml pet cologne orange</span>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="mt-2 flex items-center justify-center bg-orange-600 text-white rounded-lg py-2 w-full hover:bg-beige-700 transition">
                    <ShoppingCart size={16} className="mr-2" /> ADD TO CART
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Categories />
    </div>
  );
};

export default Home;
