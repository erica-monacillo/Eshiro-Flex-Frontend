import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

interface CartItem {
  id: number;
  productName: string;
  price: string;
  imageSrc: string;
  quantity: number;
}

interface ProductCardProps {
  id: number;
  imageSrc: string;
  productName: string;
  price: string;
  onAddToCart: (item: CartItem) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageSrc,
  productName,
  price,
  onAddToCart,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isAdded) {
      const item: CartItem = {
        id,
        productName,
        price,
        imageSrc,
        quantity: 1,
      };
      onAddToCart(item);
      setIsAdded(true);

      // Trigger notification
      toast.success(`${productName} added to cart!`);
    }
  };

  return (
    <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-4">
      {/* Wishlist & Swap Buttons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        <button
          className="p-1 text-gray-300 bg-gray-800 rounded-full hover:text-red-400"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart size={18} />
        </button>
        <button
          className="p-1 text-gray-300 bg-gray-800 rounded-full hover:text-gray-400"
          onClick={(e) => e.stopPropagation()}
        >
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
        <h2 className="font-semibold text-white">{productName}</h2>
        <p className="text-sm text-gray-400">My Store</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-bold text-white">{price}</p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        className={`mt-4 w-full ${
          isAdded
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-300"
        } text-sm py-2 rounded-full`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        <ShoppingCart size={16} className="mr-1 inline" />
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
