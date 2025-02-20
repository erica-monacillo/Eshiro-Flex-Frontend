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
                <ProductCard imageSrc="https://cdn.luxe.digital/media/20240625085857/most-expensive-sneakers-glass-shard-air-jordan-1-luxe-digital-780x520.jpg" productName="Product 1" price="$99.99" />
                <ProductCard imageSrc="https://visor.ph/wp-content/uploads/2018/06/suzuki-jimny-official-pics-main6.jpg" productName="Suzuki Jimny" price="$79.99" />
                <ProductCard imageSrc="https://media.tenor.com/_zWYqfZdneIAAAAe/shocked-face-shocked-meme.png" productName="ADETANG" price="$49.99" />
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
