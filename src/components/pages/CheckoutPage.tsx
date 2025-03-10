import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export interface CartItem {
  id: number;
  name?: string;
  productName: string;
  price: string;
  image_Url: string;
  size?: string;
  quantity: number;
  isSelected?: boolean;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = location.state || {}; // Get the orderId passed from CartPage
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  useEffect(() => {
    console.log("Order ID received:", orderId); // Debugging log

    if (!orderId) {
      setError("Invalid order ID. Please try again.");
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: Missing authentication token.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/order-items/${orderId}/`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setOrderItems(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching order details:", error.response?.data || error.message);
          setError(error.response?.data?.message || "Failed to fetch order details.");
        } else {
          console.error("Unexpected error:", error);
          setError("An unexpected error occurred.");
        }
      }      
    };

    fetchOrderDetails();
  }, [orderId]);

  // Handle payment method change
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  // Handle placing the order
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("user_id");
      const cartId = localStorage.getItem("cart_id");

      if (!token || !userId || !cartId || !paymentMethod) {
        alert("Please select a payment method and ensure all details are provided.");
        return;
      }

      const response = await axios.post(
        `http://127.0.0.1:8000/api/orders/${orderId}/place/`,
        {
          user_id: userId,
          cart_id: cartId,
          payment_method: paymentMethod,
        },
        { headers: { Authorization: `Token ${token}` } }
      );

      console.log("Order Placed:", response.data);
      alert("Your order has been placed successfully!");
      navigate("/order-summary", { state: { orderId: response.data.id } });
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Failed to place order. Please try again.");
    }
  };

  const total = orderItems.reduce((acc, item) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center text-white px-6">
      <h1 className="text-4xl font-bold mt-16 mb-10 text-gray-200">🛒 Checkout</h1>

      {loading ? (
        <p className="text-gray-400 text-lg">Loading order details...</p>
      ) : error ? (
        <p className="text-red-400 text-lg">{error}</p>
      ) : (
        <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-10">
          <h2 className="text-2xl font-semibold text-gray-200 mb-6">Review Your Order</h2>

          {/* Order Items */}
          <div className="space-y-4 mb-6">
            {orderItems.length > 0 ? (
              orderItems.map((item) => (
                <div key={item.id} className="flex justify-between border-b border-gray-700 py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image_Url || "/fallback-image.png"}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-gray-200">{item.productName}</h3>
                      <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-gray-200">
                    ₱{(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No items in your order.</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-200 mb-3">Choose Payment Method</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethod === "credit_card"}
                  onChange={() => handlePaymentMethodChange("credit_card")}
                  className="w-6 h-6 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                />
                <span className="text-lg text-gray-200">Credit Card</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => handlePaymentMethodChange("paypal")}
                  className="w-6 h-6 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                />
                <span className="text-lg text-gray-200">PayPal</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={() => handlePaymentMethodChange("bank_transfer")}
                  className="w-6 h-6 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                />
                <span className="text-lg text-gray-200">Bank Transfer</span>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="flex justify-between mb-6">
            <p className="text-lg text-gray-400">Subtotal</p>
            <p className="text-xl font-semibold text-gray-200">₱{total.toFixed(2)}</p>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-indigo-600 py-3 text-lg font-semibold text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
