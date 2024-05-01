import { useNavigate } from "react-router-dom";

const StartQuiz = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/q/1");
  };

  return <button onClick={handleStartQuiz}>Start Quiz</button>;
};

export default StartQuiz;
