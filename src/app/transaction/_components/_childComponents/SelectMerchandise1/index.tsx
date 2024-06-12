import React, { ChangeEvent } from "react";
import { SelectMerchandiseProps } from "@/interfaces/SelectMerchandiseProps";

const SelectMerchandise1: React.FC<SelectMerchandiseProps> = ({ getItemValue }) => {
  const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => { // Changed from HTMLInputElement to HTMLSelectElement
    const value = e.target.value;
    getItemValue(value);
  };

  return (
    <select
      id="merchandise1"
      name="merchandise1"
      className="border-white text-black rounded-xl font-roboto px-3 py-1.5 w-full"
      required
      onChange={changeHandler}
    >
      <option value="">Pilih Merchandise</option>
      <option value="Topi">Topi Rp 50.000</option>
      <option value="T-Shirt S">T-Shirt S Rp 100.000</option>
      <option value="T-Shirt M">T-Shirt M Rp 100.000</option>
      <option value="T-Shirt L">T-Shirt L Rp 110.000</option>
      <option value="T-Shirt XL">T-Shirt XL Rp 110.000</option>
    </select>
  );
};

export default SelectMerchandise1;
