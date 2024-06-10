import React, { ChangeEvent } from "react";
import { InputStringProps } from "@/interfaces/InputStringProps";

const InputName: React.FC<InputStringProps> = ({ getStringValue }) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    getStringValue(value);
  };

  return (
    <input
      type="text"
      placeholder="Your Name (Optional)"
      className="border border-white text-black rounded-xl outline-none px-3 py-2 w-64"
      onChange={changeHandler}
    />
  );
};

export default InputName;
