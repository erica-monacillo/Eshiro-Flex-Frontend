import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../common/Navbar";
import HeroSection from "../ui/HeroSection";
import Categories from "../ui/categories";
import WhatsNew from "./WhatsNew";
import ProductCard from "../ui/ProductCard";
import Footer from "../common/Footer";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import CategoryPage from "../ui/CategoryPage";
import StabilityPage from "../categories/Stability";
import MotionControlPage from "../categories/MotionControl";
import NaturalPage from "../categories/Natural";
import NeutralPage from "../categories/Neutral";
import CartPage from "./CartPage";
import UserProfile from "./UserProfile";
import CheckoutPage from "./CheckoutPage";
import Wishlist from "./Wishlist";
import { fetchProducts } from "../../api/apiService"; // Import API call function

export interface CartItem {
  id: number;
  productName: string;
  price: string;
  imageSrc: string;
  quantity: number;
}

export interface Product {
  id: number;
  productName: string;
  price: string;
  imageSrc: string;
}

const AestheticShop: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from backend
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(); // Fetch data from API
        setProducts(data); // Update state with fetched products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const handleAddToWishlist = (item: Product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.find((wishlistItem) => wishlistItem.id === item.id)) {
        return [...prevItems, item]; 
      }
      return prevItems;
    });
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-700 text-gray-100 min-h-screen flex flex-col">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
      />

      {/* Navbar */}
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Categories />
                <WhatsNew />
                {loading ? (
                  <p className="text-center text-gray-300">Loading products...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        imageSrc={product.imageSrc}
                        productName={product.productName}
                        price={product.price}
                        onAddToCart={handleAddToCart}
                        onAddToWishlist={handleAddToWishlist}
                      />
                    ))}
                  </div>
                )}
              </>
            }
          />
          {/* Other Routes */}
          <Route path="/shop" element={<AestheticShop />} />
          <Route path="/category/stability" element={<StabilityPage />} />
          <Route path="/category/neutral" element={<NeutralPage />} />
          <Route path="/category/natural" element={<NaturalPage />} />
          <Route path="/category/motioncontrol" element={<MotionControlPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/wishlist"
            element={<Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="*"
            element={<div className="text-center text-gray-200 py-20">Page Not Found</div>}
          />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AestheticShop;
