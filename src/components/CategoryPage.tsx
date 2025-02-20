import React from "react";
import { useParams } from "react-router-dom";
import MensApparelPage from "./categories/MensApparel";
import WomensApparelPage from "./categories/WomensApparel";
import HealthPersonalCarePage from "./categories/Health&PersonalCare";
import HomeLivingPage from "./categories/Home&Living";
import PetCarePage from "./categories/PetCare";
import HomeEntertainmentPage from "./categories/HomeEntertainment";
import MakeupFragrancesPage from "./categories/Makeup&Fragrances";
import MobilesAccessoriesPage from "./categories/MobileAccessories";
import WomenAccessoriesPage from "./categories/WomenAccessories";
import MensBagsAccessories from "./categories/MensBags&Accessories";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const renderCategoryContent = () => {
    switch (categoryName) {
      case "Men's Apparel":
        return <MensApparelPage />;
      case "Women's Apparel":
        return <WomensApparelPage />;
      case "Health & Personal Care":
        return <HealthPersonalCarePage />;
      case "Home & Living":
        return <HomeLivingPage />;
      case "Pet Care":
        return <PetCarePage />;
      case "Home Entertainment":
        return <HomeEntertainmentPage />;
      case "Makeup & Fragrances":
        return <MakeupFragrancesPage />;
      case "Mobile Accessories":
        return <MobilesAccessoriesPage />;
      case "Women Accessories":
        return <WomenAccessoriesPage />;
      case "Men's Bags & Accessories":
        return <MensBagsAccessories />;
      default:
        return (
          <div className="text-center py-10">
            <p className="text-lg font-semibold">Category Not Found</p>
            <a
              href="/"
              className="text-blue-500 underline mt-4 block hover:text-blue-700"
            >
              Go Back to Home
            </a>
          </div>
        );
    }
  };

  return (
    <div className="bg-white py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">{categoryName}</h1>
        {renderCategoryContent()}
      </div>
    </div>
  );
};

export default CategoryPage;
