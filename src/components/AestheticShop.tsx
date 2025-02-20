import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Categories from "./categories";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import MensApparelPage from "./categories/MensApparel";
import WomensApparelPage from "./categories/WomensApparel";
import CategoryPage from "./CategoryPage";
import HealthPersonalCarePage from "./categories/Health&PersonalCare";
import HomeLivingPage from "./categories/Home&Living";
import PetCarePage from "./categories/PetCare";
import HomeEntertainmentPage from "./categories/HomeEntertainment";
import MakeupFragrancesPage from "./categories/Makeup&Fragrances";
import MobilesAccessoriesPage from "./categories/MobileAccessories";
import WomenAccessoriesPage from "./categories/WomenAccessories";
import MensBagsAccessories from "./categories/MensBags&Accessories";

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
          {/* Dynamic Category Page */}
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          {/* Specific Category Pages */}
          <Route path="/category/mens-apparel" element={<MensApparelPage />} />
          <Route path="/category/womens-apparel" element={<WomensApparelPage />} />
          <Route path="/category/health-and-personal-care" element={<HealthPersonalCarePage />} />
          <Route path="/category/home-and-living" element={<HomeLivingPage />} />
          <Route path="/category/pet-care" element={<PetCarePage />} />
          <Route path="/category/home-entertainment" element={<HomeEntertainmentPage />} />
          <Route path="/category/makeup-and-fragrances" element={<MakeupFragrancesPage />} />
          <Route path="/category/mobile-accessories" element={<MobilesAccessoriesPage />} />
          <Route path="/category/women-accessories" element={<WomenAccessoriesPage />} />
          <Route path="/category/mens-bags-and-accessories" element={<MensBagsAccessories />} />
          {/* Login and Signup Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* 404 Fallback */}
          <Route path="*" element={<div className="text-center py-20">Page Not Found</div>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default AestheticShop;
