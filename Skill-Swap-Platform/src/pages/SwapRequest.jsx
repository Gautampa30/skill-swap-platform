import React, { useState } from "react";
import { useSwaps } from "../hooks/useSwaps";
import NavBarSwapRequest from "../components/NavBarSwapRequest";

const SwapRequest = () => {
  const { swaps, loading, error, handleAction } = useSwaps();
  const [filter, setFilter] = useState("all");

  const filteredSwaps = swaps.filter((swap) => {
    if (filter === "pending") return swap.status === "pending";
    if (filter === "accepted") return swap.status === "accepted";
    if (filter === "rejected") return swap.status === "rejected";
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <NavBarSwapRequest />
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Swap Requests</h1>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {filteredSwaps.map((swap) => (
            <div key={swap.id} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {swap.senderName}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Offering:{" "}
                      <span className="text-teal-600">{swap.skillOffered}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Requesting:{" "}
                      <span className="text-blue-600">{swap.skillWanted}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {swap.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(swap.id, "accept")}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(swap.id, "reject")}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      swap.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : swap.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {swap.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SwapRequest;
