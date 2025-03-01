import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@/index.css";
import { useEffect } from "react"; // Import useEffect


const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/profile"); // Redirect to profile if already logged in
    }
  }, [navigate]);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem("authToken", "exampleToken");
      console.log("Stored authToken:", localStorage.getItem("authToken"));
      localStorage.setItem("username", username);
      navigate("/shop");
    } else {
      alert("Please enter both username and password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen md:flex-row">
      {/* Logo Section (Hidden on Small Screens) */}
      <div className="hidden md:flex items-center justify-center md:w-1/2 lg:w-2/5 min-h-[300px]">

        <div className="w-[250px] h-[250px] flex items-center justify-center">
          <div className="logo-wrapper">
            <div className="logo-face front">
              <img src="https://i.imghippo.com/files/chP3718kF.png" alt="" className="logo-image" />
            </div>
            <div className="logo-face right">
              <img src="https://i.imghippo.com/files/chP3718kF.png" alt="" className="logo-image" />
            </div>
            <div className="logo-face back">
              <img src="https://i.imghippo.com/files/chP3718kF.png" alt="" className="logo-image" />
            </div>
            <div className="logo-face left">
              <img src="https://i.imghippo.com/files/chP3718kF.png" alt="" className="logo-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="p-8 rounded-2xl shadow-2xl w-full max-w-sm md:w-1/2 lg:w-2/5" style={{
        background: "linear-gradient(to bottom, #121212, #383838)",
        border: "1px solid #444",
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
      }}>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-white">Email or Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 mt-1" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 mt-1" />
          </div>
          <button type="submit" className="w-full py-3 px-4 rounded-lg font-bold text-white" style={{
            backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = "scale(1.05)";
            (e.target as HTMLButtonElement).style.boxShadow = "0px 10px 25px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = "scale(1)";
            (e.target as HTMLButtonElement).style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
          }}>
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-white">New to Eshiro Flex?</span>{" "}
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
