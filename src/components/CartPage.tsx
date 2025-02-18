import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import CartPage from './components/CartPage';


const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </Router>
  );
};

export default App;
