import { useNavigate } from "react-router-dom";

const StartQuiz = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    // Navigate to the first question; URL pattern is /q/1
    navigate("/q/1");
  };

  return <button onClick={handleStartQuiz}>Start Quiz</button>;
};

export default StartQuiz;
