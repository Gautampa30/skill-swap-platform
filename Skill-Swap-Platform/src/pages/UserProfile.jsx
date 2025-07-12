import React from "react";
import NavBarUserProfile from "../components/NavBarUserProfile";

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <NavBarUserProfile />

      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - User Details */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Profile Details
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your location"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills Offered
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Add skills you can offer"
                    />
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                        JavaScript ×
                      </span>
                      <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                        Python ×
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills Wanted
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Add skills you want to learn"
                    />
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Photoshop ×
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        UI Design ×
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Weekdays</option>
                  <option>Weekends</option>
                  <option>Both</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>
            </form>
          </div>

          {/* Right Side - Profile Picture */}
          <div className="bg-white rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Profile Picture
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center relative">
                <span className="text-gray-500">No image</span>
                <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                  Change Photo
                </button>
                <button className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
