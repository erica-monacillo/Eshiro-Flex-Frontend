import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../common/Navbar";
import HeroSection from "../ui/HeroSection";
import Categories from "../ui/categories";
import WhatsNew from "./WhatsNew";
import ProductCard from "../ui/ProductCard";
import Footer from "../common/Footer";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import CategoryPage from "../ui/CategoryPage";
import CartPage from "./CartPage";
import UserProfile from "./UserProfile";
import CheckoutPage from "./CheckoutPage";
import Wishlist from "./Wishlist";
import { fetchProducts } from "../../api/apiService"; // Import API call function
import ProductPage from "../pages/ProductPage";

// CartItem interface
export interface CartItem {
  id: number;
  productName: string;
  price: string;
  image_Url: string;
  quantity: number;
}

// Product interface
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

const AestheticShop: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from backend
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts(); // Fetch data from API
        setProducts(data); // Update state with fetched products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      productName: product.name,  // Corrected this line to map to 'productName'
      price: product.price,
      image_Url: product.image_url,
      quantity: 1,
    };
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === product.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, cartItem];
      }
    });
  };

  // Handle Add to Wishlist
  const handleAddToWishlist = (item: Product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.find((wishlistItem) => wishlistItem.id === item.id)) {
        return [...prevItems, item];
      }
      return prevItems;
    });
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-700 text-gray-100 min-h-screen flex flex-col">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
      />

      {/* Navbar */}
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <WhatsNew />
                {loading ? (
                  <p className="text-center text-gray-300">Loading products...</p>
                ) : error ? (
                  <p className="text-center text-red-500">{error}</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        imageSrc={product.image_url}
                        productName={product.name}
                        price={product.price}
                        onAddToCart={() => handleAddToCart(product)}
                        onAddToWishlist={() => handleAddToWishlist(product)}
                      />
                    ))}
                  </div>
                )}
              </>
            }
          />
          {/* Other Routes */}
          <Route path="/shop" element={<AestheticShop />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/wishlist"
            element={<Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="*"
            element={<div className="text-center text-gray-200 py-20">Page Not Found</div>}
          />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AestheticShop;