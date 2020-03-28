import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

export const insertKit = kitData => api.post(`/kit`, kitData);
export const updateKitById = (id, kitData) => api.put(`/kit/${id}`, kitData);
export const deleteKitById = id => api.delete(`/kit/${id}`);
export const getKitsBySpecies = species => api.get(`/kit/${species}`);
export const getAllKits = () => api.get(`/kits`);

const apis = {
  insertKit,
  updateKitById,
  deleteKitById,
  getKitsBySpecies,
  getAllKits
};

export default apis;
