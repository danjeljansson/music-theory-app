import QuestionInstance from "./QuestionModel";
import AnswerInstance from "./AnswerModel";

QuestionInstance.hasMany(AnswerInstance, {
  sourceKey: "id",
  foreignKey: "questionId",
  as: "answers",
});

export { QuestionInstance, AnswerInstance };
