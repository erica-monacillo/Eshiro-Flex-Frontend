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

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products/');
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (isVisible) {
      fetchProducts();
    }
  }, [isVisible]);

  // Handle click outside
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
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, handleClickOutside]);

  // Handle search filtering
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
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
                 bg-white shadow-lg rounded-lg flex flex-col px-3 py-2 border border-gray-300 z-50"
    >
      <div className="flex items-center w-full">
        <input
          type="text"
          placeholder="Search for products..."
          aria-label="Search input"
          value={query}
          onChange={handleSearchChange}
          className="w-full px-2 py-1 text-sm text-black placeholder-gray-500 bg-white rounded-lg outline-none border border-gray-300"
        />
        <button className="p-2" aria-label="Search button">
          <FiSearch size={18} className="text-gray-600" strokeWidth={3.5} />
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="text-gray-600 text-sm mt-2">Loading...</p>}

      {/* Error State */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Search Results */}
      {filteredProducts.length > 0 && (
        <ul className="w-full mt-2 bg-white shadow-lg border border-gray-300 rounded-lg max-h-48 overflow-auto">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="p-2 text-sm text-black hover:bg-gray-100 cursor-pointer transition-colors duration-150"
              onClick={() => alert(`Selected: ${product.name}`)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
