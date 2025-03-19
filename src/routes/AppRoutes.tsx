import React from "react";
import { Route, Routes } from "react-router-dom";
import AestheticShop from "../components/pages/AestheticShop";
import ProductDetails from "../components/pages/ProductDetails";
import CartPage from "../components/pages/CartPage";
import Wishlists from "../components/pages/Wishlists";
import LoginPage from "../components/pages/LoginPage";
import ProductPage from "../components/pages/ProductPage";
import SignUpPage from "../components/pages/SignUpPage";
import UserProfile from "../components/pages/UserProfile";
import WhatsNew from "../components/pages/WhatsNew";
import CheckoutPage from "../components/pages/CheckoutPage";
import type { CartItem } from "../hooks/cartTypes";
import type { WishlistItem } from "../hooks/wishlistTypes";

interface AppRoutesProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  wishlistItems: WishlistItem[];
  setWishlistItems: React.Dispatch<React.SetStateAction<WishlistItem[]>>;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ 
  cartItems, 
  setCartItems, 
  wishlistItems, 
  setWishlistItems 
}) => {
  return (
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
  );
};

export default AppRoutes;

export const shouldHideNavbar = (pathname: string): boolean => {
  return pathname === "/login" || pathname === "/signup";
};