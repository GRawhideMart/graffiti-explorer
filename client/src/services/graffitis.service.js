import http from "../http-common";

const getAll = () => {
  return http.get("/api/graffiti");
};

const toggleFavorite = ({ id, data }) => {
  return http.put(`/api/graffiti/${id}`, data);
};

const GraffitiService = { getAll, toggleFavorite };
export default GraffitiService;
