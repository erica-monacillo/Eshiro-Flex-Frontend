import React, { useState } from "react";
import { FiX } from "react-icons/fi";

const initialNotifications = [
  {
    id: 1,
    title: "[OPEN for a 20% OFF Voucher]",
    description:
      "Buy Maybelline Lifter Plump, Garnier cleanser, & MORE with your 20% OFF Voucher & enjoy deals as LOW as ₱18 this Shopee Beauty Fair!",
    icon: "https://yt3.googleusercontent.com/ytc/AIdro_kosTKH2nK_F7ZqWf7a8nXGoM4cxxvcHf99j3OfP0SsR-A=s900-c-k-c0x00ffffff-no-rj",
    read: false,
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Free on Coffee Beans!",
    description:
      "Stock up on your favorite coffee blends with our Buy 1 Get 1 Free offer. Perfect for coffee lovers!",
    icon: "https://i.pinimg.com/736x/dc/02/5d/dc025d5335326eb8e16657f398e5a247.jpg",
    read: false,
  },
  {
    id: 3,
    title: "20% OFF on Home Appliances!",
    description:
      "Refresh your home with the latest appliances at 20% OFF. From air fryers to washing machines, we've got you covered!",
    icon: "https://cdn.firstcry.com/education/2023/01/13101355/Names-Of-Household-Appliances-In-English.jpg",
    read: false,
  },
  {
    id: 4,
    title: "Flash Sale: 50% OFF on Laptops!",
    description:
      "Upgrade your tech with our limited-time offer! Grab the latest laptops with up to 50% OFF. Hurry, sale ends soon!",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5FTmlNNUpAjjWY6uQVzTmUMed4IXaiROUSg&s",
    read: false,
  },
];

interface NotificationPopupProps {
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationPopupProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div
      onMouseLeave={onClose} // Close the popup when the mouse leaves the container
      className="absolute right-10 top-12 w-96 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl border border-gray-200 z-50"
      style={{ width: "350px", height: "400px" }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center p-2 border-b border-gray-300 bg-gradient-to-r text-white rounded-t-2xl"
        style={{
          background: "linear-gradient(to right,rgb(255, 51, 0), #FFA07A",
        }}
      >
        <h3 className="font-roboto text-base ml-2 font-semibold">Notifications</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <FiX size={20} />
        </button>
      </div>

      {/* Notifications List */}
      <div className="p-4 max-h-80 overflow-y-auto space-y-3 scrollbar-hide">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              backgroundColor: notification.read ? "white" : "#FFE4E1",
            }}
            className={`flex items-start space-x-4 p-2 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105 ${
              notification.read ? "bg-white" : "bg-lightsalmon"
            }`}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <img
              src={notification.icon}
              alt="icon"
              className="w-10 h-10 rounded-full shadow-sm"
            />
            <div>
              <h4 className="font-roboto font-bold text-base text-gray-800">
                {notification.title}
              </h4>
              <p className="text-xs text-gray-600">{notification.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-300 bg-gray-50 text-center rounded-b-2xl">
        <button className="text-sm text-red-500 font-semibold hover:underline">
          View All
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;
