import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Category {
  name: string;
}

interface Product {
  id: number;
  category: Category; // Assuming category is an object with name property
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
  product_size: string;
  created_at: string;
}

interface CartItem {
  id: string;
  productName: string;
  price: string;
  imageSrc: string;
  quantity: number;
}

const NeutralPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<CartItem[]>([]);
  const [addedStatus] = useState<Record<string, boolean>>({});
  const [wishlistStatus, setWishlistStatus] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
        const response = await axios.get<Product[]>("http://127.0.0.1:8000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`  // Include the token in the request header
          }
        });
        const filteredProducts = response.data.filter(
          (product) => product.category && product.category.name === "Neutral"
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = storedCart.find((item: CartItem) => item.id === product.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem: CartItem = {
        id: product.name,
        productName: product.name,
        price: product.price,
        imageSrc: product.image_url,
        quantity: 1,
      };
      storedCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product: Product) => {
    if (!wishlistStatus[product.name]) {
      const item: CartItem = {
        id: product.name,
        productName: product.name,
        price: product.price,
        imageSrc: product.image_url,
        quantity: 1,
      };

      const updatedWishlist = [...wishlistItems, item];
      setWishlistItems(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      setWishlistStatus((prevStatus) => ({
        ...prevStatus,
        [product.name]: true,
      }));

      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleWishlistPageRedirect = () => {
    navigate("/wishlist");
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-900 to-gray-700 min-h-screen py-6">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <img
            src="https://th.bing.com/th/id/OIP.mditFcBkBUEnQU_eCLb8DQHaEc?rs=1&pid=ImgDetMain"
            alt="Neutral Shoes"
            className="w-full xl:w-screen h-64 object-cover rounded-xl shadow-lg mt-10"
            style={{ objectPosition: "40% 70%" }}
          />
        </div>

        <h1 className="text-3xl font-bold text-white mb-6">Neutral</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300 p-4"
            >
              <div className="absolute top-3 right-3 flex space-x-2">
                <button
                  className={`p-1 ${wishlistStatus[product.name] ? "text-red-500" : "text-gray-300"} bg-gray-800 rounded-full hover:text-red-400`}
                  onClick={() => handleAddToWishlist(product)}
                >
                  <Heart size={18} />
                </button>
                <button
                  className="p-1 text-gray-300 bg-gray-800 rounded-full hover:text-gray-400"
                  onClick={handleWishlistPageRedirect}
                >
                  ⇅
                </button>
              </div>

              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-50 object-cover rounded-xl mb-3"
              />

              <div>
                <h2 className="font-semibold text-white truncate">{product.name}</h2>
                <p className="text-sm text-gray-400">My Store</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-lg font-bold text-white">{product.price}</p>
                  <p className="text-xs line-through text-gray-500">₱80.00</p>
                </div>
              </div>

              <button
                className={`mt-4 w-full ${addedStatus[product.name] ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-white text-black hover:bg-gray-300"} text-sm py-2 rounded-full`}
                onClick={() => handleAddToCart(product)}
                disabled={addedStatus[product.name]}
              >
                <ShoppingCart size={16} className="mr-1 inline" />
                {addedStatus[product.name] ? "Added" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeutralPage;
