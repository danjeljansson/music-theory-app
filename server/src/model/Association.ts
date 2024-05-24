import QuestionInstance from "./QuestionModel";
import AnswerInstance from "./AnswerModel";

QuestionInstance.hasMany(AnswerInstance, {
  sourceKey: "id",
  foreignKey: "questionId",
  as: "answers",
});

AnswerInstance.belongsTo(QuestionInstance, {
  foreignKey: "questionId",
  as: "questions",
});

export { QuestionInstance, AnswerInstance };
