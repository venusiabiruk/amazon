import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://amazon-backend-deploy-9qkp.onrender.com/",
});

export { axiosInstance };
