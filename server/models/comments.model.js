const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Comments = db.define("Comment", {
  is_comment: {
    type: DataTypes.BOOLEAN,
  },
  is_personal_note: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Comments;
