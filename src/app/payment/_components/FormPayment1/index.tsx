"use client"; // This tells Next.js that this is a client-side component

import React from "react";
import Image from "next/image";
import { TitleProps } from "@/interfaces/TitleProps";
import { InputStringProps } from "@/interfaces/InputStringProps";
import { InputMoneyProps } from "@/interfaces/InputMoneyProps";
import { ButtonProps } from "@/interfaces/ButtonProps";
import Title from "../_childComponents/Title";
import InputName from "../_childComponents/InputName";
import InputMoney from "../_childComponents/InputMoney";
import ButtonSubmit from "../_childComponents/ButtonSubmit";

interface formPaymentProps
  extends TitleProps,
    InputStringProps,
    InputMoneyProps,
    ButtonProps {}

const FormPayment1: React.FC<formPaymentProps> = ({
  label,
  currency,
  getStringValue,
  getNumberValue,
  onClick,
}) => {
  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center justify-center">
      <div className="border border-white rounded-xl flex flex-col items-center justify-center p-10">
        <div className="mb-4">
          <Title label={label} />
        </div>

        <div className="mb-8">
          <Image
            src="/logo.png"
            width={150}
            height={300}
            alt="Open Heaven Foundation Logo"
          />
        </div>

        <div className="mb-4">
          <InputName
            getStringValue={(e) => {
              getStringValue(e);
            }}
          />
        </div>

        <div className="mb-8">
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

export default FormPayment1;
