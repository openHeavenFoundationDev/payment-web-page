import React, { ChangeEvent } from "react";
import { InputMoneyProps } from "@/interfaces/InputMoneyProps";

const InputMoney: React.FC<InputMoneyProps> = ({
  currency,
  getNumberValue,
}) => {
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    getNumberValue(value);
  };

  return (
    <div className="bg-white border border-white text-black rounded-xl flex px-3 py-2 w-64">
      <p className="mr-2">{currency}</p>
      <input
        type="number"
        placeholder="0"
        className="outline-none w-full"
        onChange={changeHandler}
      />
    </div>
  );
};

export default InputMoney;
