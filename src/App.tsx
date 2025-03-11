import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import AestheticShop from "./components/pages/AestheticShop";
import ProductDetails from "./components/pages/ProductDetails";
import CartPage from "./components/pages/CartPage";
import Wishlists from "./components/pages/Wishlists";
import LoginPage from "./components/pages/LoginPage";
import ProductPage from "./components/pages/ProductPage";
import SignUpPage from "./components/pages/SignUpPage";
import UserProfile from "./components/pages/UserProfile";
import WhatsNew from "./components/pages/WhatsNew";
import CheckoutPage from "./components/pages/CheckoutPage";
import "./index.css";

import type { CartItem } from "./components/pages/cartTypes";
import type { WishlistItem } from "./components/pages/wishlistTypes";

const AppContent: React.FC = () => {
  const location = useLocation(); // Get the current route
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup"; // Hide navbar for login/signup

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  return (
    <>
      <Header isVisible={true} />
      {!hideNavbar && <Navbar />} 
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<AestheticShop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/wishlist" element={<Wishlists wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/whats-new" element={<WhatsNew />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
