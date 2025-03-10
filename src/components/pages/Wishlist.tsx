import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
  description: string;
}

interface WishlistItem {
  id: number;
  product_name: string;
  product_price: string;
  product_image?: string;
  store_name?: string;
}

interface WishlistProps {
  wishlistItems: WishlistItem[];
  setWishlistItems: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlistItems, setWishlistItems }) => {
  const [, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch wishlist items
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found.");
          setLoading(false);
          return;
        }

        const response = await axios.get<WishlistItem[]>("http://127.0.0.1:8000/api/wishlist/", {
          headers: { Authorization: `Token ${token}` },
        });

        setWishlistItems(response.data);
        setLoading(false);
      } catch {
        setError("Failed to load wishlist.");
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [setWishlistItems]);

  const handleProductClick = (item: WishlistItem) => {
    setSelectedProduct({
      id: item.id,
      name: item.product_name,
      price: item.product_price,
      image_url: item.product_image || "/fallback-image.png",
      description: "", // You can replace this with actual description
    });
  };

  const addToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized: No token found.");
        return;
      }

      await axios.post(
        "http://127.0.0.1:8000/api/cart/add/",
        { product: product.id },
        { headers: { Authorization: `Token ${token}` } }
      );

      setSelectedProduct(null); // Close the product details modal after adding to cart
    } catch {
      setError("Failed to add item to cart.");
    }
  };

  const removeFromWishlist = (id: number) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Update Local Storage
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center p-8">
      <div className="w-full max-w-4xl bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-100 mb-6">Your Wishlist</h2>
  
        {loading ? (
          <p className="text-center text-gray-300">Loading wishlist...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {wishlistItems.length > 0 ? (
              <div className="wishlist-items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-gray-800 rounded-lg p-4 shadow-lg relative">
                    <button 
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1" 
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      X
                    </button>
                    <img
                      src={item.product_image || "/fallback-image.png"}
                      alt={item.product_name}
                      className="w-full h-40 object-cover rounded-md cursor-pointer"
                      onClick={() => handleProductClick(item)}
                    />
                    <div className="text-gray-300 mt-4 text-center">
                      <h3 className="text-lg font-medium">{item.product_name}</h3>
                      <p className="text-sm font-semibold text-gray-400">{item.store_name}</p>
                      <p className="text-lg font-bold text-white">{item.product_price}</p>
                    </div>
                    <button 
                      className="w-full mt-4 bg-white text-black font-semibold py-2 rounded-lg flex items-center justify-center gap-2"
                      onClick={() => 
                        addToCart({
                          id: item.id,
                          name: item.product_name, // Map product_name to name
                          price: item.product_price, // Map product_price to price
                          image_url: item.product_image || "/fallback-image.png", // Ensure an image URL is provided
                          description: "" // Provide an empty description if it's missing
                        })
                      }
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 mt-6">No items in your wishlist yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Wishlist;
