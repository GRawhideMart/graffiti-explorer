const Graffiti = require("../models/graffiti.model");

// Retrieve all graffitis from the database
exports.findAll = (req, res) => {
  Graffiti.findAll({
    attributes: [
      "id",
      "title",
      "author",
      "city",
      "image",
      "geolocation",
      "isFavorite",
    ],
  })
    .then((data) => {
      let featureCollection = {
        type: "FeatureCollection",
        features: [],
      };
      featureCollection.features = data.map((entry) => ({
        type: "Feature",
        properties: {
          id: entry.id,
          title: entry.title,
          author: entry.author,
          city: entry.city,
          image: entry.image,
          isFavorite: entry.isFavorite,
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

exports.findById = (req, res, next) => {
  Graffiti.findByPk(req.params.id, {
    attributes: [
      "id",
      "title",
      "author",
      "city",
      "image",
      "geolocation",
      "isFavorite",
    ],
  })
    .then((data) => {
      let featureCollection = {
        type: "FeatureCollection",
        features: [],
      };
      featureCollection.features.push({
        type: "Feature",
        properties: {
          id: data.dataValues.id,
          title: data.dataValues.title,
          author: data.dataValues.author,
          city: data.dataValues.city,
          image: data.dataValues.image,
          isFavorite: data.dataValues.isFavorite,
        },
        geometry: {
          type: data.dataValues.geolocation.type,
          coordinates: data.dataValues.geolocation.coordinates,
        },
      });
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

exports.toggleFavorite = (req, res, next) => {
  console.log(req.body);
  // must be applied to /api/graffiti/:id
  Graffiti.update(
    { isFavorite: req.body.isFavorite },
    { returning: true, where: { id: req.params.id } }
  )
    .then(([rowsUpdate, [updatedGraffiti]]) => {
      res.json(updatedGraffiti);
    })
    .catch(next);
};
