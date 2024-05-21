import React, { useState } from "react";
import axios from "axios";
import ErrorModal from "../modals/ErrorModal";
import Cookies from "js-cookie";

export interface LoginProps {
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string,
  ) => void;
}

const Login: React.FunctionComponent<LoginProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      const response = await axios.post<{ token: string }>(
        "http://localhost:3000/api/login",
        { username, password },
      );
      const token = response.data.token;
      Cookies.set("authToken", token, { expires: 1 });
      console.log("Username: ", username);
      console.log("Password: ", password);
      console.log("Response: ", response);
      onSubmit(event, username, password);
    } catch (error) {
      console.error("Error: ", error);
      setErrorMessage("Login failed");
      setIsErrorModalOpen(true);
    }
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => handleLogin(event)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <ErrorModal
        isOpen={isErrorModalOpen}
        onRequestClose={handleCloseErrorModal}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Login;
