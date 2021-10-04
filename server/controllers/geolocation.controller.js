const Graffiti = require("../models/graffiti.model");

// Retrieve all geolocations from the database
exports.findAll = (req, res) => {
  Graffiti.findAll({ attributes: ["geolocation"] })
    .then((data) => res.json(data))
    .catch((err) =>
      res
        .status(500)
        .send(
          err.message || "Some error occurred while retrieving geolocations."
        )
    );
};
