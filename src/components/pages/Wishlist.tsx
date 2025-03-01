import React from "react";

interface Product {
  id: number;
  productName: string;
  price: string;
  imageSrc: string;
}

interface WishlistProps {
  wishlistItems: Product[];
  setWishlistItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Wishlist: React.FC<WishlistProps> = ({ wishlistItems, setWishlistItems }) => {
  const removeFromWishlist = (id: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center p-8">
      {/* Container with Gradient */}
      <div className="w-full max-w-4xl bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-100 mb-6">Your Wishlist</h2>

        {wishlistItems.length > 0 ? (
          <div className="wishlist-items space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.imageSrc} alt={item.productName} className="w-16 h-16 object-cover rounded-md" />
                  <div className="text-gray-300">
                    <h3 className="text-lg font-medium">{item.productName}</h3>
                    <p className="text-sm">{item.price}</p>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 font-semibold"
                  onClick={() => removeFromWishlist(item.id)} // Remove from wishlist
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-6">No items in your wishlist yet.</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
