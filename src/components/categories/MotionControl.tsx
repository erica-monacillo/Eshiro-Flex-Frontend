import React, { useState} from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Define the Product and CartItem interfaces
interface Product {
  image: string;
  name: string;
  price: string;
}

interface CartItem {
  id: string;
  productName: string;
  price: string;
  imageSrc: string;
  quantity: number;
}

const sampleProducts = [
  { image: "https://th.bing.com/th/id/OIP.Ekya6H0hkX9qkfLRwua6cAAAAA?rs=1&pid=ImgDetMain", name: "Product 1", price: "₱99.99" },
  { image: "https://via.placeholder.com/150", name: "Product 2", price: "₱89.99" },
  { image: "https://via.placeholder.com/150", name: "Product 3", price: "₱79.99" },
  { image: "https://via.placeholder.com/150", name: "Product 4", price: "₱69.99" },
  { image: "https://via.placeholder.com/150", name: "Product 5", price: "₱59.99" },
  { image: "https://via.placeholder.com/150", name: "Product 6", price: "₱49.99" },
];

const MotionControlPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); // Define type for cartItems
  const [wishlistItems, setWishlistItems] = useState<CartItem[]>([]); // Define type for wishlistItems
  const [addedStatus, setAddedStatus] = useState<Record<string, boolean>>({}); // Track each product's added status to cart
  const [wishlistStatus, setWishlistStatus] = useState<Record<string, boolean>>({}); // Track each product's wishlist status
  const navigate = useNavigate(); // Use `useNavigate` in React Router v6

  const handleAddToCart = (product: Product) => {
    if (!addedStatus[product.name]) {
      const item: CartItem = {
        id: product.name,
        productName: product.name,
        price: product.price,
        imageSrc: product.image,
        quantity: 1,
      };
      setCartItems([...cartItems, item]);
      setAddedStatus((prevStatus) => ({
        ...prevStatus,
        [product.name]: true,
      }));

      // Trigger success toast notification
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleAddToWishlist = (product: Product) => {
    if (!wishlistStatus[product.name]) {
      const item: CartItem = {
        id: product.name,
        productName: product.name,
        price: product.price,
        imageSrc: product.image,
        quantity: 1,
      };
      setWishlistItems([...wishlistItems, item]);
      setWishlistStatus((prevStatus) => ({
        ...prevStatus,
        [product.name]: true,
      }));

      // Trigger success toast notification
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleWishlistPageRedirect = () => {
    navigate("/wishlist"); // Redirect to wishlist page
  };

   return (
      <div className="bg-gradient-to-r from-black via-gray-900 to-gray-700 min-h-screen py-6">
        <div className="container mx-auto px-6">
          {/* Wide Image */}
          <div className="mb-8">
            <img
              src="https://th.bing.com/th/id/OIP.Ekya6H0hkX9qkfLRwua6cAAAAA?rs=1&pid=ImgDetMain"
              alt=""
              className="w-full xl:w-screen h-64 object-cover rounded-xl shadow-lg"
              style={{ objectPosition: "40% 30%" }}
            />
          </div>
  
          {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-6">Motion Control</h1>
  
          {/* Product Grid - 5 Cards Per Row, 2 Rows */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sampleProducts.map((product, index) => (
              <div
                key={index}
                className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 p-4"
              >
                {/* Wishlist & Options Buttons */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    className={`p-1 ${wishlistStatus[product.name] ? "text-red-500" : "text-gray-300"} bg-gray-800 rounded-full hover:text-red-400`}
                    onClick={() => handleAddToWishlist(product)} // Add to wishlist
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
                  src={product.image}
                  alt={product.name}
                  className="w-full h-50 object-cover rounded-xl mb-3"
                />
  
                {/* Product Details */}
                <div>
                  <h2 className="font-semibold text-white truncate">{product.name}</h2>
                  <p className="text-sm text-gray-400">My Store</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-bold text-white">{product.price}</p>
                    <p className="text-xs line-through text-gray-500">₱80.00</p>
                  </div>
                </div>
  
                {/* Add to Cart Button */}
                <button
                  className={`mt-4 w-full ${
                    addedStatus[product.name]
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-300"
                  } text-sm py-2 rounded-full`}
                  onClick={() => handleAddToCart(product)}
                  disabled={addedStatus[product.name]}
                >
                  <ShoppingCart size={16} className="mr-1 inline" />
                  {addedStatus[product.name] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default MotionControlPage;
