const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Authors = db.define(
  "Author",
  {
    // Model attributes are defined here
    author: {
      type: DataTypes.STRING(255),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Authors;
