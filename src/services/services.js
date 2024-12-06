import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;

export const createPlayer = (userData) => {
  return apiClient.post("/api/players", userData);
};

export const getAllPlayers = () => {
  return apiClient.get("/api/players");
};

export const getPlayerById = (id) => {
  return apiClient.get(`/api/players/${id}`);
};
