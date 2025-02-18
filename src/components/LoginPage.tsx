import React from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 69, 0, 0.8), white 40%, white 60%, rgba(255, 69, 0, 0.8))",
      }}
    >
      {/* Left Section for Shopee Logo */}
      <div className="hidden lg:flex items-center justify-center w-1/2">
        <img
          src="https://user-images.githubusercontent.com/38139389/61145525-e3635900-a501-11e9-81a3-bcd9ab3e3b4d.png"
          alt="Shopee Logo"
          className="w-80 h-85 object-contain"
        />
      </div>

      {/* Right Section for Login Form */}
      <div className="bg-white p-9 shadow-lg rounded-md w-full max-w-sm ml-auto mr-60">
        <h2 className="text-2xl font-roboto mb-4">Log In</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md"
            style={{
              backgroundColor: "#FF9178",
              color: "white",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor =
                "#F53925";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor =
                "#ff9178";
            }}
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700">New to Shopee?</span>{" "}
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
