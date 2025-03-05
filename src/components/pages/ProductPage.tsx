import React, { useState, useEffect } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import axiosInstance from "@/api/axiosInstance"; // Import the axios instance

// Define the Product interface
interface Product {
  id: number;
  category: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
  product_size: string;
  created_at: string;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedStatus] = useState<Record<string, boolean>>({});; // Track each product's added status to cart


  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        const response = await axiosInstance.get("/products/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product to wishlist
  const handleAddToWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Add product to cart
  const handleAddToCart = (productId: number) => {
    if (!cart.includes(productId)) {
      setCart([...cart, productId]);
    }
  };

  // Fallback for loading or no products
  if (loading) {
    return <p className="text-center text-white">Loading products...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No products available.</p>;
  }

  return (
    <div className="product-page p-6">
      {/* Product Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-gray-900 border border-gray-700 rounded-2xl p-4"
          >
            {/* Wishlist Button */}
            <div className="absolute top-3 right-3">
              <button
                className={`p-1 ${
                  wishlist.includes(product.id)
                    ? "text-red-500"
                    : "text-gray-300"
                } bg-gray-800 rounded-full hover:text-red-400`}
                onClick={() => handleAddToWishlist(product.id)}
              >
                <Heart size={18} />
              </button>
            </div>

            {/* Product Image */}
            <img
              src={product.image_url}
              alt={product.name || "Product image"}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />

            {/* Product Details */}
            <div>
              <h2 className="font-semibold text-white">{product.name}</h2>
              <p className="text-sm text-gray-400">{product.category}</p>
              <p className="text-sm text-gray-400">
                Size: {product.product_size}
              </p>
              <p className="text-sm text-gray-400">{product.description}</p>
              <p className="text-lg font-bold text-white mt-2">
                ₱{product.price}
              </p>
              <p
                className={`text-sm mt-1 ${
                  product.stock > 0 ? "text-green-400" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `In stock: ${product.stock}`
                  : "Out of stock"}
              </p>
            </div>

              {/* Add to Cart Button */}
              <button
                className={`mt-4 w-full ${
                  addedStatus[product.name]
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-300"
                } text-sm py-2 rounded-full`}
                onClick={() => handleAddToCart(product.id)}
                disabled={addedStatus[product.name]}
              >
                <ShoppingCart size={16} className="mr-1 inline" />
                {addedStatus[product.name] ? "Added" : "Add to Cart"}
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
