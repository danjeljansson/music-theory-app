import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface UserAttributes {
  id: string;
  username: string;
  password: string;
}

class UserInstance extends Model<UserAttributes> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Users",
    modelName: "User",
  },
);

export default UserInstance;
