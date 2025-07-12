export const API_BASE_URL = "http://localhost:5000/api";

export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
  },
  users: {
    profile: "/users/profile",
    search: "/users/search",
    update: "/users/profile",
    photo: "/users/photo",
    privacy: "/users/privacy",
  },
  skills: {
    offered: "/skills/offered",
    wanted: "/skills/wanted",
    search: "/skills/search",
  },
  swaps: {
    create: "/swaps",
    list: "/swaps/me",
    pending: "/swaps/pending",
    update: (id) => `/swaps/${id}`,
    cancel: (id) => `/swaps/${id}/cancel`,
    feedback: (id) => `/swaps/${id}/feedback`,
  },
  admin: {
    users: "/admin/users",
    swaps: "/admin/swaps",
    reports: "/admin/reports",
    messages: "/admin/messages",
  },
};
