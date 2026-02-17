import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://carmarket-pro-backend.onrender.com/api",
    withCredentials: true,
});

export default apiRequest;

