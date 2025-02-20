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

const WomensAccessoriesPage: React.FC = () => {
  return (
    <div className="bg-white py-4">
      <div className="container mx-auto px-4">
        {/* Wide Image */}
        <div className="mb-6">
          <img
            src=""
            alt=""
            className="w-full xl:w-screen h-64 object-cover rounded-lg shadow-lg scale-80"
            style={{ objectPosition: "40% 30%" }}
          />
        </div>
        <h1 className="text-2xl font-bold mb-4">Women's Accessories</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sampleProducts.map((product, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-lg bg-[#D2B48C] relative"
            >
              <div className="absolute top-2 right-2 flex space-x-2">
                <button className="text-gray-600 hover:text-red-500">
                  <Heart size={20} />
                </button>
                <button className="text-gray-600 hover:text-gray-800">⇅</button>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded"
              />
              <h2 className="font-bold mt-2 text-sm truncate">{product.name}</h2>
              <p className="text-gray-600 text-xs">My Store</p>
              <div className="flex items-center space-x-2">
                <p className="font-bold text-lg">{product.price}</p>
                <p className="text-sm line-through text-gray-500">₱80.00</p>
              </div>
              <button className="mt-2 flex items-center justify-center bg-orange-600 text-white rounded-lg py-2 w-full hover:bg-beige-700 transition">
                <ShoppingCart size={16} className="mr-2" /> ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WomensAccessoriesPage;
