import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

const sampleProducts = [
  { image: "https://via.placeholder.com/150", name: "Product 1", price: "₱99.99" },
  { image: "https://via.placeholder.com/150", name: "Product 2", price: "₱89.99" },
  { image: "https://via.placeholder.com/150", name: "Product 3", price: "₱79.99" },
  { image: "https://via.placeholder.com/150", name: "Product 4", price: "₱69.99" },
  { image: "https://via.placeholder.com/150", name: "Product 5", price: "₱59.99" },
  { image: "https://via.placeholder.com/150", name: "Product 6", price: "₱49.99" },
];

const MotionControlPage: React.FC = () => {
  console.log("MotionControlPage Loaded")
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-700 min-h-screen py-6">
      <div className="container mx-auto px-6">
        {/* Wide Image */}
        <div className="mb-8">
          <img
            src="https://xeleroshoes.com/wp-content/uploads/2022/06/Steadfast-White-Coral-Lifestyle-High-Res-002-1-768x513.jpg"
            alt=""
            className="w-full xl:w-screen h-64 object-cover rounded-lg shadow-lg"
            style={{ objectPosition: "40% 60%" }}
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-6">Motion Control</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {sampleProducts.map((product, index) => (
            <div
              key={index}
              className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 p-4"
            >
              <div className="absolute top-3 right-3 flex space-x-2">
                <button className="p-1 text-gray-300 bg-gray-700 rounded-full shadow-sm hover:bg-gray-600 hover:text-red-400">
                  <Heart size={18} />
                </button>
                <button className="p-1 text-gray-300 bg-gray-700 rounded-full shadow-sm hover:bg-gray-600 hover:text-gray-400">⇅</button>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="font-semibold text-white truncate">{product.name}</h2>
              <p className="text-sm text-gray-400">My Store</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-white">{product.price}</p>
                <p className="text-xs line-through text-gray-500">₱80.00</p>
              </div>
              <button className="mt-4 w-full bg-white text-black text-sm py-2 rounded-md shadow hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 transition">
                <ShoppingCart size={16} className="mr-1 inline" /> ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotionControlPage;
