import React, { useState } from "react";
import Header from "./Header";
import { FiSearch, FiBell, FiUser, FiBox } from "react-icons/fi";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon"; // Import the CartIcon component

const NAV_CLASS =
  "absolute top-0 left-0 w-full p-4 flex justify-between items-center text-primary-foreground z-20";
const LINK_CLASS = "hover:underline";

const Navbar: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isProductHovered, setIsProductHovered] = useState(false);
  const [isNotificationHovered, setIsNotificationHovered] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(false);

  const handleMouseEnter = () => setIsHeaderVisible(true);
  const handleMouseLeave = () => setIsHeaderVisible(false);

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleNotificationClick = () => {
    alert("You clicked the notification icon!");
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Header isVisible={isHeaderVisible} />
      <nav className={NAV_CLASS}>
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
        <ul
          className="absolute top-6 flex space-x-6"
          style={{ right: "150px" }}
        >
          {/* Search Bar Icon */}
          <li
            className="relative"
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
          >
            <a href="#" onClick={toggleSearch}>
              <FiSearch size={20} />
            </a>
            {isSearchHovered && (
              <span
                className="absolute top-8 left-0 bg-white text-black p-1 rounded-md shadow-md pointer-events-none"
                style={{ width: "50px", textAlign: "center", fontSize: "12px" }}
              >
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
              <span
                className="absolute top-8 left-0 bg-white text-black p-1 rounded-md shadow-md pointer-events-none"
                style={{ width: "60px", textAlign: "center", fontSize: "12px" }}
              >
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
            <a href="#" onClick={handleNotificationClick} className="block">
              <FiBell size={20} />
            </a>
            {isNotificationHovered && (
              <span
                className="absolute top-8 left-0 text-black p-1 rounded-md shadow-md pointer-events-none"
                style={{
                  width: "75px",
                  textAlign: "center",
                  fontSize: "12px",
                  backgroundColor: "white",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
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
              <span
                className="absolute top-8 left-0 text-black p-1 rounded-md shadow-md pointer-events-none"
                style={{
                  width: "40px",
                  textAlign: "center",
                  fontSize: "12px",
                  backgroundColor: "white",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
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
            <Link to="/login" className={`flex items-center ${LINK_CLASS}`}>
              <FiUser size={20} />
            </Link>
            {isUserHovered && (
              <span
                className="absolute top-8 left-0 text-black p-1 rounded-md shadow-md pointer-events-none"
                style={{
                  width: "50px",
                  textAlign: "center",
                  fontSize: "12px",
                  backgroundColor: "white",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Log In
              </span>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
