import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Use `useNavigate` in React Router v6
import axios from "axios"; // Import axios for making API calls

interface CartItem {
  id: number;
  productName: string;
  price: string;
  imageSrc: string;
  quantity: number;
}

interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
  product_size: string;
  created_at: string;
}

interface ProductCardProps {
  id: number;
  imageSrc: string;
  productName: string;
  price: string;
  onAddToCart: (item: CartItem) => void;
  onAddToWishlist: (item: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  imageSrc,
  productName,
  price,
  onAddToWishlist,
}) => {
  const [isAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false); // Track if item is wishlisted
  const navigate = useNavigate(); // Use `useNavigate` in React Router v6

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>, item: CartItem) => {
    e.stopPropagation();
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Unauthorized: No token found.");
        return;
      }
  
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        { product: item.id, quantity: 1 },
        { headers: { Authorization: `Token ${token}` } }
      );
  
      console.log("API Response:", response);  // Log the full response
      toast.success(`${item.productName} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);  // Log error to console
      toast.error("Failed to add item to cart.");
    }
  };
  
  

  const handleAddToWishlist = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const item: Product = {
      id,
      category: "Category", // You can replace this based on your use case
      name: productName,
      description: "Product Description", // You can replace this
      price,
      stock: 10, // Example value
      image_url: imageSrc,
      product_size: "M", // Example size
      created_at: new Date().toISOString(), // Example value
    };
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You need to be logged in to add items to the wishlist.");
        return;
      }

      // Make POST request to add item to wishlist
      await axios.post(
        "http://127.0.0.1:8000/api/wishlist/",
        { product: id },
        { headers: { Authorization: `Token ${token}` } }
      );
      onAddToWishlist(item);
      setIsWishlisted(true);

      // Trigger notification
      toast.success(`${productName} added to wishlist!`);
    } catch (error) {
      console.error(error); // Log the error to the console
      toast.error("Failed to add item to cart.");
    }    
  };

  const handleWishlistPageRedirect = () => {
    navigate("/wishlist"); // Redirect to wishlist page
  };

  return (
    <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-4">
      {/* Wishlist & Swap Buttons */}
      <div className="absolute top-3 right-3 flex space-x-2">
        <button
          className={`p-1 ${isWishlisted ? "text-red-500" : "text-gray-300"} bg-gray-800 rounded-full hover:text-red-400`}
          onClick={handleAddToWishlist} // Add to wishlist
        >
          <Heart size={18} />
        </button>
        <button
          className="p-1 text-gray-300 bg-gray-800 rounded-full hover:text-gray-400"
          onClick={handleWishlistPageRedirect} // Redirect to wishlist page
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
        className={`mt-4 w-full ${isAdded ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-black hover:bg-gray-300"} text-sm py-2 rounded-full`}
        onClick={(e) => handleAddToCart(e, { id, productName, price, imageSrc, quantity: 1 })} // Pass the correct item
        disabled={isAdded} // Disable button if already added
      >
        <ShoppingCart size={16} className="mr-1 inline" />
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
