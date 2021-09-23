const associations = {
  Authors: require("./authors.model"),
  Cities: require("./cities.model"),
  Comments: require("./comments.model"),
  Countries: require("./countries.model"),
  Graffiti: require("./graffiti.model"),
  Users: require("./users.model"),
  Visits: require("./visits.model"),
};

// A country has many cities
associations.Cities.belongsTo(associations.Countries);
associations.Countries.hasMany(associations.Cities);

// A graffiti has one author, but an author can draw many graffitis
associations.Graffiti.belongsTo(associations.Authors);
associations.Authors.hasMany(associations.Graffiti);

module.exports = associations;
