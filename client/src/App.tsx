import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartButton from "./components/StartQuiz";
import QuizCard from "./components/QuizCard";
import GoHome from "./components/Home.tsx";
import LoginForm from "./components/LoginForm.tsx";
import SignUpForm from "./components/SignUpForm.tsx";

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
              <LoginForm />
              <SignUpForm />
            </div>
          }
        />
        <Route path="/q/:id" element={<QuizCard />} />
      </Routes>
    </Router>
  );
}

export default App;
