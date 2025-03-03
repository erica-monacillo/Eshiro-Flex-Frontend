// pang balhin ang kuan mga routes 

// import Navbar from "../common/Navbar";
// import HeroSection from "../ui/HeroSection";
// import Categories from "../ui/categories";
// import WhatsNew from "./WhatsNew";
// import ProductCard from "../ui/ProductCard";
// import Footer from "../common/Footer";
// import LoginPage from "./LoginPage";
// import SignUpPage from "./SignUpPage";
// import CategoryPage from "../ui/CategoryPage";
// import StabilityPage from "../categories/Stability";
// import MotionControlPage from "../categories/MotionControl";
// import NaturalPage from "../categories/Natural";
// import NeutralPage from "../categories/Neutral";
// import CartPage from "./CartPage";
// import UserProfile from "./UserProfile";
// import CheckoutPage from "./CheckoutPage";
// import Wishlist from "./Wishlist";







// <div className="flex-1">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <HeroSection />
//                 <Categories />
//                 <WhatsNew />
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-4">
//                   {products.map((product) => (
//                     <ProductCard
//                       key={product.id}
//                       id={product.id}
//                       imageSrc={product.imageSrc}
//                       productName={product.productName}
//                       price={product.price}
//                       onAddToCart={handleAddToCart}
//                       onAddToWishlist={handleAddToWishlist} // Pass onAddToWishlist here
//                     />
//                   ))}
//                 </div>
//               </>
//             }
//           />
//           {/* Other Routes */}
//           <Route path="/shop" element={<AestheticShop />} />
//           <Route path="/category/stability" element={<StabilityPage />} />
//           <Route path="/category/neutral" element={<NeutralPage />} />
//           <Route path="/category/natural" element={<NaturalPage />} />
//           <Route path="/category/motioncontrol" element={<MotionControlPage />} />
//           <Route path="/category/:categoryName" element={<CategoryPage />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route
//             path="/wishlist"
//             element={<Wishlist wishlistItems={wishlistItems} setWishlistItems={setWishlistItems} />}
//           />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignUpPage />} />
//           <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} />} />
//           <Route path="/profile" element={<UserProfile />} />
//           <Route
//             path="*"
//             element={<div className="text-center text-gray-200 py-20">Page Not Found</div>}
//           />
//         </Routes>



// export default routes;