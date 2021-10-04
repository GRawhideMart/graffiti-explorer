module.exports = (app) => {
  const graffitis = require("../controllers/graffiti.controller");

  const router = require("express").Router();

  // Retrieve all graffitis
  router.get("/", graffitis.findAll);

  app.use("/api/graffiti", router);
};
