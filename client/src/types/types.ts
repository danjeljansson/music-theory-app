export interface AnswerOption {
  id: string;
  answerOption: string;
  isCorrect: boolean;
}

export interface AnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

// export interface QuizSession {
//   currentQuestion: number;
//   totalQuestions: number;
//   correctAnswers: number;
// }

export interface QuizSession {
  currentQuestionIndex: number;
  totalQuestions: number;
  correctAnswers: number;
  questions: QuestionData[];
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
