import React, { useState, useEffect, useMemo } from "react";
import { CartItem } from "./cartTypes";

const CheckoutPage: React.FC = () => {
  const [cart] = useState<CartItem[]>([
    { id: 1, productName: "Product A", size: "M", quantity: 1, price: 20, imageSrc: "imageA.jpg" },
    { id: 2, productName: "Product B", size: "L", quantity: 2, price: 15, imageSrc: "imageB.jpg" },
  ]);

  const existingUserProfile = useMemo(
    () => ({
      name: "John Doe",
      phone: "1234567890",
      address: "123 Main St",
      city: "Metropolis",
      country: "Countryland",
      zipCode: "12345",
    }),
    [] // Dependency array ensures this object is memoized
  );

  const [userProfile, setUserProfile] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [isShippingIncomplete, setIsShippingIncomplete] = useState(true);
  const shippingFee = 10; // Fixed shipping fee

  const cartTotal = cart.reduce((total, item) => total + item.price * (item.quantity ?? 0), 0);

  useEffect(() => {
    // Auto-fill user profile if data exists
    setUserProfile(existingUserProfile);
  }, [existingUserProfile]);

  useEffect(() => {
    // Check if shipping details are incomplete
    setIsShippingIncomplete(Object.values(userProfile).some((value) => value.trim() === ""));
  }, [userProfile]);

  const handleSaveShippingDetails = (newDetails: Partial<typeof userProfile>) => {
    setUserProfile({ ...userProfile, ...newDetails });
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
    );
  };

  const handlePlaceOrder = () => {
    if (isShippingIncomplete) {
      alert("Please complete all shipping details before placing the order.");
    } else {
      alert(`Order placed with payment methods: ${paymentMethods.join(", ")}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-indigo-400 mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
            >
              <div>
                <p className="font-semibold text-indigo-200">{item.productName}</p>
                <p className="text-sm text-gray-400">Size: {item.size}</p>
                <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
              </div>
              <p className="text-lg font-semibold">
                ${(item.price * (item.quantity ?? 0)).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t border-gray-600">
          <p className="text-lg font-semibold">Subtotal:</p>
          <p className="text-lg font-bold text-indigo-400">${cartTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-lg font-semibold">Shipping Fee:</p>
          <p className="text-lg font-bold text-indigo-400">${shippingFee.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t border-gray-600">
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-lg font-bold text-indigo-400">${(cartTotal + shippingFee).toFixed(2)}</p>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Shipping Details</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newDetails = Object.fromEntries(formData.entries());
            handleSaveShippingDetails(newDetails as Partial<typeof userProfile>);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {Object.keys(userProfile).map((field) => (
            <input
              key={field}
              name={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={userProfile[field as keyof typeof userProfile]}
              onChange={(e) =>
                setUserProfile({ ...userProfile, [field]: e.target.value })
              }
              className="p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-indigo-400"
              required
            />
          ))}
          <button
            type="submit"
            className="col-span-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition"
          >
            Save Shipping Details
          </button>
        </form>
      </div>

      {/* Payment Method */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-indigo-300 mb-4">Payment Methods</h2>
        <form className="space-y-4">
          {["Credit Card", "PayPal", "Cash on Delivery"].map((method) => (
            <label key={method} className="flex items-center space-x-3">
              <input
                type="checkbox"
                value={method}
                checked={paymentMethods.includes(method)}
                onChange={() => handlePaymentMethodChange(method)}
                className="form-checkbox text-indigo-500"
              />
              <span>{method}</span>
            </label>
          ))}
        </form>
      </div>

      {/* Review and Confirm */}
      <button
        className="w-full max-w-4xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-lg transition"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
