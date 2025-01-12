import axios from "axios";
import BASE_URL from "./config";

const api = axios.create({
  baseURL: BASE_URL,
});

// Add an Axios interceptor to attach the JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {
    config.headers["x-access-token"] = token; // Add token to headers
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API endpoints

// Function to sign up a user
export const signup = async (userData) => {
  const response = await api.post("/signup", userData);
  return response.data;
};

// Function to log in a user
export const login = async (userData) => {
  const response = await api.post("/login", userData);
  return response.data;
};

// Function to fetch videos
export const getVideos = async () => {
  const response = await api.get("/videos");
  return response.data;
};

export default api;
