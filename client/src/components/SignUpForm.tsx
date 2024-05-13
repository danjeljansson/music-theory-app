import SignUpModal, { SignUpModalProps } from "../modals/SignUpModal";
import { useState } from "react";

const SignUpForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button onClick={openModal}>SignUp</button>
      <SignUpModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default SignUpForm;
