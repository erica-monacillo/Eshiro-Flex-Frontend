import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartIcon: React.FC = () => {
  return (
    <Link to="/cart">
      <FiShoppingCart size={20} />
    </Link>
  );
};

export default CartIcon;
