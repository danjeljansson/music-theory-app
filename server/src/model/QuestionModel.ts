import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import AnswerInstance from "./AnswerModel";

interface QuestionAttributes {
  id: string;
  question: string;
}

class QuestionInstance extends Model<QuestionAttributes> {
  public id!: string;
  public question!: string;
  public readonly answers?: AnswerInstance[];
}

QuestionInstance.init(
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
  },
  {
    sequelize: db,
    freezeTableName: true,
    modelName: "question",
  },
);

export default QuestionInstance;
