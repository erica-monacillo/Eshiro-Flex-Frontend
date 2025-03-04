import axios from "axios";

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle user login
export const login = async (email: string, password: string) => {
  const response = await api.post("/login/", { username: email, password }); // Use `api` instead of `axiosInstance` and map email to username
  return response.data; // Return the data, and the calling code can handle errors
};

export default api; // Export the axios instance
