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

// Each graffiti has a certain number of people loving it, and each user loves a certain number of graffitis
associations.Graffiti.belongsToMany(associations.Users, {
  through: "Favorites",
});
associations.Users.belongsToMany(associations.Graffiti, {
  through: "Favorites",
});

// A graffiti is in a single city, but a city has more than one graffiti
associations.Graffiti.belongsTo(associations.Cities);
associations.Cities.hasMany(associations.Graffiti);

// A graffiti is in a single country, but a country has more than one graffiti
associations.Graffiti.belongsTo(associations.Countries);
associations.Countries.hasMany(associations.Graffiti);

// A user can post many comments, but a comment can only belong to a single user
// This is not necessary in the MVP, since there is no commenting feature required

module.exports = associations;
