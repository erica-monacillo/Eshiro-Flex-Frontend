import React, { useState } from "react";
import Header from "./Header";
import { FiSearch, FiBell, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import CartIcon from "./components/CartIcon";

const NAV_CLASS =
  "absolute top-0 left-0 w-full p-4 flex justify-between items-center text-primary-foreground z-20";
const LINK_CLASS = "hover:underline";

const Navbar: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Added this line

  const handleMouseEnter = () => setIsHeaderVisible(true);
  const handleMouseLeave = () => setIsHeaderVisible(false);

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };

  const handleNotificationClick = () => {
    alert("You clicked the notification icon!");
  };

  const handleCartClick = () => {
    alert("You click the cart icon");
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
          <li className="relative">
            <a href="#" onClick={toggleSearch}>
              <FiSearch size={20} />
            </a>
            {isSearchVisible && (
              <div
                className="absolute top-10 left-0 bg-white text-black p-2 rounded-md shadow-md"
                style={{ width: "200px" }}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-1 border rounded"
                />
                <button
                  className="bg-primary text-primary-foreground mt-2 w-full py-1 rounded hover:bg-primary/80"
                  onClick={() => alert("Searching...")}
                >
                  Search
                </button>
              </div>
            )}
          </li>

          {/* Notification Icon */}
          <li>
            <a href="#" onClick={handleNotificationClick}>
              <FiBell size={20} />
            </a>
          </li>

          {/* Cart Icon */}
          <li>
            <a href="#" onClick={handleCartClick}>
              <FiShoppingCart size={20} />
            </a>
          </li>

          {/* Log In Icon */}
          <li>
            <Link to="/login" className={`flex items-center ${LINK_CLASS}`}>
              <FiUser size={20} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
