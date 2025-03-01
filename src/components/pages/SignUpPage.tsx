import React from "react";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-gray-700 p-4">
      {/* Left Section for Shopee Logo - Hidden on Small Screens */}
      <div className="hidden md:flex items-center justify-center md:w-1/2 lg:w-2/5 min-h-[300px]">

        <div className="logo-container">
          <div className="logo-wrapper flex flex-wrap justify-center">
            {['front', 'right', 'back', 'left'].map((face) => (
              <div key={face} className={`logo-face ${face}`}>
                <img
                  src="https://i.imghippo.com/files/chP3718kF.png"
                  alt="Éshiro Flex"
                  className="logo-image"
                  style={{ width: "250px", height: "250px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section for Sign Up Form */}
      <div className="p-8 rounded-2xl shadow-2xl w-full max-w-sm md:w-1/2 lg:w-2/5" style={{
        background: "linear-gradient(to bottom, #121212, #383838)",
        border: "1px solid #444",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)"
      }}>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">Sign Up</h2>
        <form className="w-full">
          {['email', 'username', 'password', 'confirm-password'].map((field, index) => (
            <div key={index} className="mb-4">
              <label htmlFor={field} className="block text-sm font-medium text-white capitalize">
                {field.replace('-', ' ')}
              </label>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                id={field}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-purple-700 to-blue-500 transform transition-transform hover:scale-105 hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>
        <p className="text-xs text-center text-gray-500 mt-4">
          By signing up, you agree to our <span className="text-blue-500 hover:underline cursor-pointer">Terms of Service</span> &
          <span className="text-blue-500 hover:underline cursor-pointer"> Privacy Policy</span>.
        </p>
        <div className="mt-4 text-center">
          <span className="text-sm text-white">Have an account?</span>{" "}
          <Link to="/login" className="text-sm text-blue-500 hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
