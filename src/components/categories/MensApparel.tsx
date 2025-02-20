import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

const sampleProducts = [
  { image: "data:image/jpeg;base64,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", name: "Product 1", price: "₱99.99" },
  { image: "https://via.placeholder.com/150", name: "Product 2", price: "₱89.99" },
  { image: "https://via.placeholder.com/150", name: "Product 3", price: "₱79.99" },
  { image: "https://via.placeholder.com/150", name: "Product 4", price: "₱69.99" },
  { image: "https://via.placeholder.com/150", name: "Product 5", price: "₱59.99" },
  { image: "https://via.placeholder.com/150", name: "Product 6", price: "₱49.99" },
];

const MensApparelPage: React.FC = () => {
  return (
    <div className="bg-white py-4">
      <div className="container mx-auto px-4">
        {/* Wide Image */}
        <div className="mb-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/033/225/770/non_2x/autumn-beige-color-style-for-men-s-wear-brand-facebook-cover-template-free-editor_template.jpeg"
            alt="Men's Apparel Banner"
            className="w-full xl:w-screen h-64 object-cover rounded-lg shadow-lg scale-80"
            style={{ objectPosition: "40% 30%" }}
          />
        </div>
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-4">Men's Apparel</h1>
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {sampleProducts.map((product, index) => (
            <div
              key={index}
              className="relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 p-4"
            >
              {/* Wishlist & Options Buttons */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="p-1 text-gray-500 bg-white rounded-full shadow-sm hover:bg-red-100 hover:text-red-500">
                  <Heart size={18} />
                </button>
                <button className="p-1 text-gray-500 bg-white rounded-full shadow-sm hover:bg-gray-100 hover:text-gray-700">
                  ⇅
                </button>
              </div>

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-50 object-cover rounded-md mb-3"
              />

              {/* Product Details */}
              <div>
                <h2 className="font-semibold text-gray-800 truncate">{product.name}</h2>
                <p className="text-sm text-gray-500">My Store</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold text-gray-900">{product.price}</p>
                  <p className="text-xs line-through text-gray-400">₱80.00</p>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="mt-4 w-full bg-orange-600 text-white text-sm py-2 rounded-md shadow hover:bg-orange-500 focus:ring-2 focus:ring-orange-400 transition">
                <ShoppingCart size={16} className="mr-1 inline" /> ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MensApparelPage;
