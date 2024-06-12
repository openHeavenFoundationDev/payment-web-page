"use client"; // This tells Next.js that this is a client-side component

import React from "react";
import Image from "next/image";
import Title from "../_childComponents/Title";
import SelectMerchandise1 from "../_childComponents/SelectMerchandise1";
import InputString from "../_childComponents/InputString";
import ButtonSubmit from "../_childComponents/ButtonSubmit";

interface FormTx3Props {
  label: string;
  getItem: (value: string) => void;
  getName: (value: string) => void;
  getLastName: (value: string) => void;
  getEmail: (value: string) => void;
  getPhoneNumber: (value: string) => void;
  onClick: () => void;
}

const FormTx3: React.FC<FormTx3Props> = ({
  label,
  getItem,
  getName,
  getLastName,
  getEmail,
  getPhoneNumber,
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
          <SelectMerchandise1
            getItemValue={(e) => {
              getItem(e);
            }}
          />
        </div>

        <div className="mb-4">
          <InputString
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            getStringValue={(e) => {
              getName(e);
            }}
          />
        </div>

        <div className="mb-4">
          <InputString
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            getStringValue={(e) => {
              getLastName(e);
            }}
          />
        </div>

        <div className="mb-4">
          <InputString
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            getStringValue={(e) => {
              getEmail(e);
            }}
          />
        </div>

        <div className="mb-6">
          <InputString
            id="phonenumber"
            name="phonenumber"
            type="text"
            placeholder="PhoneNumber"
            getStringValue={(e) => {
              getPhoneNumber(e);
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

export default FormTx3;
