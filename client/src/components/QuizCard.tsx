import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnswerOption, QuestionData } from "../types/types";
import { useParams } from "react-router-dom";
import NextQuestion from "./NextQuestion.tsx";

interface QuizCardProps {
  quizData?: QuestionData;
}

const QuizCard: React.FunctionComponent<QuizCardProps> = () => {
  const [quizData, setQuizData] = useState<QuestionData>([]);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomQuestion = async () => {
      try {
        const response = await axios.get<QuestionData>(
          "http://localhost:3000/api/random",
        );
        console.log("Response data:", response.data);
        setQuizData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching random question:", error);
        setError("Failed to fetch random question");
        setLoading(false);
      }
    };

    fetchRandomQuestion().then(
      () => {
        console.log("Quiz data fetched");
      },
      (error) => {
        console.error("Error fetching quiz data:", error);
        setError("Failed to load quiz data");
      },
    );
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {quizData && quizData.answerOptions && (
        <QuizCardItem
          id={quizData.id}
          question={quizData.question}
          totalQuestions={quizData.totalQuestions}
          correctAnswer={quizData.correctAnswer}
          userAnswer={quizData.userAnswer}
          questionImage={quizData.questionImage}
          answerOptions={quizData.answerOptions}
        />
      )}
    </>
  );
};

const QuizCardItem: React.FunctionComponent<QuestionData> = ({
  id,
  question,
  totalQuestions,
  correctAnswer,
  userAnswer,
  questionImage,
  answerOptions,
}) => {
  console.log("QuizCardItem props:", {
    id,
    question,
    totalQuestions,
    correctAnswer,
    userAnswer,
    questionImage,
    answerOptions,
  });

  const handleAnswerClick = (
    answerOptionId: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    console.log(`Answer ${answerOptionId} clicked`);
    event.preventDefault();
  };

  return (
    <>
      <NextQuestion currentQuestion={id} totalQuestions={totalQuestions} />
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
        {questionImage && <img src={questionImage} alt="Question" />}
        <ul>
          {answerOptions.map((option: AnswerOption) => (
            <li key={option.id}>
              <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleAnswerClick(option.id, event)
                }
              >
                <span dangerouslySetInnerHTML={{ __html: option.text }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuizCard;
