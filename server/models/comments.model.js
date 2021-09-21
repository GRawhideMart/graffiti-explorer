const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Comments = db.define("Comment", {
  graffiti_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_comment: {
    type: DataTypes.BOOLEAN,
  },
  is_personal_note: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Comments;
