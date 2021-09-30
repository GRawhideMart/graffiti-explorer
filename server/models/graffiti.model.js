const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Graffiti = db.define("Graffiti", {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING(255),
  },
  author: {
    type: DataTypes.STRING(255),
  },
  city: {
    type: DataTypes.STRING(255),
  },
  image: {
    type: DataTypes.STRING(255),
  },
  geolocation: {
    type: DataTypes.GEOMETRY("POINT"),
  },
});

module.exports = Graffiti;
