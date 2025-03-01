import React, { useState } from "react";
import Header from "./Header";
import { FiSearch, FiHeart, FiUser, FiBox, FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./Searchbar";

const Navbar: React.FC = () => {
  const location = useLocation(); // Get the current route
  const isCategoryPage = location.pathname.startsWith("/category"); // Check if on a category page

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleMouseEnter = () => setIsHeaderVisible(true);
  const handleMouseLeave = () => setIsHeaderVisible(false);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Header isVisible={isHeaderVisible} />
      <nav
        className={`${
          isCategoryPage
            ? "bg-gradient-to-r from-black via-gray-900 to-gray-700 shadow-lg"
            : "bg-gradient-to-r from-black via-gray-900 to-gray-700"
        } fixed top-0 left-0 w-full p-4 flex items-center justify-between text-primary-foreground z-20`}
      >
        {/* Left Section (Logo) */}
        <div className="flex-1 flex justify-start ml-4 md:ml-20">
          <img
            src="https://i.imghippo.com/files/EKJR1736yTo.png"
            alt="Éshiro Flex"
            className="h-8"
          />
          <Link to="/" className="text-2xl font-roboto text-white ml-2">
            Éshiro Flex
          </Link>
        </div>

        {/* Right Section (Icons) */}
        <ul className="flex space-x-6 mr-4 md:mr-20">
          <li>
            <button onClick={() => setIsSearchVisible(true)} aria-label="Open Search Bar">
              <FiSearch size={20} color="white" />
            </button>
          </li>
          <li>
            <Link to="/products" title="Products">
              <FiBox size={20} color="white" />
            </Link>
          </li>
          <li>
            <Link to="/wishlist" title="Wishlist">
              <FiHeart size={20} color="white" />
            </Link>
          </li>
          <li>
            <Link to="/cart" title="Cart">
              <FiShoppingCart size={20} color="white" />
            </Link>
          </li>
          <li>
            <Link to="/login" title="Log In">
              <FiUser size={20} color="white" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Search Bar */}
      {isSearchVisible && (
        <SearchBar isVisible={isSearchVisible} onClose={() => setIsSearchVisible(false)} />
      )}
    </div>
  );
};

export default Navbar;
