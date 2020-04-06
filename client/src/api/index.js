import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:${global.port || 3000}/api`,
  withCredentials: true
});

export const createKit = kitData => api.post(`/kit`, kitData);
export const updateKitById = (id, kitData) => api.put(`/kit/${id}`, kitData);
export const deleteKitById = id => api.delete(`/kit/${id}`);
export const getAllKits = () => api.get(`/kits`);
export const logIn = loginData => api.post("/login", loginData);
export const checkLoginStatus = () => api.get("/login");
export const logOut = () => api.post("/logout");

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
