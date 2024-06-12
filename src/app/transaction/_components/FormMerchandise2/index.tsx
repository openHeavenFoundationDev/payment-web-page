"use client"; // This tells Next.js that this is a client-side component

import React from "react";
import Image from "next/image";
import Title from "../_childComponents/Title";
import InputString from "../_childComponents/InputString";
import ButtonSubmit from "../_childComponents/ButtonSubmit";

interface FormMerchandise2Props {
  label: string;
  getName: (value: string) => void;
  getEmail: (value: string) => void;
  getPhoneNumber: (value: string) => void;
  getAddress: (value: string) => void;
  onClick: () => void;
}

const FormMerchandise2: React.FC<FormMerchandise2Props> = ({
  label,
  getName,
  getEmail,
  getPhoneNumber,
  getAddress,
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
            width={75}
            height={100}
            alt="Open Heaven Foundation Logo"
          />
        </div>

        <div className="mb-4">
          <InputString
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Nama Lengkap"
            getStringValue={(e) => {
              getName(e);
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

        <div className="mb-4">
          <InputString
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="No HP / WA"
            getStringValue={(e) => {
              getPhoneNumber(e);
            }}
          />
        </div>

        <div className="mb-6">
          <InputString
            id="address"
            name="address"
            type="text"
            placeholder="Alamat Pengiriman"
            getStringValue={(e) => {
              getAddress(e);
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

export default FormMerchandise2;
