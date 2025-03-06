import React, { useEffect, useState } from "react";
import axios from "axios";

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

interface WishlistItem {
  id: number;
  user: number;
  product: number;
  product_name: string;
  product_price: string;
  added_at: string;
  product_image?: string;
}

interface WishlistProps {
  wishlistItems: Product[];
  setWishlistItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlistItems, setWishlistItems }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch Wishlist from Backend API with Auth Token
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
    
        console.log("Wishlist API Response:", response.data);
    
        // Convert backend data to match Product structure
        const formattedWishlist: Product[] = response.data.map((item: WishlistItem) => ({
          id: item.id,
          name: item.product_name,
          price: item.product_price,
          image_url: item.product_image || "/fallback-image.png", // Ensure correct mapping
          category: "Unknown",
          description: "No description available",
          stock: 0,
          product_size: "N/A",
          created_at: item.added_at,
        }));
    
        setWishlistItems(formattedWishlist);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError("Failed to load wishlist.");
        setLoading(false);
      }
    };
    
    fetchWishlist();
  }, [setWishlistItems]);

  // ✅ Remove Item from Wishlist with Authorization Token
  const removeFromWishlist = async (id: number) => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        setError("Unauthorized: No token found.");
        return;
      }
  
      // ✅ Use backticks for string interpolation
      await axios.delete(`http://127.0.0.1:8000/api/wishlist/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
  
      // ✅ Update state properly (remove only the selected item)
      setWishlistItems((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
  
      console.log(`Item ${id} removed successfully.`);
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item from wishlist.");
    }
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
              <div className="wishlist-items space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center space-x-4">
                    <img 
                      src={item.image_url || "/fallback-image.png"} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md" 
                      onError={(e) => (e.currentTarget.src = "/fallback-image.png")} 
                    />
                      <div className="text-gray-300">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-sm">{item.price}</p>
                      </div>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
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
