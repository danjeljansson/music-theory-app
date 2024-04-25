import React from "react";
import { useNavigate } from "react-router-dom";

interface NextQuestionProps {
  currentQuestion: number;
  totalQuestions: number;
}

const NextQuestion: React.FC<NextQuestionProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions) {
      navigate(`/q/${currentQuestion + 1}`);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleNextQuestion}
      disabled={currentQuestion >= totalQuestions}
    >
      Next Question
    </button>
  );
};

export default NextQuestion;
