import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import generateOrderId from "@/utils/generateOrderId";
import splitName from "@/utils/splitName";

interface ModalOptionProps {
  closeModal: () => void;
  isVisible: boolean;
}

interface Provinces {
  province_id: string;
  province: string;
}

interface Cities {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
}

interface DeliveryCost {
  value: number;
  etd: string;
  note: string;
}

interface DeliveryCosts {
  service: string;
  description: string;
  cost: DeliveryCost[];
}

const ModalOption: React.FC<ModalOptionProps> = ({ closeModal, isVisible }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [amount_, setAmount_] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);
  const [size, setSize] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [provinceid, setprovinceid] = useState<string>("null");
  const [cityid, setcityid] = useState<string>("null");
  const [address, setAddress] = useState<string>("");
  const [postal, setPostal] = useState<string>("");
  const [view, setView] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [provinceList, setProvinceList] = useState<Provinces[]>([
    { province_id: "", province: "" },
  ]);
  const [cityList, setCityList] = useState<Cities[]>([
    { city_id: "", province_id: "", province: "", type: "", city_name: "" },
  ]);
  const [jneDelivery, setJneDelivery] = useState<DeliveryCosts[]>([
    {
      service: "",
      description: "",
      cost: [{ value: 0, etd: "", note: "" }],
    },
  ]);
  const [deliveryCost, setDeliveryCost] = useState<number>(0);

  const clearParam = () => {
    setAmount_(0);
    setQty(0);
    setSize("");
    setName("");
    setEmail("");
    setPhoneNumber("");
    setprovinceid("null");
    setcityid("null");
    setAddress("");
    setPostal("");
    setErrorMessage("");
    setCityList([]);
    setJneDelivery([]);
    setDeliveryCost(0);
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    getCities();
  }, [provinceid]);

  useEffect(() => {
    getDelivery();
  }, [cityid]);

  const getProvinces = async () => {
    setProvinceList([]);

    const getResponse = await fetch("/api/rajaongkir/provinces", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const response = await getResponse.json();
    const data = response.data.rajaongkir.results;
    console.log(data);
    setProvinceList(data);
  };

  const getCities = async () => {
    setCityList([]);

    const getResponse = await fetch(`/api/rajaongkir/city/${provinceid}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const response = await getResponse.json();

    if (response.data === null) {
      return;
    } else {
      const data = response.data.rajaongkir.results;
      console.log(data);
      setCityList(data);
    }
  };

  const getDelivery = async () => {
    setJneDelivery([]);
    const body = {
      origin: 114,
      destination: cityid,
      weight: 1000,
      courier: "jne",
    };

    const getResponse = await fetch(`/api/rajaongkir/delivery`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await getResponse.json();

    if (response.data === null) {
      return;
    } else {
      const data = response.data.rajaongkir.results[0].costs;
      console.log(data);
      setJneDelivery(data);
    }
  };

  const clearView = () => {
    setView(0);
  };

  const handleTx1 = async (amount: number, typeTx: string) => {
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
        clearView();
      } else {
        const payload = await response.json();
        const paymentUrl = payload.data.redirect_url;
        router.push(paymentUrl);
        clearView();
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
      clearView();
    }
  };

  const handleTx2 = async (amount: number, typeTx: string) => {
    setLoading(true);

    try {
      const orderId = generateOrderId(typeTx.toUpperCase());
      const { firstName, lastName } = splitName(name);

      const body = {
        txType: typeTx.toLowerCase(),
        orderId: orderId,
        item: typeTx === "MCDS1" ? `Casual T-Shirt ${size}` : "Topi Baseball",
        qty: qty,
        price: typeTx === "MCDS1" ? 150000 : 50000, 
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        grossAmount: amount,
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
          route: "/landingpage/_components/ModalDonation",
          line: 50,
          message: "Something went wrong, failed to fetch data to midtrans.",
        };
        console.error(log);
        router.push("/error/donation");
        clearView();
      } else {
        const payload = await response.json();
        const paymentUrl = payload.data.redirect_url;
        router.push(paymentUrl);
        clearView();
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
      clearView();
    }
  };

  const amountHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value);
    setAmount_(amount);
  };

  const sizeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value;
    setSize(size);
  };

  const qtyHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const qty = parseInt(e.target.value);
    setQty(qty);
  };

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setName(name);
  };

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const phoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  };

  const provinceHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const provinceid = e.target.value;
    setprovinceid(provinceid);
  };

  const cityHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const cityid = e.target.value;
    console.log("cityid", cityid);
    setcityid(cityid);
  };

  const postalHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const postal = e.target.value;
    setPostal(postal);
  };

  const addressHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const address = e.target.value;
    setAddress(address);
  };

  const deliveryCostHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const deliveryCost = parseInt(e.target.value);
    setDeliveryCost(deliveryCost);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return false;
    }
    return true;
  };

  const validateForm1 = () => {
    const validEmail = validateEmail(email);
    const validPhoneNumber = validatePhoneNumber(phoneNumber);

    if (size === "" || name === "" || email === "" || phoneNumber === "") {
      setErrorMessage("Semua kolom wajib diisi");
    } else if (qty === 0) {
      setErrorMessage("Quantity tidak boleh nol");
    } else if (!validEmail) {
      setErrorMessage("Format email tidak valid");
    } else if (!validPhoneNumber) {
      setErrorMessage("Format no Hp tidak valid");
    } else {
      setErrorMessage("");
      setView(5);
    }
  };

  const validateForm2 = () => {
    const validEmail = validateEmail(email);
    const validPhoneNumber = validatePhoneNumber(phoneNumber);

    if (name === "" || email === "" || phoneNumber === "") {
      setErrorMessage("Semua kolom wajib diisi");
    } else if (qty === 0) {
      setErrorMessage("Quantity tidak boleh nol");
    } else if (!validEmail) {
      setErrorMessage("Format email tidak valid");
    } else if (!validPhoneNumber) {
      setErrorMessage("Format no Hp tidak valid");
    } else {
      setErrorMessage("");
      setView(8);
    }
  };

  const validateForm3 = () => {
    if (
      provinceid === "null" ||
      cityid === "null" ||
      postal === "" ||
      address === "" ||
      deliveryCost === 0
    ) {
      setErrorMessage("Semua kolom wajib diisi");
    } else {
      setErrorMessage("");
      setView(6);
    }
  };

  const validateForm4 = () => {
    if (
      provinceid === "null" ||
      cityid === "null" ||
      postal === "" ||
      address === "" ||
      deliveryCost === 0
    ) {
      setErrorMessage("Semua kolom wajib diisi");
    } else {
      setErrorMessage("");
      setView(9);
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white md:bg-black md:bg-opacity-50 backdrop-blur-sm flex justify-center items-center text-2xl text-black md:text-white font-bold">
          Loading...
        </div>
      )}
      {!loading && (
        <div className="fixed inset-0 bg-white md:bg-black md:bg-opacity-50 backdrop-blur-sm flex justify-center md:items-center">
          <div className="bg-white text-indigo-950 rounded-2xl text-center md:text-start">
            <div className="flex justify-end">
              <Image
                src="/close.png"
                width={32}
                height={32}
                alt="close icon"
                className=" rounded-none md:rounded-full mt-4 mr-4 md:mt-1 md:mr-1"
                onClick={() => {
                  clearView();
                  clearParam();
                  closeModal();
                }}
              />
            </div>
            <div className="pt-2 md:pb-8 px-8">
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
                      handleTx1(50000, "DNS");
                    }}
                  >
                    Donasi Rp 50.000
                  </button>
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => {
                      handleTx1(100000, "DNS");
                    }}
                  >
                    Donasi Rp 100.000
                  </button>
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => {
                      handleTx1(250000, "DNS");
                    }}
                  >
                    Donasi Rp 250.000
                  </button>
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => {
                      handleTx1(500000, "DNS");
                    }}
                  >
                    Donasi Rp 500.000
                  </button>
                  <button
                    className="bg-yellow-500 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:bg-yellow-400 mb-4"
                    onClick={() => {
                      handleTx1(1000000, "DNS");
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
                      className="bg-white border border-indigo-950 text-indigo-950 px-3 py-2 font-semibold w-full outline-none rounded-xl mb-3"
                      onChange={amountHandler}
                    />
                    <button
                      className=" bg-yellow-500 rounded-xl text-indigo-950 px-3 py-2 font-semibold w-full hover:bg-yellow-400"
                      onClick={() => handleTx1(0, "DNS")}
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
                  <div className="md:grid md:grid-cols-2 text-white text-start gap-6 mb-3 md:mb-6">
                    <div className="bg-indigo-800 rounded-3xl flex flex-col justify-between text-xs font-semibold w-80 h-72 p-4 mb-3 md:mb-0">
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
                          Casual T-Shirt Comfort ini adalah pilihan sempurna
                          untuk kenyamanan sehari-hari dapat digunakan di acara
                          casual. Terbuat dari bahan katun premium yang lembut
                          di kulit.
                        </p>
                      </div>
                      <div>
                        <button
                          className="bg-yellow-500 rounded-xl text-indigo-950 py-2 text-sm font-bold w-full hover:bg-yellow-400"
                          onClick={() => setView(4)}
                        >
                          Pesan Sekarang
                        </button>
                      </div>
                    </div>
                    <div className="bg-indigo-800 rounded-3xl flex flex-col justify-between text-xs font-semibold w-80 h-72 p-4">
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
                        <button
                          className="bg-yellow-500 rounded-xl text-indigo-950 py-2 text-sm font-semibold w-full hover:bg-yellow-400"
                          onClick={() => setView(7)}
                        >
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

              {/* FORM T-SHIRT */}
              {view === 4 && (
                <div className="text-start text-sm w-full md:w-80">
                  {/* ERROR MESSAGE */}
                  <p className="text-sm text-center font-bold text-red-500 h-5 mb-1">
                    {errorMessage}
                  </p>

                  {/* Item */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Item</b>
                    <div className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl">
                      Casual T-Shirt - Rp {qty * 150000}
                    </div>
                  </div>

                  {/* SIZE */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Size</b>
                    <select
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-2 py-1 font-semibold w-full outline-none rounded-b-xl"
                      required
                      onChange={sizeHandler}
                      value={size}
                    >
                      <option value="">Pilih Size</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>

                  {/* QUANTITY */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Quantity</b>
                    <input
                      type="number"
                      min="0"
                      value={qty}
                      placeholder="x0"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      required
                      onChange={qtyHandler}
                    />
                  </div>

                  {/* NAME */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Nama</b>
                    <input
                      type="text"
                      value={name}
                      placeholder="Nama Lengkap"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={nameHandler}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Email</b>
                    <input
                      type="email"
                      value={email}
                      placeholder="name@example.com"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={emailHandler}
                    />
                  </div>

                  {/* PHONE NUMBER */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-6">
                    <b className="px-3 text-xs">No HP & WA yang Aktif</b>
                    <input
                      type="tel"
                      value={phoneNumber}
                      placeholder="0851XXXXXX"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={phoneHandler}
                    />
                  </div>

                  <button
                    className="border-2 border-indigo-950 hover:border-indigo-600 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-indigo-950 py-2 font-semibold w-full mb-3"
                    onClick={() => {
                      validateForm1();
                    }}
                  >
                    Pengiriman
                  </button>
                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={() => {
                      clearParam();
                      setView(3);
                    }}
                  >
                    Kembali
                  </button>
                </div>
              )}

              {/* PENGIRIMAN T-SHIRT */}
              {view === 5 && (
                <div className="text-start text-sm w-full md:w-80">
                  {/* ERROR MESSAGE */}
                  <p className="text-sm text-center font-bold text-red-500 h-5 mb-1">
                    {errorMessage}
                  </p>

                  {/* PROVINSI */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Provinsi</b>
                    <select
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-2 py-1 font-semibold w-full outline-none rounded-b-xl"
                      required
                      value={provinceid}
                      onChange={provinceHandler}
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinceList.map((data) => (
                        <option key={data.province_id} value={data.province_id}>
                          {data.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* KOTA / KABUPATEN */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Kota / Kabupaten</b>
                    <select
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-2 py-1 font-semibold w-full outline-none rounded-b-xl"
                      required
                      value={cityid}
                      onChange={cityHandler}
                    >
                      <option value="">Pilih Kota / Kabupaten</option>
                      {cityList.map((data) => (
                        <option key={data.city_id} value={data.city_id}>
                          {`${data.type} ${data.city_name}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* POSTAL CODE */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Kode Pos</b>
                    <input
                      type="text"
                      value={postal}
                      placeholder="80119"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={postalHandler}
                    />
                  </div>

                  {/* ADDRESS */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Alamat Lengkap</b>
                    <textarea
                      rows={4}
                      value={address}
                      placeholder="Jl. Kerta Pura No.25, Pemecutan Klod, Denpasar Barat, Kota Denpasar, Bali. "
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={addressHandler}
                    />
                  </div>

                  {/* PENGIRIMAN T-SHIRT*/}
                  <div className="border-2 border-indigo-800 rounded-xl mb-6">
                    <b className="px-3 text-xs">Kurir</b>
                    <select
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-2 py-1 font-semibold w-full outline-none rounded-b-xl"
                      value={deliveryCost}
                      required
                      onChange={deliveryCostHandler}
                    >
                      <option value="">Pilih Pengiriman</option>
                      {jneDelivery.map((data) => (
                        <option key={data.service} value={data.cost[0].value}>
                          {`JNE ${data.service} (Rp ${data.cost[0].value}) (${data.cost[0].etd} hari)`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="border-2 border-indigo-950 hover:border-indigo-600 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-indigo-950 py-2 font-semibold w-full mb-3"
                    onClick={() => validateForm3()}
                  >
                    Checkout
                  </button>
                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={() => setView(4)}
                  >
                    Kembali
                  </button>
                </div>
              )}

              {/* Checkout T-SHIRT */}
              {view === 6 && (
                <div className="text-start text-sm w-full md:w-80">
                  <h1 className="font-bold text-lg text-center mb-3">
                    Periksa Kembali Pesanan Anda
                  </h1>
                  <div className="border-2 border-indigo-600 rounded-2xl text-xs py-2 px-4 gap-3 mb-6">
                    <h3 className="font-bold mb-1">CUSTOMER</h3>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      <p>Nama</p>
                      <p className="font-semibold">{name}</p>
                      <p>Email</p>
                      <p className="font-semibold">{email}</p>
                      <p>No HP & WA </p>
                      <p className="font-semibold">{phoneNumber}</p>
                    </div>
                    <h3 className="font-bold mb-1">DELIVERY</h3>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      <p>Alamat</p>
                      <p className="font-semibold">{address}</p>
                      <p>Kode Pos</p>
                      <p className="font-semibold">{postal}</p>
                    </div>
                    <h3 className="font-bold mb-1">ORDER</h3>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      <p>
                        T-Shirt Size-{size} {qty}x
                      </p>
                      <p className="font-semibold">Rp {qty * 150000}</p>
                      <p>Ongkir</p>
                      <p className="font-semibold">Rp {deliveryCost}</p>
                    </div>
                    <hr className="border border-indigo-800 mb-2"></hr>
                    <div className="grid grid-cols-2 gap-1">
                      <p className="font-bold">TOTAL</p>
                      <p className="font-semibold">
                        Rp {qty * 150000 + deliveryCost}
                      </p>
                    </div>
                  </div>
                  <button
                    className="border-2 border-indigo-950 hover:border-indigo-600 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-indigo-950 py-2 font-semibold w-full mb-3"
                    onClick={() =>
                      handleTx2(qty * 150000 + deliveryCost, "MCDS1")
                    }
                  >
                    Bayar Sekarang
                  </button>
                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={() => setView(5)}
                  >
                    Kembali
                  </button>
                </div>
              )}

              {/* FORM TOPI BASEBALL */}
              {view === 7 && (
                <div className="text-start text-sm w-full md:w-80">
                  {/* ERROR MESSAGE */}
                  <p className="text-sm text-center font-bold text-red-500 h-5 mb-1">
                    {errorMessage}
                  </p>

                  {/* Item */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Item</b>
                    <div className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl">
                      Topi Baseball - Rp {qty * 50000}
                    </div>
                  </div>

                  {/* QUANTITY */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Quantity</b>
                    <input
                      type="number"
                      min="0"
                      value={qty}
                      placeholder="x0"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      required
                      onChange={qtyHandler}
                    />
                  </div>

                  {/* NAME */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Nama</b>
                    <input
                      type="text"
                      value={name}
                      placeholder="Nama Lengkap"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={nameHandler}
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Email</b>
                    <input
                      type="email"
                      value={email}
                      placeholder="name@example.com"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={emailHandler}
                    />
                  </div>

                  {/* PHONE NUMBER */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-6">
                    <b className="px-3 text-xs">No HP & WA yang Aktif</b>
                    <input
                      type="tel"
                      value={phoneNumber}
                      placeholder="0851XXXXXX"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={phoneHandler}
                    />
                  </div>

                  <button
                    className="border-2 border-indigo-950 hover:border-indigo-600 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-indigo-950 py-2 font-semibold w-full mb-3"
                    onClick={() => {
                      validateForm2();
                    }}
                  >
                    Pengiriman
                  </button>
                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={() => {
                      clearParam();
                      setView(3);
                    }}
                  >
                    Kembali
                  </button>
                </div>
              )}

              {/* PENGIRIMAN TOPI */}
              {view === 8 && (
                <div className="text-start text-sm w-full md:w-80">
                  {/* ERROR MESSAGE */}
                  <p className="text-sm text-center font-bold text-red-500 h-5 mb-1">
                    {errorMessage}
                  </p>

                  {/* PROVINSI */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Provinsi</b>
                    <select
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-2 py-1 font-semibold w-full outline-none rounded-b-xl"
                      required
                      value={provinceid}
                      onChange={provinceHandler}
                    >
                      <option value="">Pilih Provinsi</option>
                      {provinceList.map((data) => (
                        <option key={data.province_id} value={data.province_id}>
                          {data.province}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* KOTA / KABUPATEN */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Kota / Kabupaten</b>
                    <select
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-2 py-1 font-semibold w-full outline-none rounded-b-xl"
                      required
                      value={cityid}
                      onChange={cityHandler}
                    >
                      <option value="">Pilih Kota / Kabupaten</option>
                      {cityList.map((data) => (
                        <option key={data.city_id} value={data.city_id}>
                          {`${data.type} ${data.city_name}`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* POSTAL CODE */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Kode Pos</b>
                    <input
                      type="text"
                      value={postal}
                      placeholder="80119"
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={postalHandler}
                    />
                  </div>

                  {/* ADDRESS */}
                  <div className="border-2 border-indigo-800 rounded-xl mb-3">
                    <b className="px-3 text-xs">Alamat Lengkap</b>
                    <textarea
                      rows={4}
                      value={address}
                      placeholder="Jl. Kerta Pura No.25, Pemecutan Klod, Denpasar Barat, Kota Denpasar, Bali. "
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-3 py-1 font-semibold w-full outline-none rounded-b-xl"
                      onChange={addressHandler}
                    />
                  </div>

                  {/* PENGIRIMAN T-SHIRT*/}
                  <div className="border-2 border-indigo-800 rounded-xl mb-6">
                    <b className="px-3 text-xs">Kurir</b>
                    <select
                      className="bg-white border-t border-indigo-950 text-indigo-950 px-2 py-1 font-semibold w-full outline-none rounded-b-xl"
                      value={deliveryCost}
                      required
                      onChange={deliveryCostHandler}
                    >
                      <option value="">Pilih Pengiriman</option>
                      {jneDelivery.map((data) => (
                        <option key={data.service} value={data.cost[0].value}>
                          {`JNE ${data.service} (Rp ${data.cost[0].value}) (${data.cost[0].etd} hari)`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="border-2 border-indigo-950 hover:border-indigo-600 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-indigo-950 py-2 font-semibold w-full mb-3"
                    onClick={() => validateForm4()}
                  >
                    Checkout
                  </button>
                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={() => setView(7)}
                  >
                    Kembali
                  </button>
                </div>
              )}

              {/* Checkout Topi */}
              {view === 9 && (
                <div className="text-start text-sm w-full md:w-80">
                  <h1 className="font-bold text-lg text-center mb-3">
                    Periksa Kembali Pesanan Anda
                  </h1>
                  <div className="border-2 border-indigo-600 rounded-2xl text-xs py-2 px-4 gap-3 mb-6">
                    <h3 className="font-bold mb-1">CUSTOMER</h3>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      <p>Nama</p>
                      <p className="font-semibold">{name}</p>
                      <p>Email</p>
                      <p className="font-semibold">{email}</p>
                      <p>No HP & WA </p>
                      <p className="font-semibold">{phoneNumber}</p>
                    </div>
                    <h3 className="font-bold mb-1">DELIVERY</h3>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      <p>Alamat</p>
                      <p className="font-semibold">{address}</p>
                      <p>Kode Pos</p>
                      <p className="font-semibold">{postal}</p>
                    </div>
                    <h3 className="font-bold mb-1">ORDER</h3>
                    <div className="grid grid-cols-2 gap-1 mb-3">
                      <p>
                        Topi Baseball {qty}x
                      </p>
                      <p className="font-semibold">Rp {qty * 50000}</p>
                      <p>Ongkir</p>
                      <p className="font-semibold">Rp {deliveryCost}</p>
                    </div>
                    <hr className="border border-indigo-800 mb-2"></hr>
                    <div className="grid grid-cols-2 gap-1">
                      <p className="font-bold">TOTAL</p>
                      <p className="font-semibold">
                        Rp {qty * 50000 + deliveryCost}
                      </p>
                    </div>
                  </div>
                  <button
                    className="border-2 border-indigo-950 hover:border-indigo-600 bg-yellow-500 hover:bg-yellow-400 rounded-xl text-indigo-950 py-2 font-semibold w-full mb-3"
                    onClick={() =>
                      handleTx2(qty * 50000 + deliveryCost, "MCDS2")
                    }
                  >
                    Bayar Sekarang
                  </button>
                  <button
                    className="border-2 border-indigo-950 rounded-xl text-indigo-950 py-2 font-semibold w-full hover:text-indigo-600 hover:border-indigo-600"
                    onClick={() => setView(8)}
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
