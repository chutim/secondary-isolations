import axios from "axios";

const baseURL =
  process.env.NODE_ENV.trim() === "development"
    ? "http://localhost:8000"
    : undefined;

const api = axios.create({
  withCredentials: true,
  baseURL,
});

export const createKit = (kitData) => api.post(`/api/kit`, kitData);
export const updateKitById = (id, kitData) =>
  api.put(`/api/kit/${id}`, kitData);
export const deleteKitById = (id) => api.delete(`/api/kit/${id}`);
export const getAllKits = () => api.get(`/api/kits`);
export const logIn = (loginData) => api.post("/api/login", loginData);
export const updatePasscode = (userData) => api.put("/api/login", userData);
export const checkLoginStatus = () => api.get("/api/login");
export const logOut = () => api.post("/api/logout");

const apis = {
  createKit,
  updateKitById,
  deleteKitById,
  getAllKits,
  logIn,
  updatePasscode,
  checkLoginStatus,
  logOut,
};

export default apis;
