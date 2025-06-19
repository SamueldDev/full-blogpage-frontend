



import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers:{
        "Content-Type": "application/json"
    }
})


// ✅ Automatically attach token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

   // console.log("Sending token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
