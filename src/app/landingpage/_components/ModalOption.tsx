import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import generateOrderId from "@/utils/generateOrderId";

const typeTx = "Donation";

const linkPayment1 =
  "https://foundationopenheaven.vercel.app/transaction/merchandise1";
const linkPayment2 =
  "https://foundationopenheaven.vercel.app/transaction/merchandise2";

interface ModalOptionProps {
  closeModal: () => void;
  isVisible: boolean;
}

const ModalOption: React.FC<ModalOptionProps> = ({ closeModal, isVisible }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [amount_, setAmount_] = useState<number>(0);
  const [view, setView] = useState<number>(0);

  const clearState = () => {
    setView(0);
  };

  const handleTx = async (amount: number) => {
    setLoading(true);
    const _amount = amount === 0 ? amount_ : amount;

    try {
      const body = {
        txType: typeTx.toLowerCase(),
        orderId: generateOrderId(typeTx.toUpperCase()),
        name: "",
        grossAmount: _amount,
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
          route: "/landingpage/_components/ModalDonation",
          line: 50,
          message: "Something went wrong, failed to fetch data to midtrans.",
        };
        console.error(log);
        router.push("/error/donation");
        clearState();
      } else {
        const payload = await response.json();
        const paymentUrl = payload.data.redirect_url;
        router.push(paymentUrl);
        clearState();
      }
    } catch (error) {
      const log = {
        route: "/landingpage/_components/ModalDonation",
        line: 63,
        message: "An unknown error occurred",
      };
      if (error instanceof Error) {
        log.message = error.message;
      }
      console.error(log);
      router.push("/error/donation");
      clearState();
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    setAmount_(amount);
  };

  if (!isVisible) return null;

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-slate-300 md:bg-black md:bg-opacity-50 backdrop-blur-sm flex justify-center items-center text-2xl text-black md:text-white font-bold">
          Loading...
        </div>
      )}
      {!loading && (
        <div className="fixed inset-0 bg-slate-300 md:bg-black md:bg-opacity-50 backdrop-blur-sm flex justify-center md:items-center">
          <div className="bg-slate-300 text-indigo-950 rounded-2xl text-center md:text-start">
            <div className="flex justify-end">
              <Image
                src="/close.png"
                width={32}
                height={32}
                alt="close icon"
                className="rounded-none md:rounded-full mt-4 mr-4 md:mt-0 md:mr-0"
                onClick={() => {
                  clearState();
                  closeModal();
                }}
              />
            </div>
            <div className="pt-6 md:pb-8 px-8">
              {/* HOME */}
              {view === 0 && (
                <div>
                  <h1 className="text-2xl font-bold">Pilih Metode Donasi</h1>
                  <p className="font-semibold mb-6">
                    Anda dapat memberikan donasi dengan cara
                  </p>
                  <button
                    className=" bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => setView(1)}
                  >
                    1. Donasi Langsung
                  </button>
                  <button
                    className=" bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-6"
                    onClick={() => setView(3)}
                  >
                    2. Pembelian Merchandise
                  </button>
                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={closeModal}
                  >
                    Kembali
                  </button>
                </div>
              )}

              {/* DONASI LANGSUNG */}
              {view === 1 && (
                <div className="w-80">
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => {
                      handleTx(50000);
                    }}
                  >
                    Donasi Rp 50.000
                  </button>
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => {
                      handleTx(100000);
                    }}
                  >
                    Donasi Rp 100.000
                  </button>
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => {
                      handleTx(250000);
                    }}
                  >
                    Donasi Rp 250.000
                  </button>
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => {
                      handleTx(500000);
                    }}
                  >
                    Donasi Rp 500.000
                  </button>
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => {
                      handleTx(1000000);
                    }}
                  >
                    Donasi Rp 1000.000
                  </button>
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-8"
                    onClick={() => setView(2)}
                  >
                    Masukan Nominal Donasi
                  </button>
                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={() => setView(0)}
                  >
                    Kembali
                  </button>
                </div>
              )}

              {/* DONASI MASUKAN NOMINAL */}
              {view === 2 && (
                <div>
                  <div className="border-2 border-indigo-950 rounded-xl p-3 mb-6">
                    <input
                      type="number"
                      placeholder="Rp 0"
                      className="bg-slate-300 border border-indigo-950 text-indigo-950 px-3 py-2 font-semibold w-full outline-none rounded-xl mb-3"
                      onChange={changeHandler}
                    />
                    <button
                      className=" bg-yellow-500 rounded-xl text-indigo-950 px-3 py-2 font-semibold w-full hover:bg-yellow-400"
                      onClick={() => handleTx(0)}
                    >
                      Submit
                    </button>
                  </div>

                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={() => setView(1)}
                  >
                    Kembali
                  </button>
                </div>
              )}

              {/* MERCHANDISE */}
              {view === 3 && (
                <div className="overflow-auto max-h-screen md:max-h-none">
                  <div className="md:grid md:grid-cols-2 text-white text-start gap-6 mb-6">
                    <div className="bg-indigo-950 rounded-3xl flex flex-col justify-between text-xs font-semibold w-80 h-80 p-4 mb-4 md:mb-0">
                      <div>
                        <div className="flex justify-start items-center gap-4 mb-4">
                          <Image
                            src="/merchandise-tshirt.png"
                            width={100}
                            height={100}
                            alt="Merchandise T-Shirt Open Heaven"
                            className="rounded-xl"
                          />
                          <div>
                            <h1 className="text-yellow-400 font-bold text-sm mb-1">
                              Casual T-Shirt
                            </h1>
                            <div>
                              <p>Harga: Rp 150.000</p>
                              <p>Bahan: Katun</p>
                              <p>Warna: Hitam</p>
                              <p>Size: S, M, L, XL</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-yellow-400 text-sm font-bold mb-1">
                          Description:
                        </p>
                        <p>
                          T-shirt Casual Comfort ini adalah pilihan sempurna
                          untuk kenyamanan sehari-hari dapat digunakan di acara
                          casual. Terbuat dari bahan katun premium yang lembut
                          di kulit.
                        </p>
                      </div>
                      <div>
                        <button className="bg-yellow-500 rounded-xl text-indigo-950 py-2 text-sm font-bold w-full hover:bg-yellow-400">
                          Pesan Sekarang
                        </button>
                      </div>
                    </div>
                    <div className="bg-indigo-950 rounded-3xl flex flex-col justify-between text-xs font-semibold w-80 h-80 p-4">
                      <div>
                        <div className="flex justify-start items-center gap-4 mb-4">
                          <Image
                            src="/merchandise-hat.png"
                            width={100}
                            height={100}
                            alt="Merchandise Hat Walk by Faith"
                            className="rounded-xl"
                          />
                          <div>
                            <h1 className="text-yellow-400 font-bold text-sm mb-1">
                              Topi Baseball
                            </h1>
                            <div>
                              <p>Harga: Rp 50.000</p>
                              <p>Bahan: Denim</p>
                              <p>Warna: Hitam</p>
                              <p>Size: All Size</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-yellow-400 text-sm font-bold mb-1">
                          Description:
                        </p>
                        <p>
                          Topi Baseball Classic ini dirancang untuk kenyamanan
                          dan gaya sehari-hari. Desainnya yang sederhana namun
                          elegan membuatnya mudah dipadukan dengan berbagai
                          outfit.
                        </p>
                      </div>
                      <div>
                        <button className="bg-yellow-500 rounded-xl text-indigo-950 py-2 text-sm font-semibold w-full hover:bg-yellow-400">
                          Pesan Sekarang
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={() => setView(0)}
                  >
                    Kembali
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalOption;
