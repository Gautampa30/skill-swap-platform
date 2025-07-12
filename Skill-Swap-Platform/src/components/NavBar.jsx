import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
        >
          Skill Swap Platform
        </h1>

        {user ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/swaprequest")}
              className="px-4 py-2 text-gray-700 hover:text-teal-600 transition-colors"
            >
              Swap Requests
            </button>
            <button
              onClick={() => navigate("/userprofile")}
              className="px-4 py-2 text-gray-700 hover:text-teal-600 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
