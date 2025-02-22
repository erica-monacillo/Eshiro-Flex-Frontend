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
            ? "bg-black shadow-lg" // Steady color for category pages
            : "bg-black" // Transparent for the main homepage
        } fixed top-0 left-0 w-full p-4 flex justify-between items-center text-primary-foreground z-20`}
      >
        <div className="flex items-center ml-20 space-x-4">
          <img
            src="https://i.imghippo.com/files/SkCY2678f.png"
            alt="Éshiro Flex"
            className="h-8"
          />
          <a href="/" className="text-2xl font-roboto text-white">
            Éshiro Flex
          </a>
        </div>
        <ul className="absolute top-6 flex space-x-6 right-36">
          {/* Search Bar Icon */}
          <li className="relative">
            <a href="#" className="block">
              <FiSearch size={20} color="white" />
            </a>
          </li>

          {/* Product Icon */}
          <li className="relative">
            <a href="#" className="block">
              <FiBox size={20} color="white" />
            </a>
          </li>

          {/* Notification Icon */}
          <li className="relative">
            <button onClick={toggleNotifications} className="block">
              <FiBell size={20} color="white" />
            </button>
          </li>

          {/* Cart Icon */}
          <li className="relative">
            <div className="text-white">
              <CartIcon />
            </div>
          </li>

          {/* Log In Icon */}
          <li className="relative">
            <Link to="/login" className="flex items-center">
              <FiUser size={20} color="white" />
            </Link>
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
