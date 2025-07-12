import { useState, useEffect } from "react";
import { swapService } from "../services/api";

export const useSwaps = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSwaps = async () => {
    try {
      setLoading(true);
      const data = await swapService.getMyRequests();
      setSwaps(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await swapService.updateRequest(id, action);
      await fetchSwaps();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSwaps();
  }, []);

  return { swaps, loading, error, handleAction, refreshSwaps: fetchSwaps };
};
