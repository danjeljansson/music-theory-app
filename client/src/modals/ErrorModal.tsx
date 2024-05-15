import React from "react";
import ReactModal from "react-modal";

interface ErrorModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  errorMessage: string;
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

const ErrorModal: React.FunctionComponent<ErrorModalProps> = ({
  isOpen,
  onRequestClose,
  errorMessage,
}: ErrorModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Error Modal"
    >
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-300">Error!</h1>
        <p className="text-red-500">{errorMessage}</p>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </ReactModal>
  );
};

export default ErrorModal;
