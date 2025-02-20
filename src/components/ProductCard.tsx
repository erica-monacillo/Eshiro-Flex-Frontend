import React from "react";

const BUTTON_CLASS =
  "bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300";
const CARD_CLASS =
  "rounded-2xl shadow-2xl overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300";
const CARD_IMAGE_CLASS = "w-full rounded-t-2xl shadow-md object-cover";

interface ProductCardProps {
  imageSrc: string;
  productName: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  productName,
  price,
}) => {
  return (
    <div
      className={`${CARD_CLASS}`}
      style={{
        background: "linear-gradient(to right, rgb(221, 65, 27), #FFA07A)",
        width: "100%", // Fit container width
        maxWidth: "250px", // Uniform card size
        height: "300px", // Fixed height for 5 rows in a column
        margin: "0 auto", // Center-align in grid
      }}
    >
      <img
        src={imageSrc}
        alt={productName}
        className={`${CARD_IMAGE_CLASS}`}
        style={{ height: "150px", width: "100%" }} // Adjust image size
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-white mb-1">{productName}</h2>
        <p className="text-sm text-white mb-3">
          Get the best quality product for an amazing experience.
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-white">{price}</span>
          <button className={BUTTON_CLASS}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
