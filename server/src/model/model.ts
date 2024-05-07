import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";

interface QuizAttributes {
  id: string;
  question: string;
  answer: string;
}

class QuizInstance extends Model<QuizAttributes> {}

QuizInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: false,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    freezeTableName: true,
    modelName: "Quiz",
  },
);

export default QuizInstance;
