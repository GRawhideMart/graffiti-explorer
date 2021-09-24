// Even if in the MVP there will be one user, she cannot be hardcoded because there has to be a way to track the favorites

const { DataTypes } = require("sequelize");
const db = require("../config/db.config");
const bcrypt = require("bcrypt");

const Users = db.define("User", {
  username: {
    type: DataTypes.STRING(255),
  },
  email: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING,
  },
});

Users.beforeCreate("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = Users;
