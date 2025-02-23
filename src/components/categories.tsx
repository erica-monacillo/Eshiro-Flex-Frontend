import React from "react";
import { Link } from "react-router-dom";

interface Category {
  icon: string;
  label: string;
}

const categories: Category[] = [
  {
    icon: "https://i.imghippo.com/files/VdP6611PqI.png",
    label: "Stability",
  },
  {
    icon: "https://images.ctfassets.net/hnk2vsx53n6l/7n8OWdIi6rlr4EUuRjEDe6/e85f65160db7c1247b66b3768a246586/70345ddaddaea814b49071fe27886e66060ecb11.png?fm=webp",
    label: "Neutral",
  },
  {
    icon: "https://i.imghippo.com/files/GmvU5709M.png",
    label: "Natural",
  },
  {
    icon: "https://i.imghippo.com/files/CyZ2884Wk.png",
    label: "MotionControl",
  },
];

const Categories: React.FC = () => {
  return (
    <div className="bg-black py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center">
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
              <p className="text-sm text-center text-white">{category.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
