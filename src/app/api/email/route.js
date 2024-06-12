import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
// import fs from "fs/promises";
// import path from "path";
// import Handlebars from "handlebars";
// import getTimeStamp from "@/utils/getTimeStamp";
import errorLog from "@/utils/errorLog";

// Set Time Zone from UTC to WIB or Asia/Jakarta Timezone where time difference is 7
// const timeDiff = 7;

export async function POST(request) {
  // Generate timestamp / current datetime
  // const currentTimeStamp = getTimeStamp(timeDiff);

  // Define host's email and password from environment variable
  const user = process.env.EMAIL_HOST;
  const pass = process.env.EMAIL_APP_PASS;

  // Define email template file location
  //   const fileName = "emailTemplate.html";
  //   const filePath = path.join(process.cwd(), "public", fileName);

  try {
    // Read the body data
    // const {
    //   email,
    //   subject,
    //   book_code,
    //   branch_address,
    //   booking_date,
    //   start_at,
    //   product_name,
    //   product_type,
    //   product_price,
    //   number_of_add_person,
    //   additional_person_price,
    //   number_of_add_pet,
    //   additional_pet_price,
    //   number_of_add_print5r,
    //   additional_print5r_price,
    //   number_of_add_softfile,
    //   additional_softfile_price,
    //   total_price,
    //   voucher_code,
    //   discount,
    //   total_paid_by_cust,
    //   payment_url,
    // } = await request.json();

    const { name, email, grossAmount, orderId, paymentUrl } =
      await request.json();

    // Read html file
    // const source = (await fs.readFile(filePath, "utf8")).toString();

    // Replace and insert orderBook parameter to html file
    // const template = Handlebars.compile(source);
    // const replacements = {
    //   subject: subject,
    //   email: email,
    //   book_code: book_code,
    //   branch_address: branch_address,
    //   booking_date: booking_date,
    //   start_at: start_at,
    //   product_name: product_name,
    //   product_type: product_type,
    //   product_price: product_price,
    //   number_of_add_person: number_of_add_person,
    //   additional_person_price: additional_person_price,
    //   number_of_add_pet: number_of_add_pet,
    //   additional_pet_price: additional_pet_price,
    //   number_of_add_print5r: number_of_add_print5r,
    //   additional_print5r_price: additional_print5r_price,
    //   number_of_add_softfile: number_of_add_softfile,
    //   additional_softfile_price: additional_softfile_price,
    //   total_price: total_price,
    //   voucher_code: voucher_code,
    //   discount: discount,
    //   total_paid_by_cust: total_paid_by_cust,
    //   payment_url: payment_url,
    // };

    // Get final html file
    // const html = template(replacements);

    // Transporter config
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });

    // Mail options config
    const mailOptions = {
      from: "Open Heaven Foundation",
      to: email,
      subject: "Konfirmasi Pembayaran",
      text: `Hi ${name}, pembayaran sebesar ${grossAmount} dengan order-ID ${orderId} telah berhasil. Saat ini kami sedang memproses pesanan Anda lalu akan kami kirimkan ke alamat Anda. Anda juga dapat memeriksa kembali link pembayaran anda di link berikut ini ${paymentUrl}. Terimakasih Anda telah membeli produk merchandise Yayasan kami sebagai bentuk donasi, Dana penjualan merchandise akan kami salurkan untuk kegiatan sosial seperti membagikan sembako, pemeriksaan, dan penyuluhan kesehatan.`,
      // html: html,
    };

    // Send email and get response
    const generateEmail = await transporter.sendMail(mailOptions);

    // Return success log and email response
    return NextResponse.json({
      // created_at: currentTimeStamp,
      route: "/api/email",
      status: 200,
      message: generateEmail.response,
    });
  } catch (error) {
    // If the system or server error then return an error log
    const log = {
      // created_at: currentTimeStamp,
      route: "/api/email",
      status: 500,
      message: error.message.trim(),
    };
    errorLog(log);
    return NextResponse.json(log);
  }
}
