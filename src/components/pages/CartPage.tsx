import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests

interface CartItem {
  id: number;
  productName: string;
  price: string;
  image_Url: string;
  quantity: number;
}

interface CartPageProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart items from backend on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized: No token found.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/cart/", {
          headers: { Authorization: `Token ${token}` },
        });
    
        console.log("Cart API Response:", response.data);
    
        const formattedCartItems = response.data.map((item: { 
          id: number; 
          product_name: string; 
          product_price: string; 
          product_image: string; 
          quantity: number; 
        }) => ({
          id: item.id,
          productName: item.product_name,  
          price: parseFloat(item.product_price) || 0,  
          image_Url: item.product_image || "/fallback-image.png",
          quantity: item.quantity,
        }));                
    
        setCartItems(formattedCartItems);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };      

    fetchCart();
  }, [setCartItems]);

  // Handle quantity change
  const handleQuantityChange = async (id: number, increment: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: No Token Found.");
      return;
    }

    try {
      const updatedQuantity = cartItems.find((item) => item.id === id)?.quantity || 1;
      const newQuantity = Math.max(1, updatedQuantity + (increment ? 1 : -1));

      await axios.put(
        `http://127.0.0.1:8000/api/cart/${id}/`,
        { quantity: newQuantity },
        { headers: { Authorization: `Token ${token}` } }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle remove from cart
  const handleRemove = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: No Token Found.");
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/cart/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      setSelectedItems((prevSelected) => prevSelected.filter((itemId) => itemId !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }

    const itemsToCheckout = cartItems.filter((item) => selectedItems.includes(item.id));
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Unauthorized: No Token Found.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/checkout/",
        { items: itemsToCheckout },
        { headers: { Authorization: `Token ${token}` } }
      );

      setCartItems([]);
      setSelectedItems([]);
      navigate("/checkout", { state: { itemsToCheckout } });
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  // Calculate total
  const total = selectedItems.reduce((acc, id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? acc + (Number(item.price) * item.quantity) : acc;
  }, 0);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center text-white">
      <h1 className="text-3xl font-semibold mt-20 mb-8 text-gray-200">Shopping Cart</h1>

      {loading ? (
        <p className="text-gray-400">Loading cart...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="w-full max-w-6xl mx-5 mt-0 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 bg-gray-800 rounded-lg shadow-md p-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                console.log("Cart Item:", item);
                console.log("Image URL:", item.image_Url);
                
              return (
                <div key={item.id} className="flex items-center justify-between border-b border-gray-700 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() =>
                      setSelectedItems((prevSelected) =>
                        prevSelected.includes(item.id)
                          ? prevSelected.filter((itemId) => itemId !== item.id)
                          : [...prevSelected, item.id]
                      )
                    }
                    className="mr-4 w-5 h-5 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                  />
                  <img
                    src={item.image_Url && item.image_Url.startsWith("http") ? item.image_Url : "/fallback-image.png"} // ✅ Removed the semicolon
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded-md"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.failed) {  // ✅ Prevent infinite loop
                        console.warn("Image failed to load:", e.currentTarget.src);
                        e.currentTarget.dataset.failed = "true"; // ✅ Mark as failed
                        e.currentTarget.src = "/fallback-image.png";  
                      }
                    }}
                  />
                  <div className="flex-1 px-4">
                    <h2 className="text-lg font-medium text-gray-200">{item.productName}</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, false)}
                      className="px-3 py-1 text-gray-300 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      -
                    </button>
                    <span className="text-gray-200">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, true)}
                      className="px-3 py-1 text-gray-300 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-gray-200 font-medium">₱{(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  <button onClick={() => handleRemove(item.id)} className="text-red-400 hover:text-red-500">
                    ×
                  </button>
                </div>
              );
            })
            ) : (
              <p className="text-gray-400">Your cart is empty.</p>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-200">Summary</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-400">Subtotal</p>
                <p className="text-gray-200 font-medium">₱{total.toFixed(2)}</p>
              </div>
              <button onClick={handleCheckout} className="w-full py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition">
                Check Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
