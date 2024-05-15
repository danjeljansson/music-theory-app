import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartButton from "./components/StartQuiz";
import QuizCard from "./components/QuizCard";
import GoHome from "./components/Home.tsx";
import Login from "./components/Login.tsx";
import SignUpForm from "./components/SignUp.tsx";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

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
              <Login />
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
