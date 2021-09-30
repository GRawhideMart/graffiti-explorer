import http from "../http-common";

const getAll = () => {
  return http.get("/api/location");
};

const CoordinatesService = { getAll };
export default CoordinatesService;
