"use client"; // This tells Next.js that this is a client-side component

import React from "react";
import Image from "next/image";
import Title from "../_childComponents/Title";
import InputString from "../_childComponents/InputString";
import InputMoney from "../_childComponents/InputMoney";
import ButtonSubmit from "../_childComponents/ButtonSubmit";

interface FormTx1Props {
  label: string;
  currency: string;
  getStringValue: (value: string) => void;
  getNumberValue: (value: number) => void;
  onClick: () => void;
}

const FormTx1: React.FC<FormTx1Props> = ({
  label,
  currency,
  getStringValue,
  getNumberValue,
  onClick,
}) => {
  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center justify-center">
      <div className="border border-white rounded-xl flex flex-col items-center justify-center p-6">
        <div className="mb-4">
          <Title label={label} />
        </div>

        <div className="mb-6">
          <Image
            src="/logo.png"
            width={150}
            height={200}
            alt="Open Heaven Foundation Logo"
          />
        </div>

        <div className="mb-4">
          <InputString
            id="name"
            name="name"
            type="text"
            placeholder="Your Name (Optional)"
            getStringValue={(e) => {
              getStringValue(e);
            }}
          />
        </div>

        <div className="mb-6">
          <InputMoney
            currency={currency}
            getNumberValue={(e) => {
              getNumberValue(e);
            }}
          />
        </div>

        <div>
          <ButtonSubmit onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default FormTx1;
