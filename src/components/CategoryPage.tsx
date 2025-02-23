import React from "react";
import { useParams } from "react-router-dom";
import StabilityPage from "./categories/Stability";
import Neutral from "./categories/Neutral";
import NaturalPage from "./categories/Natural";
import MotionControlPage from "./categories/MotionControl";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const renderCategoryContent = () => {
    switch (categoryName?.toLowerCase()) { // Normalize case for matching
      case "stability":
        return <StabilityPage />;
      case "neutral":
        return <Neutral />;
      case "natural":
        return <NaturalPage />;
      case "motion control":
        return <MotionControlPage />;
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
