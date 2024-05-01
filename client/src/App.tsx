import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartButton from "./components/StartQuiz";
import QuizCard from "./components/QuizCard";
import GoHome from "./components/Home.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <GoHome />
              <h1>Welcome to the Quiz</h1>
              <StartButton />
            </div>
          }
        />
        <Route path="/q/:id" element={<QuizCard />} />
      </Routes>
    </Router>
  );
}

export default App;
