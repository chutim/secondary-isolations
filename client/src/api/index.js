import axios from "axios";

const api = axios.create({
  // baseURL: `http://localhost:8000/api`
  withCredentials: true
});

export const createKit = kitData => api.post(`/api/kit`, kitData);
export const updateKitById = (id, kitData) =>
  api.put(`/api/kit/${id}`, kitData);
export const deleteKitById = id => api.delete(`/api/kit/${id}`);
export const getAllKits = () => api.get(`/api/kits`);
export const logIn = loginData => api.post("/api/login", loginData);
export const checkLoginStatus = () => api.get("/api/login");
export const logOut = () => api.post("/api/logout");

const apis = {
  createKit,
  updateKitById,
  deleteKitById,
  getAllKits,
  logIn,
  checkLoginStatus,
  logOut
};

export default apis;
