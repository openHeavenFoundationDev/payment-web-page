import React, { ChangeEvent } from "react";
import { InputStringProps } from "@/interfaces/InputStringProps";

const InputString: React.FC<InputStringProps> = ({ id, name, type, placeholder, getStringValue }) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    getStringValue(value);
  };

  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className="border border-white text-black text-sm font-semibold rounded-xl outline-none px-3 py-2 w-64"
      onChange={changeHandler}
    />
  );
};

export default InputString;
