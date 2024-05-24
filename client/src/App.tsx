import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { QuestionData, QuizSession } from "./types/types";
import StartQuiz from "./components/StartQuiz";
import QuizCard from "./components/QuizCard";
import Login from "./components/Login";
import LogOut from "./components/LogOut";
import PrivateRoute from "./components/PrivateRoute";
import SignUp from "./components/SignUp";
import GoHome from "./components/Home.tsx";

const App: React.FunctionComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizData, setQuizData] = useState<QuestionData>();
  const [quizSession, setQuizSession] = useState<QuizSession>({
    currentQuestion: 0,
    totalQuestions: 0,
    correctAnswers: 0,
  });

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleFetchQuestion = (questionData: QuestionData) => {
    setQuizData(questionData);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    Cookies.remove("authToken");
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <GoHome />
              <h1>Welcome to the Quiz</h1>
              <StartQuiz onFetchQuestion={handleFetchQuestion} />
              {!isLoggedIn && <Login onSubmit={handleLogin} />}
              {isLoggedIn && <LogOut onLogOut={handleLogOut} />}
              {!isLoggedIn && <SignUp />}
            </>
          }
        />
        <Route element={<PrivateRoute isLoggedIn={isLoggedIn} />}>
          <Route path="/api/quiz" element={<QuizCard quizData={quizData} />} />
        </Route>
        <Route path="/login" element={<Login onSubmit={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
