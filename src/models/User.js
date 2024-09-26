const { db, DataTypes, Model } = require("../../db/connection.js");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

module.exports = User;