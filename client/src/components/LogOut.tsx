import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LogOutProps {
  onLogOut: () => void;
}

const LogOut: React.FunctionComponent<LogOutProps> = ({ onLogOut }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout");
      onLogOut();
      navigate("/"); // Navigate to home after logout
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      console.log("Logged out successfully");
    }
  };

  return <button onClick={handleLogOut}>Log Out</button>;
};

export default LogOut;
