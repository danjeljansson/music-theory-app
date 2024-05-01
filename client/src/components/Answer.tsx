import React, { useState } from "react";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const AnswerHandler = () => {
  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userClickedAnswer = e.currentTarget.value;
    setAnswer(userClickedAnswer);

    if (e.currentTarget.value === correctAnswer) {
      setScore(score + 1);
      setUserAnswers((prev) => [
        ...prev,
        { question, answer: userClickedAnswer, correctAnswer, correct: true },
      ]);
    } else {
      setUserAnswers((prev) => [
        ...prev,
        { question, answer: userClickedAnswer, correctAnswer, correct: false },
      ]);
    }
  };

  return (
    <>
      <div>
        <button value="True" onClick={checkAnswer}>
          True
        </button>
        <button value="False" onClick={checkAnswer}>
          False
        </button>
      </div>
    </>
  );
};
export default AnswerHandler;
