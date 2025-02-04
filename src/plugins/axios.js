import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Gunakan path relatif agar berjalan dengan proxy
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
