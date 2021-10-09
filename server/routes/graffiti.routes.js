module.exports = (app) => {
  const graffitis = require("../controllers/graffiti.controller");

  const router = require("express").Router();

  // Retrieve all graffitis
  router.get("/", graffitis.findAll);

  // Retrieve graffiti by ID
  router.get("/:id", graffitis.findById);

  // Toggle favorite graffiti
  router.put("/:id", graffitis.toggleFavorite);

  app.use("/api/graffiti", router);
};
