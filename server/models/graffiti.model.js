const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Graffiti = db.define("Graffiti", {
  // Model attributes are defined here
  country_id: {
    type: DataTypes.INTEGER,
  },
  city_id: {
    type: DataTypes.INTEGER,
  },
  author_id: {
    type: DataTypes.INTEGER,
  },
  geolocation: {
    type: DataTypes.GEOMETRY("POINT"),
  },
});

module.exports = Graffiti;
