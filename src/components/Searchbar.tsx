import React, { useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  isVisible: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isVisible, onClose }) => {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div
      ref={searchRef}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-2/3 sm:w-1/3 
                 bg-white shadow-lg rounded-full flex items-center 
                 px-3 py-1 h-9.5 text-sm border border-gray-300 z-50"
    >
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full px-2 text-xs rounded-full outline-none"
      />
      <button className="p-1 bg-black text-white rounded-full">
        <FiSearch size={14} />
      </button>
    </div>
  );
};

export default SearchBar;
