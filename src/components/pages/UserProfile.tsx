import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
  
    if (!authToken) {
      navigate("/login"); // Redirect if no token
    }
  }, [navigate]);
  

  
  // User information state
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    address: "1234 Elm Street, Springfield",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("User information updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <div>
            <h2 className="text-3xl font-semibold text-gray-200 mb-4">
              User Information
            </h2>
            {isEditing ? (
              <form className="space-y-4">
                <label className="block">
                  <span className="text-gray-400">Complete Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring focus:ring-blue-600"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-400">Complete Address:</span>
                  <input
                    type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring focus:ring-blue-600"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-400">Email:</span>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring focus:ring-blue-600"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-400">Phone Number:</span>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    className="w-full mt-2 p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:ring focus:ring-blue-600"
                  />
                </label>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="py-2 px-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong>Name:</strong> {userInfo.name}
                </p>
                <p>
                  <strong>Address:</strong> {userInfo.address}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userInfo.phone}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
                >
                  Edit Information
                </button>
              </div>
            )}
          </div>
        );
      case "orders":
        return (
          <div>
            <h2 className="text-3xl font-semibold text-gray-200 mb-4">
              My Orders
            </h2>
            <p className="text-gray-400">No orders yet.</p>
          </div>
        );
        case "payment":
            return (
              <div>
                <h2 className="text-3xl font-semibold text-gray-200 mb-4">
                  Payment Method
                </h2>
                <p className="text-gray-400 mb-6">
                  Select your preferred payment method from the list below.
                </p>
                <div className="space-y-4">
                  {["Credit Card", "PayPal", "GCash", "PayMaya", "Bank Transfer"].map(
                    (method, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 bg-gray-700 rounded-lg ${
                          selectedPayment === method
                            ? "border-2 border-blue-500"
                            : "hover:border-gray-500 border border-transparent"
                        }`}
                        onClick={() => setSelectedPayment(method)}
                      >
                        <p className="text-lg font-medium text-gray-300">{method}</p>
                        {selectedPayment === method && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() =>
                      alert(`Payment method selected: ${selectedPayment || "None"}`)
                    }
                    className={`py-2 px-6 text-white rounded-lg ${
                      selectedPayment
                        ? "bg-blue-600 hover:bg-blue-500"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                    disabled={!selectedPayment}
                  >
                    Confirm Payment Method
                  </button>
                </div>
              </div>
            );
      case "settings":
        return (
          <div>
            <h2 className="text-3xl font-semibold text-gray-200 mb-4">
              Settings
            </h2>
            <p className="text-gray-400">Adjust your preferences here.</p>
          </div>
        );
      default:
        return <p className="text-gray-400">Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 to-black">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="mt-1 text-gray-400">Welcome, {userInfo.name}</p>
        </div>
        <ul className="p-4 space-y-4">
          <li
            onClick={() => setActiveTab("info")}
            className={`cursor-pointer p-3 rounded-lg ${
              activeTab === "info"
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            User Information
          </li>
          <li
            onClick={() => setActiveTab("orders")}
            className={`cursor-pointer p-3 rounded-lg ${
              activeTab === "orders"
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            My Orders
          </li>
          <li
            onClick={() => setActiveTab("payment")}
            className={`cursor-pointer p-3 rounded-lg ${
              activeTab === "payment"
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            Payment Method
          </li>
          <li
            onClick={() => setActiveTab("settings")}
            className={`cursor-pointer p-3 rounded-lg ${
              activeTab === "settings"
                ? "bg-blue-600"
                : "hover:bg-gray-700"
            }`}
          >
            Settings
          </li>
          <li
            onClick={handleLogout}
            className="cursor-pointer p-3 rounded-lg bg-red-600 mt-8 text-center"
          >
            Log Out
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8 flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
