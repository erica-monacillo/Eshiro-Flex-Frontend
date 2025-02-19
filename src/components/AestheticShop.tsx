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
              <div
                className="grid grid-cols-5 gap-4 p-4"
                style={{
                  gridTemplateRows: "repeat(5, 1fr)", // Create 5 rows
                }}
              >
                {Array(25)
                  .fill(null)
                  .map((_, index) => (
                    <ProductCard
                      key={index}
                      imageSrc="https://media.assettype.com/evoindia%2Fimport%2F2018%2F07%2FSuzuki-Jimny-2.jpg"
                      productName={`Product ${index + 1}`}
                      price={`$${(index + 1) * 10}`}
                    />
                  ))}
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
