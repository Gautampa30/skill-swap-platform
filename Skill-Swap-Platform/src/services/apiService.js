import api from "./api";
import { API_ENDPOINTS } from "../config/api";

export const authService = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.auth.login, credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.auth.register, userData);
    return response.data;
  },
};

export const userService = {
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.user.profile);
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await api.put(API_ENDPOINTS.user.updateProfile, data);
    return response.data;
  },
  searchUsers: async (params) => {
    const response = await api.get(API_ENDPOINTS.user.search, { params });
    return response.data;
  },
};

export const swapService = {
  createSwap: async (data) => {
    const response = await api.post(API_ENDPOINTS.swaps.create, data);
    return response.data;
  },
  getMySwaps: async () => {
    const response = await api.get(API_ENDPOINTS.swaps.list);
    return response.data;
  },
  updateSwap: async (id, action) => {
    const response = await api.put(API_ENDPOINTS.swaps.update(id), { action });
    return response.data;
  },
  submitFeedback: async (id, feedback) => {
    const response = await api.post(API_ENDPOINTS.swaps.feedback(id), feedback);
    return response.data;
  },
};
