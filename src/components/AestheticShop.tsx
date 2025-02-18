import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Categories from "./categories";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import LoginPage from "./LoginPage"; // Import the LoginPage component
import SignUpPage from "./SignUpPage"; // Import the SignUpPage component

const AestheticShop: React.FC = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <Routes>
        {/* Default Home Page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Categories />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                <ProductCard imageSrc="https://placehold.co/300x200" productName="Product 1" price="$99.99" />
                <ProductCard imageSrc="https://placehold.co/300x200" productName="Product 2" price="$79.99" />
                <ProductCard imageSrc="https://placehold.co/300x200" productName="Product 3" price="$49.99" />
              </div>
              <Footer />
            </>
          }
        />
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Sign Up Page */}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default AestheticShop;
