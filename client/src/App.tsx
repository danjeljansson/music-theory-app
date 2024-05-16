import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import StartButton from "./components/StartQuiz";
import QuizCard from "./components/QuizCard";
import GoHome from "./components/Home.tsx";
import Login from "./components/Login.tsx";
import SignUpForm from "./components/SignUp.tsx";
import ReactModal from "react-modal";
import { useState } from "react";
ReactModal.setAppElement("#root");

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
              {!isLoggedIn && <Login onSubmit={() => setIsLoggedIn(true)} />}
              <SignUpForm />
            </div>
          }
        />
        <Route
          path="/q/:id"
          element={isLoggedIn ? <QuizCard /> : <Navigate to="" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
