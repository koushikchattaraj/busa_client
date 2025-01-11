import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log(process.env.REACT_APP_API_BASE_URL);

export default apiClient;

export const createPlayer = (userData) => {
  const formData = new FormData();
  for (const key in userData) {
    if (userData[key]) {
      if (key === "photo" || key === "uploadPaymentProof") {
        formData.append(key, userData[key]);
      } else {
        formData.append(key, userData[key]);
      }
    }
  }

  // Set headers for file upload
  return apiClient.post("/api/players", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllPlayers = () => {
  return apiClient.get("/api/players");
};

export const getPlayerById = (id) => {
  return apiClient.get(`/api/players/${id}`);
};

export const verifiedPayment = (userData) => {
  return apiClient.post(`/api/players/verify-payment-proof`, userData);
};
