import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("token");
      const orderId = location.state?.orderId;

      if (!token) {
        setError("Unauthorized: Please log in.");
        setLoading(false);
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      if (!orderId) {
        setError("No order found. Redirecting...");
        setLoading(false);
        setTimeout(() => navigate("/cart"), 2000);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/orders/${orderId}/`,
          { headers: { Authorization: `Token ${token}` } }
        );

        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Fetch Order Error:", error.response?.data);
          setError(error.response?.data?.detail || "Failed to load order details.");
        } else {
          console.error("Unexpected Error:", error);
          setError("An unexpected error occurred.");
        }
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.state?.orderId, navigate]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-indigo-400 mb-6">Order Complete</h1>
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Order Summary</h2>
        {order && order.items.length > 0 ? (
          <div className="space-y-4">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
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
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg shadow-md"
      >
        Return to Home
      </button>
    </div>
  );
};

export default CheckoutPage;