import React from "react";
import NavBarUserProfile from "../components/NavBarUserProfile";

const RequestPage = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <NavBarUserProfile />

      <div className="pt-24 px-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create Skill Swap Request
          </h2>

          <form className="space-y-6">
            {/* Your Offered Skill */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose one of your offered skills
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">Select your skill to offer</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="react">React</option>
              </select>
            </div>

            {/* Their Wanted Skill */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose one of their wanted skills
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white">
                <option value="">Select skill you want to learn</option>
                <option value="photoshop">Photoshop</option>
                <option value="graphic-design">Graphic Design</option>
                <option value="ui-design">UI Design</option>
              </select>
            </div>

            {/* Message Box */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white h-32 resize-none"
                placeholder="Write a message to explain what you'd like to learn and what you can offer..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md font-medium"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
