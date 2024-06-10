import React from "react";
import { ButtonProps } from "@/interfaces/ButtonProps";

const ButtonSubmit: React.FC<ButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      onClick();
    }
  };

  return (
    <button
      className="bg-blue-900 rounded-xl px-3 py-2 w-64 text-white font-semibold hover:bg-blue-700"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Ensure button is focusable
    >
      Submit
    </button>
  );
};

export default ButtonSubmit;
