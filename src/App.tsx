import React, { useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AppRoutes, { shouldHideNavbar } from "./routes/AppRoutes";
import "./index.css";

import type { CartItem } from "./hooks/cartTypes";
import type { WishlistItem } from "./hooks/wishlistTypes";

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNavbar = shouldHideNavbar(location.pathname);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  return (
    <>
      <Header isVisible={true} />
      {!hideNavbar && <Navbar />} 
      <main className="min-h-screen">
        <AppRoutes 
          cartItems={cartItems} 
          setCartItems={setCartItems} 
          wishlistItems={wishlistItems} 
          setWishlistItems={setWishlistItems} 
        />
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