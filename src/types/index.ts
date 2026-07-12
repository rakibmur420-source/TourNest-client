export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  role: "user" | "admin";
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TravelPackage {
  _id: string;
  title: string;
  destination: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  duration: number;
  images: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  rating: number;
  reviewCount: number;
  createdBy: string | { _id: string; name: string; email: string };
  createdAt: string;
}

export interface Review {
  _id: string;
  packageId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  pagination?: Pagination;
  related?: TravelPackage[];
  reviews?: Review[];
}
