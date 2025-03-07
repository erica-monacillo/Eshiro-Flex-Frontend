import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartItem } from "./cartTypes";

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

  // Handle selection
  const handleSelectItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
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
      alert("No items selected for checkout.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/",
        { cart_ids: selectedItems },
        { headers: { Authorization: `Token ${token}` } } // ✅ Ensure token is sent
      );

      if (response.data && response.data.id) {
        navigate("/checkout", { state: { orderId: response.data.id } });
      } else {
        alert("Failed to create order.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Checkout Error:", error.response?.data);
        setError(error.response?.data?.detail || "Failed to create order.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
};



  // Calculate total price of selected items
  const total = selectedItems.reduce((acc, id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? acc + (parseFloat(item.price) * item.quantity) : acc;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center text-white px-6">
      <h1 className="text-4xl font-bold mt-16 mb-10 text-gray-200">🛒 Your Shopping Cart</h1>
  
      {loading ? (
        <p className="text-gray-400 text-lg">Loading cart...</p>
      ) : error ? (
        <p className="text-red-400 text-lg">{error}</p>
      ) : (
        <div className="w-full max-w-[100rem] flex gap-12">
          
          {/* 🛍️ Extra-Wide Cart Items */}
          <div className="w-4/5 bg-gray-800 rounded-lg shadow-lg p-10">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-[auto_7rem_1fr_auto_auto_auto] items-center border-b border-gray-700 py-6 gap-x-6"
                >
                  {/* ✅ Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-6 h-6 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                  />
  
                  {/* 🖼 Product Image */}
                  <img
                    src={item.image_Url.startsWith("http") ? item.image_Url : "/fallback-image.png"}
                    alt={item.productName}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
  
                  {/* 🏷 Product Name */}
                  <h2 className="text-xl font-semibold text-gray-200">{item.productName}</h2>
  
                  {/* 🔢 Quantity Selector (Centered) */}
                  <div className="flex items-center justify-center space-x-4">
                    <button 
                      onClick={() => handleQuantityChange(item.id, false)} 
                      className="w-12 h-12 flex items-center justify-center bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-2xl"
                    >
                      −
                    </button>
                    <span className="text-2xl font-semibold text-gray-200 w-12 text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, true)} 
                      className="w-12 h-12 flex items-center justify-center bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition text-2xl"
                    >
                      +
                    </button>
                  </div>
  
                  {/* 💰 Price */}
                  <p className="text-gray-200 font-semibold text-xl w-24 text-center">
                    ₱{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                  
                  {/* ❌ Remove Button */}
                  <button onClick={() => handleRemove(item.id)} className="text-red-400 hover:text-red-500 text-3xl">
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-xl text-center">Your cart is empty.</p>
            )}
          </div>
  
          {/* 📦 Order Summary */}
          <div className="w-1/5 bg-gray-800 rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-200 mb-6">Order Summary</h3>
            <p className="text-gray-400 text-lg">Subtotal</p>
            <p className="text-gray-200 font-semibold text-2xl">₱{total.toFixed(2)}</p>
            <button 
              onClick={handleCheckout} 
              className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  
   
};

export default CartPage;
