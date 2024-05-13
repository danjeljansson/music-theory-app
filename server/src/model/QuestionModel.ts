import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import AnswerModel from "./AnswerModel";
import Sequelize from "sequelize";

interface QuestionAttributes {
  id: string;
  question: string;
}

class QuestionInstance extends Model<QuestionAttributes> {
  public id!: string;
  public question!: string;
  answer?: AnswerModel[];

  public getAnswers!: Sequelize.HasManyGetAssociationsMixin<AnswerModel>;
  public addAnswer!: Sequelize.HasManyAddAssociationMixin<AnswerModel, string>;
  public hasAnswer!: Sequelize.HasManyHasAssociationMixin<AnswerModel, string>;
  public countAnswers!: Sequelize.HasManyCountAssociationsMixin;
  public createAnswer!: Sequelize.HasManyCreateAssociationMixin<AnswerModel>;
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
