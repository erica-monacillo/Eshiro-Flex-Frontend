import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
  
    if (!authToken) {
      navigate("/login"); // Redirect if no token
      return;
    }
  
    let parsedToken;
    try {
      // If the token is a JSON object, parse it
      parsedToken = JSON.parse(authToken);
      if (typeof parsedToken === "string") {
        // If it's a plain string, use it directly
        parsedToken = { token: parsedToken };
      }
      console.log("Parsed Token:", parsedToken); // Debugging
    } catch (error) {
      console.error("Error parsing authToken:", error);
      navigate("/login");
      return;
    }
  
    // Fetch user profile data
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken.token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("User Profile Data:", data);
  
        setUserInfo({
          name: data.name || "N/A",
          address: data.address || "N/A",
          email: data.email || "N/A",
          phone: data.phone || "N/A",
        });
        setSelectedPayment(data.paymentMethod || null);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        navigate("/login");
      }
    };
  
    fetchUserProfile();
  }, [navigate]);  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSave = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ ...userInfo, paymentMethod: selectedPayment }),
      });

      if (response.ok) {
        alert("User information updated successfully!");
      } else {
        console.error("Failed to update user information");
      }
    } catch (error) {
      console.error("Error saving user information:", error);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

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
                <label className="block">
                  <span className="text-gray-400">Payment Method:</span>
                  <input
                    type="text"
                    name="paymentMethod"
                    value={selectedPayment || ""}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    placeholder="Enter payment method (e.g., Cash, Credit Card)"
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
                <p>
                  <strong>Payment Method:</strong> {selectedPayment || "Not specified"}
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
              activeTab === "info" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            User Information
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
