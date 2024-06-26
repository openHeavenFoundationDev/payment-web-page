import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";
import errorLog from "@/utils/errorLog";

export async function POST(request) {
  try {
    // Read the body data
    const {
      orderId,
      item,
      qty,
      price,
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      grossAmount,
    } = await request.json();

    // Set midtrans key
    const server_key = process.env.NEXT_PUBLIC_SERVER_KEY_1;
    const client_key = process.env.NEXT_PUBLIC_CLIENT_KEY_1;

    // Midtrans client config
    const snap = new midtransClient.Snap({
      isProduction: false, // Sandbox
      // isProduction: true, // Production
      serverKey: server_key,
      clientKey: client_key,
    });

    // Parameter config
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: grossAmount,
      },
      item_details: [
        {
          id: orderId,
          price: grossAmount,
          quantity: 1,
          name: item,
          brand: "local",
          category: "clothes",
          merchant_name: "OH",
          url: "https://foundationopenheaven.vercel.app",
        },
      ],
      customer_details: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phoneNumber,
        billing_address: {
          first_name: firstName,
          last_name: lastName,
          phone: phoneNumber,
          address: address,
          city: "",
          postal_code: "",
          country_code: "IDN",
        },
        shipping_address: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phoneNumber,
          address: address,
          city: "",
          postal_code: "",
          country_code: "IDN",
        },
      },
      // callbacks: {
      //   finish: `https://open-heaven-foundation.vercel.app/thankyou/${typeTx}`,
      //   error: `https://open-heaven-foundation.vercel.app/error/${typeTx}`,
      // },
    };

    // Create midtrans transaction
    const transaction = await snap.createTransaction(parameter);

    // return a success log which has token and url transaction
    return NextResponse.json({
      route: "/api/payment/tx2",
      status: 200,
      message: "The transaction has been generated.",
      data: transaction,
    });
  } catch (error) {
    // If the system or server error then return an error log
    const log = {
      route: "/api/payment/tx2",
      status: 500,
      message: error.message.trim(),
    };
    errorLog(log);
    return NextResponse.json(log);
  }
}
