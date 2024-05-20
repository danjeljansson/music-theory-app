import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NextQuestion from "./NextQuestion.tsx";
import GoHome from "./Home.tsx";
import RandomQuiz from "./RandomQuestion.tsx";

interface AnswerOption {
  id: string;
  text: string;
}

export interface QuestionData {
  id: string;
  question: string;
  totalQuestions: number;
  correctAnswer: number;
  userAnswer: null;
  questionImage: string;
  answerOptions: AnswerOption[];
}

interface QuizCardProps {
  quizData: QuestionData;
}

const QuizCard: React.FunctionComponent<QuizCardProps> = ({ quizData }) => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get<QuizCardProps>(
          `http://localhost:3000/api/random`,
        );
        console.log("Quiz data response:", response);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setError("Failed to load quiz data");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData().then(
      () => {
        console.log("Quiz data fetched");
      },
      (error) => {
        console.error("Error fetching quiz data:", error);
        setError("Failed to load quiz data");
      },
    );
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {quizData && (
        <ul>
          <QuizCardItem
            id={quizData.id}
            question={quizData.question}
            totalQuestions={quizData.totalQuestions}
            correctAnswer={quizData.correctAnswer}
            userAnswer={quizData.userAnswer}
            questionImage={quizData.questionImage}
            answerOptions={quizData.answerOptions}
          />
        </ul>
      )}
    </>
  );
};

const QuizCardItem: React.FC<QuestionData> = ({
  question,
  answerOptions,
  id,
  questionImage,
  totalQuestions,
}) => {
  const handleAnswerClick = (
    answerOptionId: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    console.log(`Answer ${answerOptionId} clicked`);
    event.preventDefault();
  };

  return (
    <>
      <GoHome />
      <NextQuestion currentQuestion={id} totalQuestions={totalQuestions} />
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
        {questionImage && (
          <img src={questionImage} alt="Question" className="size-20" />
        )}
        <ul>
          {answerOptions.map((option) => (
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
