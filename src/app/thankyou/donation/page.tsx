import React from "react";
import Image from "next/image";

const thankyouDonation = () => {
  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center justify-center p-24">
      <Image
        src="/logo.png"
        width={150}
        height={200}
        alt="Open Heaven Foundation Logo"
        className="mb-6"
      />

      <p className="text-2xl font-bold text-center w-2/3">
        Terimakasih Anda telah membeli produk merchandise Yayasan kami sebagai
        bentuk donasi, dana penjualan merchandise kami akan salurkan untuk
        pembangunan rumah singgah serta pendidikan gratis di Sorong Papua.
      </p>
    </div>
  );
};

export default thankyouDonation;
