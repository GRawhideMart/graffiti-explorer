const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Visits = db.define("Visit", {
  graffiti_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Visits;
