import React, { useEffect, useRef, useCallback, useState } from "react";
import { FiSearch } from "react-icons/fi";

interface Product {
  id: number;
  name: string;
}

interface SearchBarProps {
  isVisible: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isVisible, onClose }) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch products when the search bar is first opened
  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length > 0) return; // Avoid unnecessary API calls

      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) fetchProducts();
  }, [isVisible, products]);

  // Handle click outside to close search bar
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, handleClickOutside]);

  // Handle search filtering
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(value);

    if (value === "") {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={searchRef}
      className="fixed top-3 left-1/2 transform -translate-x-1/2 w-2/3 sm:w-1/3 
                 bg-white/5 backdrop-blur-xl shadow-2xl rounded-full flex flex-col px-3 py-2 
                 border border-white/20 z-50 overflow-hidden"
    >
      <div className="flex items-center w-full relative">
        <FiSearch size={18} className="text-white/80 absolute left-3" strokeWidth={3.5} />
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search input"
          value={query}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-3 py-2 text-sm text-white placeholder-white/60 bg-transparent 
                     rounded-full outline-none border-none focus:ring-2 focus:ring-white/40"
          aria-live="polite"
        />
      </div>

      {/* Search Results */}
      {filteredProducts.length > 0 && (
        <ul
          className="w-full mt-2 bg-white/5 backdrop-blur-xl shadow-lg border border-white/10 
                     rounded-2xl max-h-48 overflow-auto transition-all duration-200 ease-in-out"
        >
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="p-2 text-white hover:bg-white/20 cursor-pointer transition-colors duration-150"
              onClick={() => alert(`Selected: ${product.name}`)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
    </div>
  );
};

export default SearchBar;
