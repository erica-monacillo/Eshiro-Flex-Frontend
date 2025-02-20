import React, { useState } from "react";
import Header from "./Header";
import { FiSearch, FiBell, FiUser, FiBox } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import CartIcon from "./CartIcon";
import NotificationPopup from "./NotificationPopup";

const Navbar: React.FC = () => {
  const location = useLocation(); // Get the current route
  const isCategoryPage = location.pathname.startsWith("/category"); // Check if on a category page

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isProductHovered, setIsProductHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);
  const [isNotificationHovered, setIsNotificationHovered] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleMouseEnter = () => setIsHeaderVisible(true);
  const handleMouseLeave = () => setIsHeaderVisible(false);

  const toggleNotifications = () => {
    setIsNotificationVisible((prev) => !prev);
  };

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
            ? "bg-[#f53722] shadow-lg" // Steady color for category pages
            : "bg-transparent" // Transparent for the main homepage
        } fixed top-0 left-0 w-full p-4 flex justify-between items-center text-primary-foreground z-20`}
      >
        <div className="flex items-center ml-20 space-x-4">
          <img
            src="https://user-images.githubusercontent.com/38139389/61145525-e3635900-a501-11e9-81a3-bcd9ab3e3b4d.png"
            alt="Shopee Logo"
            className="h-8"
          />
          <a href="/" className="text-3xl font-roboto text-white">
            Shopee
          </a>
        </div>
        <ul className="absolute top-6 flex space-x-6 right-36">
          {/* Search Bar Icon */}
          <li
            className="relative"
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
          >
            <a href="#" className="block">
              <FiSearch size={20} />
            </a>
            {isSearchHovered && (
              <span className="absolute top-8 left-0 bg-white text-black px-2 py-1 rounded shadow text-sm">
                Search
              </span>
            )}
          </li>

          {/* Product Icon */}
          <li
            className="relative"
            onMouseEnter={() => setIsProductHovered(true)}
            onMouseLeave={() => setIsProductHovered(false)}
          >
            <a href="#" className="block">
              <FiBox size={20} />
            </a>
            {isProductHovered && (
              <span className="absolute top-8 left-0 bg-white text-black px-2 py-1 rounded shadow text-sm">
                Products
              </span>
            )}
          </li>

          {/* Notification Icon */}
          <li
            className="relative"
            onMouseEnter={() => setIsNotificationHovered(true)}
            onMouseLeave={() => setIsNotificationHovered(false)}
          >
            <button onClick={toggleNotifications} className="block">
              <FiBell size={20} />
            </button>
            {isNotificationHovered && (
              <span className="absolute top-8 left-0 bg-white text-black px-2 py-1 rounded shadow text-sm">
                Notifications
              </span>
            )}
          </li>

          {/* Cart Icon */}
          <li
            className="relative"
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
          >
            <CartIcon />
            {isCartHovered && (
              <span className="absolute top-8 left-0 bg-white text-black px-2 py-1 rounded shadow text-sm">
                Cart
              </span>
            )}
          </li>

          {/* Log In Icon */}
          <li
            className="relative"
            onMouseEnter={() => setIsUserHovered(true)}
            onMouseLeave={() => setIsUserHovered(false)}
          >
            <Link to="/login" className="flex items-center hover:underline">
              <FiUser size={20} />
            </Link>
            {isUserHovered && (
              <span className="absolute top-8 left-0 bg-white text-black px-2 py-1 rounded shadow text-sm">
                Log In
              </span>
            )}
          </li>
        </ul>
      </nav>

      {/* Notification Pop-up */}
      {isNotificationVisible && (
        <NotificationPopup onClose={() => setIsNotificationVisible(false)} />
      )}
    </div>
  );
};

export default Navbar;
