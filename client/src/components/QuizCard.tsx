import React from "react";
import { useState, useEffect } from "react";
import data from "../db/db.json";
import { useParams } from "react-router-dom";
import NextQuestion from "./NextQuestion.tsx";

interface QuizCardProps {
  id: number;
  question: string;
  answer: number;
  questionImage: string;
  answerOptions: { id: number; text: string }[];
  totalQuestions: number;
  // userAnswer: number;
}

const QuizCard: React.FC = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState<QuizCardProps[] | null>(null);

  useEffect(() => {
    const foundData = data.find((d) => d.id === parseInt(id!));
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
              answer={data.answer}
              id={data.id}
              answerOptions={data.answerOptions}
              question={data.question}
              questionImage={data.questionImage}
              totalQuestions={data.totalQuestions}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

const QuizCardItem = (props: QuizCardProps) => {
  const { question, answerOptions, answer, id, questionImage } = props;

  return (
    <>
      <NextQuestion currentQuestion={id} totalQuestions={data.length} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-start">
        <h2>{question}</h2>
        <img src={questionImage} alt="question image" className="size-20" />
        <ul>
          {answerOptions.map((answerOptions, index) => (
            <li key={index}>
              {id}
              {answerOptions.text}
              {answer}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default QuizCard;
