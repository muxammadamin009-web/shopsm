import axios from "axios";

const api = axios.create({
  baseURL: "https://shopsm-backend.onrender.com",
});

export default api;