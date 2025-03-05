import axios from "axios";

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your actual API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the Authorization token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Token ${token}`; // Attach token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to handle user login
export const login = async (email: string, password: string) => {
  const response = await api.post("/login/", { username: email, password }); // Use `api` and map email to username
  // Save the token to localStorage upon successful login
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    console.log(response.data.token);
  }
  return response.data; // Return the data, and the calling code can handle errors
};

// Export the axios instance
export default api;
