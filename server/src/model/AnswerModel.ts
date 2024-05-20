import { Model, DataTypes } from "sequelize";
import db from "../config/database.config";
import QuestionInstance from "./QuestionModel";

interface AnswerAttributes {
  id: string;
  questionId: string;
  answerOption: string;
  isCorrect: boolean;
}

class AnswerInstance extends Model<AnswerAttributes> {
  public id!: string;
  public questionId!: string;
  public answerOption!: string;
  public isCorrect!: boolean;
}

AnswerInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      autoIncrement: false,
      primaryKey: true,
    },
    questionId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    answerOption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    freezeTableName: true,
    tableName: "answers",
  },
);

AnswerInstance.belongsTo(QuestionInstance, {
  foreignKey: "questionId",
  as: "belongsToQuestion",
});

export default AnswerInstance;
