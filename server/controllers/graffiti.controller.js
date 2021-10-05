const Graffiti = require("../models/graffiti.model");

// Retrieve all graffitis from the database
exports.findAll = (req, res) => {
  Graffiti.findAll({
    attributes: ["id", "title", "author", "city", "image", "geolocation"],
  })
    .then((data) => {
      let featureCollection = {
        type: "FeatureCollection",
        features: [],
      };
      featureCollection.features = data.map((entry) => ({
        type: "Feature",
        properties: {
          title: entry.title,
          author: entry.author,
          city: entry.city,
          image: entry.image,
        },
        geometry: {
          type: entry.geolocation.type,
          coordinates: entry.geolocation.coordinates,
        },
      }));
      return featureCollection;
    })
    .then((geoJSON) => res.json(geoJSON))
    .catch((err) =>
      res
        .status(500)
        .send(
          err.message || "Some error occurred while retrieving geolocations."
        )
    );
};
