import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../common/Navbar";
import HeroSection from "../ui/HeroSection";
import Categories from "../ui/categories";
import WhatsNew from "./WhatsNew"; // Import WhatsNew component
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
import UserProfile from "./UserProfile"; // Import UserProfile component

const AestheticShop: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-700 text-gray-800 min-h-screen flex flex-col">
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
                <WhatsNew /> {/* Add WhatsNew component here */}
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
          <Route path="/shop" element={<AestheticShop />} />
          <Route path="/category/stability" element={<StabilityPage />} />
          <Route path="/category/neutral" element={<NeutralPage />} />
          <Route path="/category/natural" element={<NaturalPage />} />
          <Route path="/category/motioncontrol" element={<MotionControlPage />} />8

          {/* Dynamic Category Page */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* Other Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<UserProfile />} /> {/* Add UserProfile route */}
          <Route path="*" element={<div className="text-center py-20">Page Not Found</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AestheticShop;
