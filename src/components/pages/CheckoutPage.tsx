import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Define types for order and items
interface OrderItem {
  id: number;
  product_name: string;
  quantity: number;
  product_price: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total_price: number;
}

const CheckoutPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null); // State for selected product

  // Fetch order details when navigating to this page
  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderId = location.state?.orderId;
      if (!orderId) {
        setError("Invalid order. Returning to cart.");
        setTimeout(() => navigate("/cart"), 2000);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: No token found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders/${orderId}/`,
          { headers: { Authorization: `Token ${token}` } }
        );

        setOrder(response.data);
        // Set the first product as the default selected product
        if (response.data.items.length > 0) {
          setSelectedProduct(response.data.items[0].product_name);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.detail || "Failed to load order.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.state, navigate]);

  // Handle checkout process
  const handleCheckout = async () => {
    const cartId = localStorage.getItem("cartId");
    const userId = localStorage.getItem("userId");

    if (!cartId || !selectedProduct) {
      alert("No cart or product selected. Please add items to the cart.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: No token found.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders/",
        { cart_id: cartId, user: userId, product: selectedProduct },
        { headers: { Authorization: `Token ${token}` } }
      );

      const { user_id, order_id } = response.data;
      console.log("User ID:", user_id);
      console.log("Order ID:", order_id);

      alert("Order placed successfully!");
      navigate("/checkout", { state: { orderId: response.data.id } });
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-indigo-400 mb-6">Checkout</h1>
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Order Summary</h2>
        {order && order.items.length > 0 ? (
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className={`flex justify-between items-center bg-gray-700 p-4 rounded-lg ${
                  selectedProduct === item.product_name ? "border border-indigo-500" : ""
                }`}
                onClick={() => setSelectedProduct(item.product_name)}
              >
                <div>
                  <p className="font-semibold text-indigo-200">{item.product_name}</p>
                  <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-semibold">₱{(item.product_price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No order details available.</p>
        )}
        <div className="flex justify-between mt-4 pt-4 border-t border-gray-600">
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-lg font-bold text-indigo-400">₱{order?.total_price?.toFixed(2)}</p>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg shadow-md"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
