import React, { useEffect, useRef, useCallback } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  isVisible: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isVisible, onClose }) => {
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isVisible, handleClickOutside]);

  if (!isVisible) return null;

  return (
    <div
      ref={searchRef}
      className="fixed top-3 left-1/2 transform -translate-x-1/2 w-2/3 sm:w-1/3 
                 bg-white shadow-lg rounded-full flex items-center 
                 px-3 py-1 h-10 text-sm border border-gray-300 z-50"
    >
      <input
        type="text"
        placeholder="Search for products..."
        aria-label="Search input"
        className="w-full px-2 text-xs text-black rounded-full outline-none"
      />
      <button 
        className="p-2"
        aria-label="Search button"
      >
        <FiSearch size={16} className="text-black" strokeWidth={3.5} />
      </button>
    </div>
  );
};

export default SearchBar;