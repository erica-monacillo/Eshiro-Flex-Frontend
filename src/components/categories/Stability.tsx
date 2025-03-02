import React, { useState, useEffect } from "react";
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

const sampleProducts: Product[] = [
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReuSvOLob97ScxEzy_IhEvIw0KlFC1PGdFOw&s", name: "Poly", price: "₱89.99" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-OVWKNExDQBV5Qq9JTeJdrB1XUKaMrjXoHg&s", name: "Product 2", price: "₱79.99" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0u7OxzqjYZbbOkQ87nLWlq-BVPHMWy_Xptw&s", name: "Product 3", price: "₱69.99" },
  { image: "https://via.placeholder.com/150", name: "Product 4", price: "₱59.99" },
  { image: "https://via.placeholder.com/150", name: "Product 5", price: "₱49.99" },
  { image: "https://via.placeholder.com/150", name: "Product 6", price: "₱39.99" },
  { image: "https://via.placeholder.com/150", name: "Product 7", price: "₱29.99" },
  { image: "https://via.placeholder.com/150", name: "Product 8", price: "₱19.99" },
  { image: "https://via.placeholder.com/150", name: "Product 9", price: "₱9.99" },
  { image: "https://via.placeholder.com/150", name: "Product 10", price: "₱5.99" },
];

const StabilityPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); 
  const [wishlistItems, setWishlistItems] = useState<CartItem[]>([]);
  const [addedStatus, setAddedStatus] = useState<Record<string, boolean>>({});
  const [wishlistStatus, setWishlistStatus] = useState<Record<string, boolean>>({}); 
  const navigate = useNavigate();

  // Load cart and wishlist items from localStorage on component mount
  useEffect(() => {
    // Load cart items
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      setCartItems(parsedCartItems);
      
      // Create status map for cart items
      const cartStatusMap: Record<string, boolean> = {};
      parsedCartItems.forEach((item: CartItem) => {
        cartStatusMap[item.productName] = true;
      });
      setAddedStatus(cartStatusMap);
    }
    
    // Load wishlist items
    const savedWishlistItems = localStorage.getItem('wishlistItems');
    if (savedWishlistItems) {
      const parsedWishlistItems = JSON.parse(savedWishlistItems);
      setWishlistItems(parsedWishlistItems);
      
      // Create status map for wishlist items
      const wishlistStatusMap: Record<string, boolean> = {};
      parsedWishlistItems.forEach((item: CartItem) => {
        wishlistStatusMap[item.productName] = true;
      });
      setWishlistStatus(wishlistStatusMap);
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    // Retrieve existing cart items from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
    // Check if product already exists in the cart
    const existingItem = storedCart.find((item: CartItem) => item.id === product.name);
  
    if (existingItem) {
      // If the item is already in the cart, update its quantity
      existingItem.quantity += 1;
    } else {
      // If the item is new, add it to the cart
      const newItem: CartItem = {
        id: product.name,
        productName: product.name,
        price: product.price,
        imageSrc: product.image,
        quantity: 1,
      };
      
      const updatedCartItems = [...cartItems, item];
      setCartItems(updatedCartItems);
      
      // Update localStorage with new cart items
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      
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
      
      const updatedWishlistItems = [...wishlistItems, item];
      setWishlistItems(updatedWishlistItems);
      
      // Update localStorage with new wishlist items
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlistItems));
      
      setWishlistStatus((prevStatus) => ({
        ...prevStatus,
        [product.name]: true,
      }));
  
      toast.success(`${product.name} added to wishlist!`);
    }
  };
  

  const handleWishlistPageRedirect = () => {
    navigate("/wishlist");
  };
  
  const handleCartPageRedirect = () => {
    navigate("/cart");
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-700 min-h-screen py-6">
      <div className="container mx-auto px-6">
        {/* Navigation buttons for cart and wishlist */}
        <div className="flex justify-end mb-4 space-x-4">
          <button 
            onClick={handleCartPageRedirect}
            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <ShoppingCart size={18} className="mr-2" />
            Cart ({cartItems.length})
          </button>
          <button 
            onClick={handleWishlistPageRedirect}
            className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <Heart size={18} className="mr-2" />
            Wishlist ({wishlistItems.length})
          </button>
        </div>
        
        {/* Wide Image */}
        <div className="mb-8">
          <img
            src="https://cdn.runrepeat.com/storage/gallery/buying_guide_primary/25/best-stability-running-shoes-001-22321862-960.jpg"
            alt=""
            className="w-full xl:w-screen h-64 object-cover rounded-xl shadow-lg"
            style={{ objectPosition: "40% 30%" }}
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-6">Stability</h1>

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
                  onClick={() => handleAddToWishlist(product)}
                >
                  <Heart size={18} />
                </button>
                <button
                  className="p-1 text-gray-300 bg-gray-800 rounded-full hover:text-gray-400"
                  onClick={handleWishlistPageRedirect}
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

export default StabilityPage;