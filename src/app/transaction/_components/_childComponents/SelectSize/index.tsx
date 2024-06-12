import React, { ChangeEvent } from "react";
import { SelectMerchandiseProps } from "@/interfaces/SelectMerchandiseProps";

const SelectSize: React.FC<SelectMerchandiseProps> = ({
  getItemValue,
}) => {
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    getItemValue(value);
  };

  return (
    <select
      id="merchandise1"
      name="merchandise1"
      className="border-white text-black rounded-xl font-roboto px-3 py-1.5 w-64"
      required
      onChange={changeHandler}
    >
      <option value="">Pilih Size</option>
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL">XL</option>
    </select>
  );
};

export default SelectSize;
