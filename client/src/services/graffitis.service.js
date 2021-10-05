import http from "../http-common";

const getAll = () => {
  return http.get("/api/graffiti");
};

const GraffitiService = { getAll };
export default GraffitiService;
