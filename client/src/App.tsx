import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartButton from "./components/StartQuiz";
import QuizCard from "./components/QuizCard";

function App() {
  return (
    <Router>
      <div>
        <h1>Welcome to the Quiz</h1>
        <StartButton /> {/* Here is your start button */}
      </div>
      <Routes>
        <Route path="/q/:id" element={<QuizCard />} />
      </Routes>
    </Router>
  );
}

export default App;
