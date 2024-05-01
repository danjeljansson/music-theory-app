import React, { useEffect, useState } from "react";
import data from "../db/db.json";
import { useParams } from "react-router-dom";

interface HandleQuestionProps {
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
  const [quizData, setQuizData] = useState<HandleQuestionProps[] | null>(null);

  useEffect(() => {
    const foundData = data.find((d) => d.id === parseInt(id!, 10));
    console.log("Found data based on ID:", foundData);
    setQuizData(foundData ? [foundData] : null);
  }, [id]);

  if (!quizData) return <div>Loading or question not found...</div>;

  const HandleQuestion: React.FC<HandleQuestionProps> = ({
    question,
    answers,
    correctAnswer,
    onAnswerSelected,
  }) => {
    return (
      <div>
        <p>{question}</p>
        <div>
          {answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() =>
                onAnswerSelected({
                  question,
                  answer: answer.text,
                  correct: answer.text === correctAnswer,
                  correctAnswer,
                })
              }
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    );
  };
};

export default HandleQuestion;
