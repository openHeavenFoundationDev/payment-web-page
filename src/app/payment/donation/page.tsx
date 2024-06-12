"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormTx3 from "../_components/FormTx3";
import Loading from "../_components/Loading";
import generateOrderId from "@/utils/generateOrderId";
import splitName from "@/utils/splitName";

interface DonationProps {}

interface DataTx3 {
  item: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  orderId: string;
  grossAmount: number;
}

const typeTx = "Merchandise";
const label = "Merchandise";

const Donation: React.FC<DonationProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [transactionData, setTransactionData] = useState<DataTx3>({
    orderId: "",
    item: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    grossAmount: 0,
  });

  const handleItem = (item: string) => {
    console.log(item);
    setTransactionData((prevData) => ({
      ...prevData,
      item: item,
    }));
  };

  const handleName = (name: string) => {
    setTransactionData((prevData) => ({
      ...prevData,
      name: name,
    }));
  };

  const handleAddress = (address: string) => {
    setTransactionData((prevData) => ({
      ...prevData,
      address: address,
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
    if (
      transactionData.item === "" ||
      transactionData.name === "" ||
      transactionData.email === "" ||
      transactionData.phoneNumber === "" ||
      transactionData.address === ""
    ) {
      console.log(
        `item: ${transactionData.item} ; name: ${transactionData.name} ; email: ${transactionData.email} ; phoneNumber: ${transactionData.phoneNumber} ; address: ${transactionData.address}`
      );
      return;
    }

    setLoading(false);

    try {
      const orderId = generateOrderId(typeTx.toUpperCase());
      setTransactionData((prevData) => ({
        ...prevData,
        orderId: orderId,
      }));

      const grossAmount =
        transactionData.item === "Topi"
          ? 50000
          : transactionData.item === "T-Shirt S" ||
            transactionData.item === "T-Shirt M"
          ? 100000
          : 110000;

      setTransactionData((prevData) => ({
        ...prevData,
        grossAmount: grossAmount,
      }));

      const { firstName, lastName } = splitName(transactionData.name);

      const body = {
        txType: typeTx.toLowerCase(),
        orderId: orderId,
        item: transactionData.item,
        firstName: firstName,
        lastName: lastName,
        email: transactionData.email,
        phoneNumber: transactionData.phoneNumber,
        address: transactionData.address,
        grossAmount: grossAmount,
      };

      const response = await fetch(`/api/payment/tx2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const log: { route: string; line: number; message: string } = {
          route: "/payment/Donation",
          line: 50,
          message: "Something went wrong, failed to fetch data to midtrans.",
        };
        console.error(log);
        router.push("/error/page");
      } else {
        const payload = await response.json();
        const paymentUrl = payload.data.redirect_url;
        handleSendEmail(paymentUrl, orderId, grossAmount);
      }
    } catch (error) {
      const log = {
        route: "/payment/Donation",
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

  const handleSendEmail = async (paymentUrl: string, orderId: string, grossAmount: number) => {
    try {
      const body = {
        name: transactionData.name,
        email: transactionData.email,
        grossAmount: grossAmount,
        orderId: orderId,
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
        route: "/payment/Donation",
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
        <FormTx3
          label={label}
          getItem={handleItem}
          getName={handleName}
          getEmail={handleEmail}
          getPhoneNumber={handlePhoneNumber}
          getAddress={handleAddress}
          onClick={handleTx}
        />
      )}
      {!loading && <Loading />}
    </div>
  );
};

export default Donation;
