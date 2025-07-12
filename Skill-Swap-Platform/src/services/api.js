import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const userService = {
  updateProfile: async (data) => {
    const response = await api.put(ENDPOINTS.users.profile, data);
    return response.data;
  },
  updatePhoto: async (file) => {
    const formData = new FormData();
    formData.append("photo", file);
    const response = await api.post(ENDPOINTS.users.photo, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  searchUsers: async (query) => {
    const response = await api.get(ENDPOINTS.users.search, { params: query });
    return response.data;
  },
};

export const swapService = {
  createRequest: async (data) => {
    const response = await api.post(ENDPOINTS.swaps.create, data);
    return response.data;
  },
  getMyRequests: async () => {
    const response = await api.get(ENDPOINTS.swaps.list);
    return response.data;
  },
  updateRequest: async (id, status) => {
    const response = await api.put(ENDPOINTS.swaps.update(id), { status });
    return response.data;
  },
  cancelRequest: async (id) => {
    const response = await api.delete(ENDPOINTS.swaps.cancel(id));
    return response.data;
  },
  submitFeedback: async (id, feedback) => {
    const response = await api.post(ENDPOINTS.swaps.feedback(id), feedback);
    return response.data;
  },
};

export const adminService = {
  getUsers: async () => {
    const response = await api.get(ENDPOINTS.admin.users);
    return response.data;
  },
  banUser: async (userId) => {
    const response = await api.post(`${ENDPOINTS.admin.users}/${userId}/ban`);
    return response.data;
  },
  getReports: async () => {
    const response = await api.get(ENDPOINTS.admin.reports);
    return response.data;
  },
  sendMessage: async (message) => {
    const response = await api.post(ENDPOINTS.admin.messages, message);
    return response.data;
  },
};

export default api;
