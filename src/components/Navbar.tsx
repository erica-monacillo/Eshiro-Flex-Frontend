import React, { useState } from "react";
import Header from "./Header";
import { FiSearch, FiBell, FiUser, FiBox, FiShoppingCart } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import NotificationPopup from "./NotificationPopup";
import SearchBar from "./Searchbar";

const Navbar: React.FC = () => {
  const location = useLocation(); // Get the current route
  const isCategoryPage = location.pathname.startsWith("/category"); // Check if on a category page

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
          isCategoryPage ? "bg-gradient-to-r from-black via-gray-900 to-gray-700 shadow-lg" : "bg-gradient-to-r from-black via-gray-900 to-gray-700"
        } fixed top-0 left-0 w-full p-4 flex justify-between items-center text-primary-foreground z-20`}
      >
        <div className="flex items-center ml-20 space-x-4">
          <img
            src="https://i.imghippo.com/files/kMs5388zTU.png"
            alt="Éshiro Flex"
            className="h-8"
          />
          <Link to="/" className="text-2xl font-roboto text-white">
            Éshiro Flex
          </Link>
        </div>
        <ul className="absolute top-6 flex space-x-6 right-36">
          {/* Search Bar Icon (Hidden when search is visible) */}
          {!isSearchVisible && (
            <li className="relative">
              <button
                onClick={() => setIsSearchVisible(true)}
                className="block"
                aria-label="Open Search Bar"
              >
                <FiSearch size={20} color="white" />
              </button>
            </li>
          )}

          {/* Product Icon */}
          <li className="relative">
            <Link to="/products" className="block" title="Product" aria-label="View Products">
              <FiBox size={20} color="white" />
            </Link>
          </li>

          {/* Notification Icon */}
          <li className="relative">
            <button
              onClick={toggleNotifications}
              className="block"
              title="Notification"
              aria-label="View Notifications"
            >
              <FiBell size={20} color="white" />
            </button>
          </li>

          {/* Cart Icon */}
          <li className="relative">
            <Link to="/cart" className="block" title="Cart" aria-label="View Cart">
              <FiShoppingCart size={20} color="white" />
            </Link>
          </li>

          {/* Log In Icon */}
          <li className="relative">
            <Link to="/login" className="flex items-center" title="Log In" aria-label="Log In">
              <FiUser size={20} color="white" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Notification Pop-up */}
      {isNotificationVisible && (
        <NotificationPopup onClose={() => setIsNotificationVisible(false)} />
      )}

      {/* Search Bar */}
      {isSearchVisible && (
        <SearchBar isVisible={isSearchVisible} onClose={() => setIsSearchVisible(false)} />
      )}
    </div>
  );
};

export default Navbar;
