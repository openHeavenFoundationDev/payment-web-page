"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "../_components/Carousel";
import ModalOption from "../_components/ModalOption";

const waPsKevin = "https://api.whatsapp.com/send/?phone=6285156326343";
const mapCabangBali =
  "https://www.google.com/maps/@-8.684978,115.191756,3a,75y,135.64h,82.39t/data=!3m7!1e1!3m5!1stshoeXzlFXy9Y7ZocBveTg!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fpanoid%3DtshoeXzlFXy9Y7ZocBveTg%26cb_client%3Dmaps_sv.share%26w%3D900%26h%3D600%26yaw%3D135.636870919836%26pitch%3D7.613171239176609%26thumbfov%3D90!7i16384!8i8192?coh=205410&entry=ttu";
const mapSorong =
  "https://www.google.com/maps/@-0.9016933,131.3164105,52m/data=!3m1!1e3?entry=ttu";
const gdAkta =
  "https://drive.google.com/file/d/1jydoLv20Oh8-FfGxsC1aE3E4aa9UtEsv/view?usp=sharing";
const gdSK =
  "https://drive.google.com/file/d/1Th1PfwnmmewdyvZzyt9hVNtw1Kw91BDi/view?usp=sharing";
const gdNpwp =
  "https://drive.google.com/file/d/18LbOm1Qyne1F-jCtr3AOMM5c9brUCChd/view?usp=sharing";

const imagePaths = [
  "/sorong0.jpg",
  "/sorong1.jpg",
  "/sorong2.jpg",
  "/sorong3.jpg",
  "/sorong4.jpg",
  "/sorong5.jpg",
  "/sorong6.jpg",
];

