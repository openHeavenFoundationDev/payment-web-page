"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTx2 } from "@/interfaces/DataTx2";
import FormTx2 from "../_components/FormTx2";
import Loading from "../_components/Loading";
import generateOrderId from "@/utils/generateOrderId";

interface TheologicalSchoolProps {}

const typeTx = "STT";
const label = "Theological School Registration";
const grossAmount = 10000000;

const TheologicalSchool: React.FC<TheologicalSchoolProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [transactionData, setTransactionData] = useState<DataTx2>({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    orderId: "",
  });

  const handleName = (name: string) => {
    setTransactionData((prevData) => ({
      ...prevData,
      name: name,
    }));
  };

  const handleLastName = (lastName: string) => {
    setTransactionData((prevData) => ({
      ...prevData,
      lastName: lastName,
    }));
  };

  const handleEmail = (email: string) => {
    setTransactionData((prevData) => ({
      ...prevData,
      email: email,
    }));
  };

  const handlePhoneNumber = (phoneNumber: string) => {
    setTransactionData((prevData) => ({
      ...prevData,
      phoneNumber: phoneNumber,
    }));
  };

  const handleTx = async () => {
    setLoading(false);
    try {
      const orderId = generateOrderId(typeTx.toUpperCase());
      setTransactionData((prevData) => ({
        ...prevData,
        orderId: orderId,
      }));

      const body = {
        txType: typeTx.toLowerCase(),
        orderId: orderId,
        name: transactionData.name,
        lastName: transactionData.lastName,
        email: transactionData.email,
        phoneNumber: transactionData.phoneNumber,
        grossAmount: grossAmount,
      };

      const response = await fetch(`/api/payment/tx1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const log: { route: string; line: number; message: string } = {
          route: "/payment/TheologicalSchool",
          line: 50,
          message: "Something went wrong, failed to fetch data to midtrans.",
        };
        console.error(log);
        router.push("/error/page");
      } else {
        const payload = await response.json();
        const paymentUrl = payload.data.redirect_url;
        handleSendEmail(paymentUrl);
      }
    } catch (error) {
      const log = {
        route: "/payment/TheologicalSchool",
        line: 63,
        message: "An unknown error occurred",
      };
      if (error instanceof Error) {
        log.message = error.message;
      }
      console.error(log);
      router.push("/error/page");
    }
  };

  const handleSendEmail = async (paymentUrl: string) => {
    try {
      const body = {
        name: transactionData.name,
        email: transactionData.email,
        grossAmount: grossAmount,
        orderId: transactionData.orderId,
        paymentUrl: paymentUrl,
      };

      const response = await fetch(`/api/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const log = {
          // created_at: currentTimeStamp,
          route: "/checkout",
          line: 249,
          message: "Something went wrong, email could not be sent.",
        };
        console.error(log);
      } else {
        router.push(paymentUrl);
      }
      return;
    } catch (error) {
      const log = {
        route: "/payment/TheologicalSchool",
        line: 63,
        message: "An unknown error occurred",
      };
      if (error instanceof Error) {
        log.message = error.message;
      }
      console.error(log);
      router.push("/error/page");
    }
  };

  return (
    <div>
      {loading && (
        <FormTx2
          label={label}
          getName={handleName}
          getLastName={handleLastName}
          getEmail={handleEmail}
          getPhoneNumber={handlePhoneNumber}
          onClick={handleTx}
        />
      )}
      {!loading && <Loading />}
    </div>
  );
};

export default TheologicalSchool;
