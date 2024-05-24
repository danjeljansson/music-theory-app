import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnswerOption, QuestionData, QuizSession } from "../types/types";
import GoHome from "./Home.tsx";
// import { useParams } from "react-router-dom";
// import NextQuestion from "./NextQuestion.tsx";

interface QuizCardProps {
  quizData?: QuestionData;
}

const QuizCard: React.FunctionComponent<QuizCardProps> = () => {
  // const [question, setQuestion] = useState<QuestionData>();
  const [quizSession, setQuizSession] = useState<QuizSession>({
    currentQuestionIndex: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    questions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRandomQuestion = async () => {
      try {
        const response = await axios.get<QuestionData[]>(
          "http://localhost:3000/api/quiz",
        );
        setQuizSession({
          currentQuestionIndex: 0,
          totalQuestions: response.data.length,
          correctAnswers: 0,
          questions: response.data,
        });
        console.log("Response data:", response.data);
        // setQuestion(response.data.question);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching random question:", error);
        setError("Failed to fetch random question");
        setLoading(false);
      }
    };

    fetchRandomQuestion();
  }, []);

  //   return (
  //     <>
  //       {quizData && question && question.question && (
  //         <QuizCardItem
  //           id={question.id}
  //           question={question.question}
  //           totalQuestions={quizData.totalQuestions}
  //           correctAnswers={quizData.correctAnswers}
  //           currentQuestion={quizData.currentQuestion}
  //           answers={question.answers}
  //         />
  //       )}
  //     </>
  //   );
  // };
  //
  // const QuizCardItem: React.FunctionComponent<QuestionData & QuizSession> = ({
  //   id,
  //   question,
  //   totalQuestions,
  //   correctAnswers,
  //   answers,
  // }) => {
  //   console.log("QuizCardItem props:", {
  //     id,
  //     question,
  //     totalQuestions,
  //     correctAnswers,
  //     answers,
  //   });

  const handleAnswerClick = (isCorrect: boolean) => {
    setQuizSession((prevSession) => {
      const correctAnswers = isCorrect
        ? prevSession.correctAnswers + 1
        : prevSession.correctAnswers;
      const currentQuestionIndex = prevSession.currentQuestionIndex + 1;

      return {
        ...prevSession,
        currentQuestionIndex,
        correctAnswers,
      };
    });
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (quizSession.currentQuestionIndex >= quizSession.totalQuestions) {
    return (
      <div>
        <h2>Quiz Completed!</h2>
        <p>
          You answered {quizSession.correctAnswers} out of{" "}
          {quizSession.totalQuestions} questions correctly.
          <GoHome />
        </p>
      </div>
    );
  }

  const currentQuestion =
    quizSession.questions[quizSession.currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.answers.map((answer) => (
          <li key={answer.id}>
            <button onClick={() => handleAnswerClick(answer.isCorrect)}>
              {answer.answerOption}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAnswerClick(false)}>Next</button>
    </div>
  );
};

export default QuizCard;
