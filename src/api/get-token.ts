import api from "./api.ts";

const setAuthHeader = () => {
  const token = localStorage.getItem("user");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export default setAuthHeader;
