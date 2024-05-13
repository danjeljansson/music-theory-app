import React from "react";
import ReactModal from "react-modal";

interface SignUpModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
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
    ReactModal__Overlay: "transition: opacity 2000ms ease-in-out",
    ReactModal_OverlayAfterOpen: "opacity: 1",
    ReactModal__OverlayBeforeClose: "opacity: 0",
    textColor: "black",
    backgroundColor: "grey",
  },
};
const SignUpModal: React.FunctionComponent<SignUpModalProps> = ({
  isOpen: isOpen,
  onRequestClose: onRequestClose,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="SignUpForm Modal"
    >
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-300">SignUp Here!</h1>
        <form className="flex-col bg-amber-600">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <button type="submit">SignUp</button>
        </form>
      </div>
    </ReactModal>
  );
};

export default SignUpModal;
