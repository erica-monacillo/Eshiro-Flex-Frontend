import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@/index.css";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate login process
    if (username && password) {
      localStorage.setItem("authToken", "exampleToken"); // Save token for authentication
      localStorage.setItem("username", username); // Save username
      navigate("/profile"); // Navigate to User Profile
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "bg-gradient-to-r from-black via-gray-900 to-gray-700",
      }}
    >
      {/* Left Section for Shopee Logo with Cube Rotation Effect */}
      <div className="flex items-center justify-center w-1/2 group">
        <div className="logo-container perspective">
          <div className="logo-wrapper">
            <div className="logo-face front">
              <img
                src="https://i.imghippo.com/files/chP3718kF.png"
                alt=""
                className="logo-image"
              />
            </div>
            <div className="logo-face front">
              <img
                src="https://i.imghippo.com/files/chP3718kF.png"
                alt=""
                className="logo-image"
              />
            </div>
            <div className="logo-face front">
              <img
                src="https://i.imghippo.com/files/chP3718kF.png"
                alt=""
                className="logo-image"
              />
            </div>
            <div className="logo-face front">
              <img
                src="hhttps://i.imghippo.com/files/chP3718kF.png"
                alt=""
                className="logo-image"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section for Login Form */}
      <div
        className="p-8 rounded-2xl shadow-2xl w-full max-w-sm ml-auto mr-60"
        style={{
          background: "linear-gradient(to bottom, #121212, #383838)",
          border: "1px solid #444",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">
          Log In
        </h2>
        <form onSubmit={handleLogin}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg font-bold text-white"
            style={{
              backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
              (e.target as HTMLButtonElement).style.boxShadow =
                "0px 10px 25px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = "scale(1)";
              (e.target as HTMLButtonElement).style.boxShadow =
                "0px 4px 10px rgba(0, 0, 0, 0.2)";
            }}
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-white">New to Shopee?</span>{" "}
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
