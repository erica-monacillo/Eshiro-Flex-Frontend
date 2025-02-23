import React from "react";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom, black, #6a11cb 50%, black",
      }}
    >
      {/* Left Section for Shopee Logo */}
      <div className="flex items-center justify-center w-1/2 group">
        <div className="logo-container">
          <div className="logo-wrapper">
            <div className="logo-face front">
              <img
                src="https://i.imghippo.com/files/olL1734gOU.png"
                alt="Éshiro Flex"
                className="logo-image"
                style={{
                    width: "300px",
                    height: "300px",
                }}
              />
            </div>
            <div className="logo-face back">
              <img
                src="https://i.imghippo.com/files/olL1734gOU.png"
                alt="Éshiro Flex"
                className="logo-image"
                style={{
                    width: "300px",
                    height: "300px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section for Sign Up Form */}
      <div
            className="p-8 rounded-2xl shadow-2xl w-full max-w-sm ml-auto mr-60"
            style={{
            background: "linear-gradient(to bottom, #121212, #383838)",
            border: "1px solid #444",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
            }}
        >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          Sign Up
        </h2>
        <form>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-bold text-white"
            style={{
              background: "linear-gradient(to right, #6a11cb, #2575fc)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
              (e.target as HTMLButtonElement).style.boxShadow =
                "0px 8px 20px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = "scale(1)";
              (e.target as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            Sign Up
          </button>
        </form>
        <p className="text-xs text-center text-gray-500 mt-4">
          By signing up, you agree to our{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          &{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Privacy Policy
          </span>.
        </p>
        <div className="mt-4 text-center">
          <span className="text-sm text-white">Have an account?</span>{" "}
          <Link to="/login" className="text-sm text-blue-500 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
