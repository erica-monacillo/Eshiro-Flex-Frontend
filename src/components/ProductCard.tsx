import React from "react";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  imageSrc: string;
  productName: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  productName,
  price,
}) => {
  return (
    <div className="relative bg-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 p-4">
      
      {/* Wishlist & Swap Buttons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        <button className="p-1 text-gray-300 bg-gray-800 rounded-full shadow-sm hover:bg-gray-700 hover:text-red-400">
          <Heart size={18} />
        </button>
        <button className="p-1 text-gray-300 bg-gray-800 rounded-full shadow-sm hover:bg-gray-700 hover:text-gray-400">
          ⇅
        </button>
      </div>

      {/* Product Image */}
      <img
        src={imageSrc}
        alt={productName}
        className="w-full h-40 object-cover rounded-xl mb-3"
      />

      {/* Product Details */}
      <div>
        <h2 className="font-semibold text-white truncate">{productName}</h2>
        <p className="text-sm text-gray-400">My Store</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-bold text-white">{price}</p>
          <p className="text-xs line-through text-gray-500">₱80.00</p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button className="mt-4 w-full bg-white text-black text-sm py-2 rounded-full shadow hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 transition">
        <ShoppingCart size={16} className="mr-1 inline" /> ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
