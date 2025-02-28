import React, { useState } from "react";

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Running Shoes",
      description: "Comfortable and durable running shoes.",
      size: 42,
      quantity: 1,
      price: 99.99,
      image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/f425c0cf563c4c01a6bc0ffadb51a169_9366/Ultrarun_5_W_Running_Shoes_Black_IH2636_01_standard.jpg", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Basketball Shoes",
      description: "High-performance basketball shoes.",
      size: 44,
      quantity: 1,
      price: 149.99,
      image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1000,h_1000/global/310836/01/sv01/fnd/PHL/fmt/png/MB.04-Iridescent-Basketball-Shoes", // Replace with actual image URL
    },
  ]);

  const handleRemove = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, increment: boolean) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + (increment ? 1 : -1)),
            }
          : item
      )
    );
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <h1 className="text-4xl font-bold py-20 text-indigo-400">Your Shopping Cart</h1>
      <div className="w-11/12 max-w-5xl bg-gray-800 rounded-2xl shadow-2xl p-6">
        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-700 rounded-xl p-4 mb-4 hover:shadow-lg transition-all"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                {/* Product Details */}
                <div className="flex-1 mx-4">
                  <h2 className="text-lg font-bold text-indigo-300">{item.name}</h2>
                  <p className="text-sm text-gray-400">{item.description}</p>
                  <p className="text-sm text-gray-400">Size: {item.size}</p>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleQuantityChange(item.id, false)}
                    className="px-3 py-2 bg-gray-600 rounded hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, true)}
                    className="px-3 py-2 bg-gray-600 rounded hover:bg-gray-700"
                  >
                    +
                  </button>
                </div>
                {/* Price and Total */}
                <div className="flex flex-col items-end mx-8">
                  <p className="text-lg font-bold text-indigo-400">
                    ${item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-600 text-xl font-bold"
                >
                  ×
                </button>
              </div>
            ))}
            {/* Checkout Section */}
            <div className="flex justify-between items-center border-t border-gray-600 pt-4 mt-4">
              <h3 className="text-2xl font-semibold">Total:</h3>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold text-indigo-400">${total.toFixed(2)}</span>
                <button className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold text-indigo-400">Your cart is empty!</h2>
            <p className="text-sm text-gray-400">Browse items and add them to your cart.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
