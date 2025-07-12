import React from "react";
import { useNavigate } from "react-router-dom";
import NavBarScreen4 from "../components/NavBarScreen4";

const Screen4 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50">
      <NavBarScreen4 />

      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Side - User Details */}
          <div className="md:col-span-2 space-y-6">
            <button
              onClick={() => navigate("/requestpage")}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
            >
              Request
            </button>

            <div className="bg-white rounded-xl p-6 shadow-lg space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Marc Demo</h2>

              <div>
                <h3 className="text-lg font-semibold text-teal-600 mb-3">
                  Skills Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200">
                    Python
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">
                  Skills Wanted
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    Photoshop
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    Graphic Design
                  </span>
                </div>
              </div>
            </div>

            {/* Ratings and Feedback Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800 mb-2">4.5</div>
                <div className="flex justify-center text-yellow-400 text-xl mb-2">
                  ★★★★★
                </div>
                <div className="text-gray-600">Based on 28 reviews</div>
              </div>

              {/* Feedback List */}
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-gray-800">John Doe</div>
                    <div className="text-yellow-400">★★★★★</div>
                  </div>
                  <p className="text-gray-600">
                    Great experience working with Marc. Very knowledgeable in
                    JavaScript.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium text-gray-800">Sarah Smith</div>
                    <div className="text-yellow-400">★★★★☆</div>
                  </div>
                  <p className="text-gray-600">
                    Excellent Python skills and very patient in teaching.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Profile Picture */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-6xl font-bold text-white">
                M
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-gray-600 text-sm">
                  <span>Member since</span>
                  <span>Jan 2024</span>
                </div>
                <div className="flex items-center justify-between text-gray-600 text-sm mt-2">
                  <span>Availability</span>
                  <span>Weekends</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Screen4;
