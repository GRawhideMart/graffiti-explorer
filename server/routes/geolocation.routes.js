module.exports = (app) => {
  const geolocations = require("../controllers/geolocation.controller");

  const router = require("express").Router();

  // Retrieve all geolocations
  router.get("/", geolocations.findAll);

  app.use("/api/location", router);
};
