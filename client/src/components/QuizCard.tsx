import React, { useState, useEffect } from "react";
import data from "../db/db.json";
import { useParams } from "react-router-dom";
import NextQuestion from "./NextQuestion.tsx";
import GoHome from "./Home.tsx";

interface QuizCardProps {
  id: number;
  question: string;
  totalQuestions: number;
  correctAnswer: number;
  userAnswer: null;
  questionImage: string;
  answerOptions: { id: number; text: string }[];
}

const QuizCard: React.FC = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState<QuizCardProps[] | null>(null);

  useEffect(() => {
    const foundData = data.find((d) => d.id === parseInt(id!, 10));
    console.log("Found data based on ID:", foundData);
    setQuizData(foundData ? [foundData] : null);
  }, [id]);

  if (!quizData) return <div>Loading or question not found...</div>;

  return (
    <>
      <ul>
        {quizData.map((data: QuizCardProps) => (
          <li key={data.id}>
            <QuizCardItem
              id={data.id}
              question={data.question}
              totalQuestions={data.totalQuestions}
              correctAnswer={data.correctAnswer}
              userAnswer={data.userAnswer}
              questionImage={data.questionImage}
              answerOptions={data.answerOptions}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

const QuizCardItem = (props: QuizCardProps) => {
  const { question, answerOptions, id, questionImage, totalQuestions } = props;

  const handleAnswerClick = (
    answerOptions: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    console.log(`Answer ${answerOptions} clicked`);
    event.preventDefault();
  };

  return (
    <>
      <GoHome />
      <NextQuestion currentQuestion={id} totalQuestions={totalQuestions} />
      <div>
        <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
        <img src={questionImage} alt="Question image" className="size-20" />

        <ul>
          {answerOptions.map((answerOptions) => (
            <li key={answerOptions.id}>
              <button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleAnswerClick(answerOptions.id, event)
                }
              >
                <span
                  dangerouslySetInnerHTML={{ __html: answerOptions.text }}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuizCard;
