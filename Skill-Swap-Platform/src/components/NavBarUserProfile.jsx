import React from "react";
import { useNavigate } from "react-router-dom";

const NavBarUserProfile = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        {/* Save/Discard Buttons - Now on Left */}
        <div className="flex items-center space-x-4">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md">
            Save
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md">
            Discard
          </button>
        </div>

        {/* Profile Section - Now on Right */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-gray-700 hover:text-teal-600 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/swaprequest")}
              className="px-4 py-2 text-gray-700 hover:text-teal-600 transition-colors"
            >
              Swap Requests
            </button>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          {/* Profile Picture */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-md">
            M
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarUserProfile;
