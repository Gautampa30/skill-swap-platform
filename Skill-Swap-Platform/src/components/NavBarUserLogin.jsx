import React from "react";
import { useNavigate } from "react-router-dom";

const NavBarUserLogin = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 hover:text-teal-600 transition-colors cursor-pointer">
          Skill Swap Platform
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
        >
          Home
        </button>
      </div>
    </nav>
  );
};

export default NavBarUserLogin;
