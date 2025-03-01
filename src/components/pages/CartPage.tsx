import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./AestheticShop";

const CartPage: React.FC<{
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}> = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    if (itemsToCheckout.length === 0) {
      alert("Please select at least one item to checkout.");
      return;
    }
    navigate("/checkout", { state: { itemsToCheckout } });
  };

  const handleRemove = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    setSelectedItems((prevSelected) =>
      prevSelected.filter((itemId) => itemId !== id)
    );
  };

  const handleQuantityChange = (id: number, increment: boolean) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + (increment ? 1 : -1)) }
          : item
      )
    );
  };

  const handleSelectItem = (id: number) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const total = selectedItems.reduce((acc, id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? acc + (parseFloat(item.price) || 0) * item.quantity : acc;
  }, 0);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center text-white">
      <h1 className="text-3xl font-semibold mt-20 mb-8 text-gray-200">Shopping Cart</h1>
      <div className="w-full max-w-6xl mx-5 mt-0 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="col-span-2 bg-gray-800 rounded-lg shadow-md p-6">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-700 py-4"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  className="mr-4 w-5 h-5 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500"
                />
                <img
                  src={item.imageSrc}
                  alt={item.productName}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1 px-4">
                  <h2 className="text-lg font-medium text-gray-200">
                    {item.productName}
                  </h2>
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
                <p className="text-gray-200 font-medium">
                  ₱{(parseFloat(item.price) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <h2 className="text-lg font-medium text-gray-200">
                Your cart is empty
              </h2>
              <p className="text-sm text-gray-400 mt-2">
                Start adding items to your cart to view them here.
              </p>
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-200">Summary</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-400">Subtotal</p>
              <p className="text-gray-200 font-medium">₱{total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Shipping</p>
              <p className="text-gray-200 font-medium">₱50.00</p>
            </div>
            <div className="border-t border-gray-700 pt-4 flex justify-between">
              <p className="text-lg font-semibold text-gray-200">Total</p>
              <p className="text-lg font-bold text-gray-50">
                ₱{(total + 50).toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
