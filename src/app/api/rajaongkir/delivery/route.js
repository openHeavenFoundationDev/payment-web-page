import { NextResponse } from "next/server";

export async function POST(request) {
  const { origin, destination, weight, courier } = await request.json();

  if (destination === "null") {
    return NextResponse.json({
      status: 200,
      message: "API Ok but empty data.",
      data: null,
    });
  } else {
    try {
      const body = {
        origin: origin,
        destination: destination,
        weight: weight,
        courier: courier,
      };

      const response = await fetch("https://api.rajaongkir.com/starter/cost", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          key: "9ff3e587ccb764359a5a0fb95ff3545e", // Ganti dengan API key Anda
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      return NextResponse.json({
        status: 200,
        message: "Data Found.",
        data: data,
      });
    } catch (error) {
      // If the system or database server error then return an error log
      const log = {
        route: "/api/data/branch",
        status: 500,
        message: error.message.trim(),
      };
      return NextResponse.json(log);
    }
  }
}
