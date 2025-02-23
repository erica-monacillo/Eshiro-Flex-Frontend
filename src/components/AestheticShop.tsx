import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Categories from "./categories";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import CategoryPage from "./CategoryPage";
import StabilityPage from "./categories/Stability";
import MotionControlPage from "./categories/MotionControl";
import NaturalPage from "./categories/Natural";
import NeutralPage from "./categories/Neutral";
import CartPage from "./CartPage";

const AestheticShop: React.FC = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          {/* Default Home Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Categories />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-4">
                  {Array(25)
                    .fill(null)
                    .map((_, index) => (
                      <ProductCard
                        key={index}
                        imageSrc="https://media.assettype.com/evoindia%2Fimport%2F2018%2F07%2FSuzuki-Jimny-2.jpg"
                        productName={`Product ${index + 1}`}
                        price={`₱${(index + 1) * 10}`}
                      />
                    ))}
                </div>
              </>
            }
          />
          {/* Specific Category Pages */}
          <Route path="/category/stability" element={<StabilityPage />} />
          <Route path="/category/neutal" element={<NeutralPage />} />
          <Route path="/category/natural" element={<NaturalPage />} />
          <Route path="/category/motioncontrol" element={<MotionControlPage />} />
          
          {/* Dynamic Category Page */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* Other Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<div className="text-center py-20">Page Not Found</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AestheticShop;
