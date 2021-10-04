const Graffiti = require("../models/graffiti.model");

// Retrieve all graffitis from the database
exports.findAll = (req, res) => {
  Graffiti.findAll({ attributes: ["title", "author", "city", "image"] })
    .then((data) => res.json(data))
    .catch((err) =>
      res
        .status(500)
        .send(
          err.message || "Some error occurred while retrieving geolocations."
        )
    );
};
