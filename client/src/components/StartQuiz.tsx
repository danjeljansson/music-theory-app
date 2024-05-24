import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QuestionData } from "../types/types";

interface StartQuizProps {
  onFetchQuestion: (questionData: QuestionData) => void;
}

const StartQuiz: React.FC<StartQuizProps> = ({ onFetchQuestion }) => {
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    try {
      const response = await axios.get<QuestionData>(
        "http://localhost:3000/api/quiz",
      );
      onFetchQuestion(response.data);
      navigate("/api/quiz/");
    } catch (error) {
      console.error("Error fetching random question:", error);
    }
  };

  return (
    <div>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default StartQuiz;
