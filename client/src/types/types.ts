export interface AnswerOption {
  id: string;
  text: string;
}

export interface QuestionData {
  id: string;
  question: string;
  totalQuestions: number;
  correctAnswer: boolean;
  userAnswer: string | null;
  questionImage: string;
  answerOptions: AnswerOption[];
}
