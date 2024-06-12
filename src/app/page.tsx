"use client";
import Image from "next/image";
import Link from "next/link";

const linkPayment1 =
  "https://open-heaven-foundation.vercel.app/transaction/merchandise1";
const linkPayment2 =
  "https://open-heaven-foundation.vercel.app/transaction/merchandise2";

const Home: React.FC = () => {
  return (
    <main className="bg-black text-white min-h-screen p-8">
      <div className="flex justify-center items-center mb-6">
        <Image
          src="/logo.png"
          width={75}
          height={100}
          alt="Open Heaven Foundation Logo"
          className="mx-8"
        />
        <div className="text-center w-2/3">
          <h1 className="text-3xl font-bold mb-4">
            Open Heaven Foundation Merchandise
          </h1>
          <p className="text-xs font-semibold">
            Anda dapat membeli produk merchandise Yayasan kami sebagai bentuk
            pemberian donasi. Dana penjualan merchandise akan kami salurkan
            untuk kegiatan sosial seperti membagikan sembako, pemeriksaan, dan
            penyuluhan kesehatan.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-6">
        <div className="border border-white rounded-2xl w-1/3 h-1/3 p-6">
          <div className="flex justify-center items-center gap-8">
            <Image
              src="/merchandise-tshirt.png"
              width={150}
              height={200}
              alt="Merchandise T-Shirt Open Heaven"
              className="rounded-xl mb-4"
            />
            <div>
              <h1 className="font-bold text-lg mb-1">Casual T-Shirt OH</h1>
              <div className="text-sm">
                <p>Harga: Rp 150.000</p>
                <p>Bahan: Katun</p>
                <p>Warna: Hitam</p>
                <p>Size: S, M, L, XL</p>
              </div>
            </div>
          </div>

          <p className="text-sm font-bold mb-1">Description:</p>
          <p className="text-sm mb-6 h-24">
            T-shirt Casual Comfort ini adalah pilihan sempurna untuk kenyamanan
            sehari-hari dapat digunakan di acara casual. Terbuat dari bahan
            katun premium yang lembut di kulit.
          </p>

          <div className="border border-white bg-blue-900 rounded-xl px-3 py-2 text-white text-sm text-center font-bold hover:bg-blue-700">
            <Link href={linkPayment1}>Beli Sekarang</Link>
          </div>
        </div>

        <div className="border border-white rounded-2xl w-1/3 h-1/3 p-6">
          <div className="flex justify-center items-center gap-8">
            <Image
              src="/merchandise-hat.png"
              width={150}
              height={200}
              alt="Merchandise Hat Walk by Faith"
              className="rounded-xl mb-4"
            />
            <div>
              <h1 className="font-bold text-lg mb-1">Topi Baseball OH</h1>
              <div className="text-sm">
                <p>Harga: Rp 50.000</p>
                <p>Bahan: Denim</p>
                <p>Warna: Hitam</p>
                <p>Size: All Size</p>
              </div>
            </div>
          </div>

          <p className="text-sm font-bold mb-1">Description:</p>
          <p className="text-sm mb-6 h-24">
            Topi Baseball Classic ini dirancang untuk kenyamanan dan gaya
            sehari-hari. Desainnya yang sederhana namun elegan membuatnya mudah
            dipadukan dengan berbagai outfit.
          </p>
          <div className="border border-white bg-blue-900 rounded-xl px-3 py-2 text-white text-sm text-center font-bold hover:bg-blue-700">
            <Link href={linkPayment2}>Beli Sekarang</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
