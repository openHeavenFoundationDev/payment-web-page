"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTx1 } from "@/interfaces/DataTx1";
import FormPayment1 from "../_components/FormTx1";
import generateOrderId from "@/utils/generateOrderId";

interface DonationProps {}

const typeTx = "Tithe";
const currency = "IDR";

const Donation: React.FC<DonationProps> = () => {
  const router = useRouter();
  const [transactionData, setTransactionData] = useState<DataTx1>({
    name: "",
    amount: 0,
  });

  const handleName = (name: string) => {
    setTransactionData((prevData) => ({
      ...prevData,
      name: name,
    }));
  };

  const handleAmount = (amount: number) => {
    setTransactionData((prevData) => ({
      ...prevData,
      amount: amount,
    }));
  };

  const handleTx = async () => {
    try {
      const body = {
        txType: typeTx.toLowerCase(),
        orderId: generateOrderId(typeTx.toUpperCase()),
        name: transactionData.name,
        grossAmount: transactionData.amount,
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
          route: "/payment/donation",
          line: 50,
          message: "Something went wrong, failed to fetch data to midtrans.",
        };
        console.error(log);
        router.push("/error/page");
      } else {
        const payload = await response.json();
        const paymentUrl = payload.data.redirect_url;
        router.push(paymentUrl);
      }
    } catch (error) {
      const log = {
        route: "/payment/donation",
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
      <FormPayment1
        label={typeTx}
        currency={currency}
        getStringValue={handleName}
        getNumberValue={handleAmount}
        onClick={handleTx}
      />
    </div>
  );
};

export default Donation;
