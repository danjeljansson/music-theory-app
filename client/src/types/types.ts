export interface AnswerOption {
  id: string;
  answerOption: string;
}

export interface QuizSession {
  currentQuestion: number;
  totalQuestions: number;
  correctAnswers: number;
}

export interface QuestionData {
  id: string;
  question: string;
  answers: AnswerOption[];
}

export interface QuestionResponse {
  question: QuestionData;
  msg: string;
}

export interface NextQuestionProps {
  currentQuestion: string | number;
  totalQuestions: number;
}
