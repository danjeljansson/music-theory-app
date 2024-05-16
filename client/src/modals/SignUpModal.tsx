import React, { useState } from "react";
import ReactModal from "react-modal";
import axios from "axios";

interface SignUpModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string,
  ) => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "25%",
    width: "25%",
    transform: "translate(-50%, -50%)",
  },
};

const SignUpModal: React.FunctionComponent<SignUpModalProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = axios.post("http://localhost:3000/api/register", {
        username,
        password,
      });
      onSubmit(event, username, password);
      setUsername("");
      setPassword("");
      console.log("Username: ", username);
      console.log("Password: ", password);
      console.log("Response: ", response);
      onRequestClose();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="SignUpForm Modal"
    >
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-300">SignUp Here!</h1>
        <form className="flex-col bg-amber-600" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <button type="submit">SignUp</button>
        </form>
      </div>
    </ReactModal>
  );
};

export default SignUpModal;
