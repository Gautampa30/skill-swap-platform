export interface User {
  id: string;
  name: string;
  email: string;
  location?: string;
  profilePhoto?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string[];
  isPublic: boolean;
  rating: number;
  createdAt: string;
}

export interface SwapRequest {
  id: string;
  senderId: string;
  receiverId: string;
  skillOffered: string;
  skillWanted: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  message: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  swapId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