const Donation: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const closeModalHandler = () => {
    setModalVisible(false);
  };

  const clickHandler = () => {
    setModalVisible(true);
  };

  return (
    <div className="bg-white text-white flex flex-col justify-between min-h-screen">
      <div>
        {/* PAGE TITLE */}
        <div className="bg-black xl:flex justify-center items-center gap-4 w-full p-6">
          <div className="flex justify-center items-center mb-2">
            <Image
              src="/logo.png"
              alt="Open Heaven Logo"
              width={100}
              height={150}
            />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Open Heaven Foundation Donation
          </h1>
        </div>

        {/* CONTENT-MD-SM */}
        <div className="block xl:hidden p-2">
          <div className="bg-indigo-800 p-4">
            <div className="grid grid-cols-1">
              <div className="flex flex-col justify-between items-center text-sm">
                <div className="mb-2">
                  {/* INTRO */}
                  <div className="text-center mb-4">
                    <h1 className="text-yellow-400 text-xl md:text-2xl font-bold mb-2">
                      Yayasan Open Heaven Cabang Sorong Papua
                    </h1>
                    <p>
                      Yayasan Tingkap Langit Efrata (Open Heaven Foundation)
                      telah bermitra dengan para aktivis Rumah Cinta untuk
                      mendukung program-program kemanusiaan dalam bidang
                      pendidikan, kesehatan, dan bantuan sosial di kota Sorong,
                      Papua.
                    </p>
                  </div>
                  <div className="mb-4">
                    <Carousel images={imagePaths} />
                  </div>
                  {/* PROJECT DESC */}
                  <div className="mb-4">
                    <h2 className="text-yellow-400 md:text-lg font-bold mb-1">
                      Proyek yang Membutuhkan Dukungan Anda
                    </h2>
                    <ol>
                      <li className="mb-1">
                        <h3 className="md:text-lg font-semibold">
                          1. Rumah Singgah Anak-Anak
                        </h3>
                        <p className="ml-5">
                          Meningkatkan fasilitas dan bantuan keuangan untuk 6
                          rumah singgah yang menampung lebih dari 268 anak tidak
                          mampu di Sorong, Papua.
                        </p>
                      </li>
                      <li>
                        <h3 className="md:text-lg font-semibold">
                          2. Perpustakaan
                        </h3>
                        <p className="ml-5">
                          Pengadaan fasilitas perpustakaan gratis bagi anak-anak
                          di rumah singgah dan juga komunitas lokal Rumah Cinta.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
                <button
                  className="bg-yellow-500 rounded-xl text-indigo-800 py-2 text-lg font-semibold w-full hover:font-bold hover:bg-yellow-400"
                  onClick={clickHandler}
                >
                  Donasi Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT-SM-MD */}
        <div className="hidden xl:block p-6">
          <div className="bg-indigo-800">
            <div className="grid grid-cols-2">
              <div className="flex flex-col justify-between items-center text-sm p-6">
                <div>
                  {/* INTRO */}
                  <div className="mb-4">
                    <h1 className="text-yellow-400 text-xl xl:text-2xl font-bold mb-1">
                      Yayasan Open Heaven Cabang Sorong Papua
                    </h1>
                    <p>
                      Yayasan Tingkap Langit Efrata (Open Heaven Foundation)
                      telah bermitra dengan para aktivis Rumah Cinta untuk
                      mendukung program-program kemanusiaan dalam bidang
                      pendidikan, kesehatan, dan bantuan sosial di kota Sorong,
                      Papua.
                    </p>
                  </div>
                  {/* PROJECT DESC */}
                  <div className="mb-4">
                    <h2 className="text-yellow-400 xl:text-lg font-bold mb-1">
                      Proyek yang Membutuhkan Dukungan Anda
                    </h2>
                    <ol>
                      <li className="mb-1">
                        <h3 className="xl:text-lg font-semibold">
                          1. Rumah Singgah Anak-Anak
                        </h3>
                        <p className="ml-5">
                          Meningkatkan fasilitas dan bantuan keuangan untuk 6
                          rumah singgah yang menampung lebih dari 268 anak tidak
                          mampu di Sorong, Papua.
                        </p>
                      </li>
                      <li>
                        <h3 className="xl:text-lg font-semibold">
                          2. Perpustakaan
                        </h3>
                        <p className="ml-5">
                          Pengadaan fasilitas perpustakaan gratis bagi anak-anak
                          di rumah singgah dan juga komunitas lokal Rumah Cinta.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
                <button
                  className="bg-yellow-500 rounded-xl text-indigo-800 py-2 text-lg font-semibold w-full hover:font-bold hover:bg-yellow-400"
                  onClick={clickHandler}
                >
                  Donasi Sekarang
                </button>
              </div>
              <div className="p-6">
                <Carousel images={imagePaths} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalOption
        isVisible={modalVisible}
        closeModal={() => {
          closeModalHandler();
        }}
      />

      {/* -----FOOTER----- */}
      <footer className="bg-black font-semibold text-white text-center text-sm md:text-md p-6">
        <Link
          href={waPsKevin}
          target="_blank"
          className="flex justify-center items-center hover:text-yellow-500 mb-5"
        >
          <Image
            src="/callcenter.png"
            alt="Map"
            width={21}
            height={21}
            className="mr-2 rounded-full"
          />
          <p>
            Contact Admin
          </p>
        </Link>
        <Link
          href={mapCabangBali}
          target="_blank"
          className="flex justify-center items-center hover:text-yellow-500 mb-5"
        >
          <Image
            src="/map.png"
            alt="Map"
            width={21}
            height={21}
            className="mr-2"
          />
          <p>
            Kantor Cabang Bali: Jl.Kertapura Gg.Segina No.25 Pemecutan Klod
            Denpasar
          </p>
        </Link>
        <Link
          href={mapSorong}
          target="_blank"
          className="flex justify-center items-center hover:text-yellow-400 mb-5"
        >
          <Image
            src="/map.png"
            alt="Map"
            width={21}
            height={21}
            className="mr-2"
          />
          <p>
            Kantor Yayasan Cabang Papua: Jl. Malibela KM 11 Kota Sorong Papua
            Barat Daya
          </p>
        </Link>
        <Link
          href={gdAkta}
          target="_blank"
          className="flex justify-center items-center hover:text-yellow-400 mb-5"
        >
          <p>
            Akta Pendirian Oleh Yupi Nurlia Dewi, S.H., M.Kn. No.5 - 05 Januari
            2023
          </p>
        </Link>
        <Link
          href={gdSK}
          target="_blank"
          className="flex justify-center items-center hover:text-yellow-400 mb-5"
        >
          <p>SK Kemenkeuham: AHU-0000500.AH.01.04.2023</p>
        </Link>
        <Link
          href={gdNpwp}
          target="_blank"
          className="flex justify-center items-center hover:text-yellow-400 mb-5"
        >
          <p>NPWP: 62.369.514.5-951.001</p>
        </Link>
        <p>&copy; 2024 Open Heaven Foundation, All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Donation;
