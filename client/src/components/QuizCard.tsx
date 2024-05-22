import React, { useEffect, useState } from "react";
import axios from "axios";
import { AnswerOption, QuestionData } from "../types/types";
// import { useParams } from "react-router-dom";

interface QuizCardProps {
  quizData?: QuestionData;
}

const QuizCard: React.FunctionComponent<QuizCardProps> = ({ quizData }) => {
  const [question, setQuestion] = useState<QuestionData>();
  // const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomQuestion = async () => {
      try {
        const response = await axios.get<{
          question: QuestionData;
        }>("http://localhost:3000/api/random");
        console.log("Response data:", response.data);
        setQuestion(response.data.question);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching random question:", error);
        setError("Failed to fetch random question");
        setLoading(false);
      }
    };

    fetchRandomQuestion();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {quizData && question && question.question && (
        <QuizCardItem
          id={quizData.id}
          question={quizData.question}
          // totalQuestions={quizSession.totalQuestions}
          // correctAnswers={quizSession.correctAnswers}
          // currentQuestion={quizSession.currentQuestion}
          answers={quizData.answers}
        />
      )}
    </>
  );
};

const QuizCardItem: React.FunctionComponent<QuestionData> = ({
  id,
  question,
  // totalQuestions,
  // correctAnswers,
  // currentQuestion,
  answers,
}) => {
  console.log("QuizCardItem props:", {
    id,
    question,
    // totalQuestions,
    // correctAnswers,
    // currentQuestion,
    answers,
  });

  const handleAnswerClick = (
    answerOptionId: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    console.log("Answer clicked:", answerOptionId);
    event.preventDefault();
  };

  return (
    <>
      {/*<NextQuestion currentQuestion={id} totalQuestions={totalQuestions} />*/}
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
        <ul>
          {answers.map((option: AnswerOption) => (
            <li key={option.id}>
              <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleAnswerClick(option.id, event)
                }
              >
                {option.answerOption}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuizCard;
