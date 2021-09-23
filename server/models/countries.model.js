const { DataTypes } = require("sequelize");
const db = require("../config/db.config");
const Cities = require("./cities.model");

const Countries = db.define(
  "Country",
  {
    // Model attributes are defined here
    country: {
      type: DataTypes.STRING(255),
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Countries;
