import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  // baseURL: "https://greenshift.energy/backend",
  withCredentials: true, // Ensure cookies are sent with each request
});

// Function to fetch CSRF token
const getCsrfToken = async () => {
  const response = await axios.get(
    // "http://greenshift.energy:3000/api/csrf-token",
    "http://localhost:3000/api/csrf-token",
    {
      withCredentials: true,
    }
  );
  return response.data.csrfToken;
};

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Include Authorization header if token is available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    //Fetch and include CSRF token
    const csrfToken = await getCsrfToken();
    config.headers["CSRF-Token"] = csrfToken;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
