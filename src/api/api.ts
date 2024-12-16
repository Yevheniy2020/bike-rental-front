import axios from "axios";

const BASE_URL =
  "https://bikerental-hpdca3d2ashje9h5.canadacentral-01.azurewebsites.net/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
