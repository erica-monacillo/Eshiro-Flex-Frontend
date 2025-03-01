import React, { useState } from "react";
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
      return prevItems; // Avoid duplicates
    });
  };

  const products = Array(25)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      productName: `Product ${index + 1}`,
      price: `₱${(index + 1) * 10}`,
      imageSrc:
        "https://media.assettype.com/evoindia%2Fimport%2F2018%2F07%2FSuzuki-Jimny-2.jpg",
    }));

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-700 text-gray-100 min-h-screen flex flex-col">
      {/* Global ToastContainer */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      imageSrc={product.imageSrc}
                      productName={product.productName}
                      price={product.price}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist} // Pass onAddToWishlist here
                    />
                  ))}
                </div>
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
          <Route
            path="/cart"
            element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />}
          />
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
