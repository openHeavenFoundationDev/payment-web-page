import React, { ChangeEvent } from "react";

interface InputTextProps {
  id: string;
  name: string;
  placeholder: string;
  getTextValue: (value: string) => void;
}

const InputText: React.FC<InputTextProps> = ({
  id,
  name,
  placeholder,
  getTextValue,
}) => {
  const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    getTextValue(value);
  };

  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      className="border border-white text-black text-sm font-semibold rounded-xl outline-none px-3 py-2 w-64"
      onChange={changeHandler}
      rows={4}
      style={{ resize: "vertical" }}
    />
  );
};

export default InputText;
