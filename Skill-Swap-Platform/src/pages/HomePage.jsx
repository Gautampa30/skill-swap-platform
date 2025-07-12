import React from "react";
import { useNavigate } from "react-router-dom";
import NavBarHomePage from "../components/NavBarHomePage";

const users = [
  {
    name: "Marc Demo",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic designer"],
    rating: 3.9,
  },
  {
    name: "Michell",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic designer"],
    rating: 2.5,
  },
  {
    name: "Joe Wills",
    skillsOffered: ["JavaScript", "Python"],
    skillsWanted: ["Photoshop", "Graphic designer"],
    rating: 4.0,
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      <NavBarHomePage />

      {/* Hero Section */}
      <div className="pt-24 pb-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find Your Perfect <span className="text-teal-600">Skill Match</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with people worldwide to exchange skills and knowledge
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto p-4 space-y-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center bg-white p-6 rounded-xl shadow-md">
          <div className="relative w-full md:w-auto">
            <select className="w-full md:w-48 appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:border-teal-500 transition-colors">
              <option>Availability ▼</option>
              <option>weekends</option>
              <option>evenings</option>
              <option>Always</option>
            </select>
          </div>
          <div className="flex w-full md:w-auto flex-1 max-w-2xl">
            <input
              type="text"
              className="w-full bg-white border border-gray-200 rounded-l-lg px-4 py-2 text-gray-700 focus:border-teal-500 transition-colors"
              placeholder="Search skills..."
            />
            <button className="px-6 py-2 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="flex flex-col gap-6">
          {users.map((user, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 w-full"
            >
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex-shrink-0 flex items-center justify-center text-2xl font-bold text-white mx-auto md:mx-0">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-grow space-y-4 w-full">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <span className="text-teal-600 text-sm font-medium">
                        Skills Offered →
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user.skillsOffered.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm rounded-full bg-teal-50 border border-teal-200 text-teal-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-blue-600 text-sm font-medium">
                        Skills Wanted →
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user.skillsWanted.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-sm rounded-full bg-blue-50 border border-blue-200 text-blue-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-end">
                      <button
                        onClick={() => navigate("/userphoto")}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                      >
                        Request
                      </button>
                    </div>
                    <div className="flex justify-end items-center text-gray-600">
                      <span className="text-yellow-400 mr-1">★</span>
                      {user.rating}/5
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 py-8">
          <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors">
            ←
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg transition-colors ${
                page === 2
                  ? "bg-teal-600 text-white"
                  : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors">
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
