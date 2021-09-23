const { DataTypes } = require("sequelize");
const db = require("../config/db.config");
const Countries = require("./countries.model");

const Cities = db.define(
  "City",
  {
    // Model attributes are defined here

    city: {
      type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Cities;
