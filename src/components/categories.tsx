import React from "react";
import { Link } from "react-router-dom";

interface Category {
  icon: string;
  label: string;
}

const categories: Category[] = [
  { icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT21qM4zE1gUne1mx9jH3Rb7WxyIJE5tDzVkEFCuMS81veMjmIivh-BuNHU4hXmVfIfFg&usqp=CAU/50", label: "Men's Apparel" },
  { icon: "https://shop.lucerneluxe.com/cdn/shop/products/T127.410.11.041.00_300x300.png?v=1737084342", label: "Men's Bags & Accessories" },
  { icon: "https://m.media-amazon.com/images/I/516eahV5TxL.jpg", label: "Mobiles Accessories" },
  { icon: "https://images.philips.com/is/image/philipsconsumer/90f9f91dd8694f48b566b0d200ef190b?wid=700&hei=700&$pnglarge$", label: "Home Entertainment" },
  { icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYJFVtZEFTGhK3evOFC4_For0TbR05gwYpBg&s", label: "Home & Living" },
  { icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz-zug3beaEHM6PXfDsCigwKQ5PkFa-SeMSQ&s/50", label: "Women's Apparel" },
  { icon: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/tortoise-gold-brown-gradient-full-rim-cat-eye-john-jacobs-jj-tints-jj-s13150-c1-sunglasses_john-jacobs-jj-s13150-c1-sunglasses_eyeglasses_g_2468_05_july23.jpg", label: "Women Accessories" },
  { icon: "https://s3.credihealth.com/2xns3539wlminxt4ni6pc7xjakw5", label: "Health & Personal Care" },
  { icon: "https://makeupforever.ph/cdn/shop/products/I000064100_1.png?v=1676866434", label: "Makeup & Fragrances" },
  { icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-k3gvdV4H9JgllYiJPzUwBHFLwtvaKyVPsg&s", label: "Pet Care" },
];

const Categories: React.FC = () => {
  return (
    <div className="bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link
              to={`/category/${encodeURIComponent(category.label)}`}
              key={index}
              className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform"
            >
              <img
                src={category.icon}
                alt={category.label}
                className="w-12 h-12 rounded-full"
              />
              <p className="text-sm text-center text-gray-700">{category.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
