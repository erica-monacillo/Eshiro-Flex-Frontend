import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";


const SignUpPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-sm">
        <h2 className="text-2xl font-roboto mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
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
            Next
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">OR</p>
          <div className="flex justify-around mt-2">
            <button className="flex items-center space-x-2 py-2 px-4 border border-gray-300 rounded-md">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span>Facebook</span>
            </button>
            <button className="flex items-center space-x-2 py-2 px-4 border border-gray-300 rounded-md">
              <FontAwesomeIcon icon={faGoogle} className="text-blue-500 w-5 h-5" />
              <span>Google</span>
            </button>
          </div>
        </div>
        <p className="text-xs text-center text-gray-500 mt-4">
          By signing up, you agree to Shopee's{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          &{" "}
          <span className="text-blue-500 hover:underline cursor-pointer">
            Privacy Policy
          </span>.
        </p>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-700">Have an account?</span>{" "}
          <Link to="/login" className="text-sm text-blue-500 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
