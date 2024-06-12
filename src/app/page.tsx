"use client";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <main className="bg-black text-white flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold mb-6">Open Heaven Foundation</h1>
      <Image
        src="/logo.png"
        width={150}
        height={200}
        alt="Open Heaven Foundation Logo"
      />
    </main>
  );
};

export default Home;
