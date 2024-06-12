import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import errorLog from "@/utils/errorLog";

export async function POST(request) {
  try {
    // Read the body data
    const { typeTx, orderId, name, lastName, email, phoneNumber, grossAmount } =
      await request.json();

    // Set midtrans key
    const server_key =
      typeTx === "donation"
        ? process.env.NEXT_PUBLIC_SERVER_KEY_1
        : typeTx === "tithe" || typeTx === "offering"
        ? process.env.NEXT_PUBLIC_SERVER_KEY_2
        : process.env.NEXT_PUBLIC_SERVER_KEY_3;
    const client_key =
      typeTx === "donation"
        ? process.env.NEXT_PUBLIC_CLIENT_KEY_1
        : typeTx === "tithe" || typeTx === "offering"
        ? process.env.NEXT_PUBLIC_CLIENT_KEY_2
        : process.env.NEXT_PUBLIC_CLIENT_KEY_3;

    // Midtrans client config
    const snap = new midtransClient.Snap({
      isProduction: false, // Sandbox
      // isProduction: true, // Production
      serverKey: server_key,
      clientKey: client_key,
    });

    // Parameter config
    const parameter =
      typeTx === "donation" || typeTx === "tithe" || typeTx === "offering"
        ? {
            transaction_details: {
              order_id: orderId,
              gross_amount: grossAmount,
            },
            customer_details: {
              first_name: name,
            },
            callbacks: {
              finish: `https://open-heaven-foundation.vercel.app/thankyou/${typeTx}`,
              error: `https://open-heaven-foundation.vercel.app/error/${typeTx}`,
            },
          }
        : {
            transaction_details: {
              order_id: orderId,
              gross_amount: grossAmount,
            },
            customer_details: {
              first_name: name,
              last_name: lastName,
              email: email,
              phone_number: phoneNumber,
            },
            callbacks: {
              finish: `https://open-heaven-foundation.vercel.app/thankyou/${typeTx}`,
              error: `https://open-heaven-foundation.vercel.app/error/${typeTx}`,
            },
          };

    // Create midtrans transaction
    const transaction = await snap.createTransaction(parameter);

    // return a success log which has token and url transaction
    return NextResponse.json({
      route: "/api/payment/tx1",
      status: 200,
      message: "The transaction has been generated.",
      data: transaction,
    });
  } catch (error) {
    // If the system or server error then return an error log
    const log = {
      route: "/api/payment/tx1",
      status: 500,
      message: error.message.trim(),
    };
    errorLog(log);
    return NextResponse.json(log);
  }
}
