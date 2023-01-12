import { DataTypes } from "sequelize";
import sequelize from "./dbConnection";

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    namalengkap: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "user",
  }
);

export default User;
