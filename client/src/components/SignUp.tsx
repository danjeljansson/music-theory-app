import { useState } from "react";
import SignUpModal from "../modals/SignUpModal";
import ErrorModal from "../modals/ErrorModal.tsx";

const SignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openErrorModal = (message: string) => {
    setIsErrorModalOpen(true);
    setErrorMessage(message);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  console.log("isModalOpen: ", isModalOpen);

  return (
    <div>
      <button onClick={openModal}>SignUp</button>
      <SignUpModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={(username, password) => {
          if (password.length < 8) {
            openErrorModal("Password must be at least 8 characters long!");
            return;
          }
          if (!password || !username) {
            openErrorModal("Username and Password are required!");
            return;
          }
          console.log("Username: ", username);
          console.log("Password: ", password);
        }}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onRequestClose={closeErrorModal}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default SignUp;
