import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

export const createKit = kitData => api.post(`/kit`, kitData);
export const updateKitById = (id, kitData) => api.put(`/kit/${id}`, kitData);
export const deleteKitById = id => api.delete(`/kit/${id}`);
export const getKitsBySpecies = species => api.get(`/kit/${species}`);
export const getAllKits = () => api.get(`/kits`);
export const logIn = loginData => api.post("/login", loginData);
export const checkLoggedIn = () => api.get("/loggedIn");

const apis = {
  createKit,
  updateKitById,
  deleteKitById,
  getKitsBySpecies,
  getAllKits,
  logIn,
  checkLoggedIn
};

export default apis;
