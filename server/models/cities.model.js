const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Cities = db.define(
  "City",
  {
    // Model attributes are defined here
    country_id: {
      type: DataTypes.STRING(255),
    },
    city: {
      type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Cities;
