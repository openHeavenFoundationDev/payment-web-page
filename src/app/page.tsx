"use client";
import Image from "next/image";
import Link from "next/link";

const link1 = "https://www.foundationopenheaven.com/";
const link2 = "https://foundationopenheaven.vercel.app/landingpage/merchandise";
const link3 = "https://www.foundationopenheaven.com/";
const link4 = "https://www.foundationopenheaven.com/";

const Home: React.FC = () => {
  return (
    <main className="bg-black text-white flex justify-start items-center min-h-screen p-8">
      <div className="flex justify-center items-center mb-6">
        <Image
          src="/logo.png"
          width={150}
          height={200}
          alt="Open Heaven Foundation Logo"
          className="mx-8"
        />
        <div className="text-center w-1/2">
          <h1 className="text-4xl font-bold mb-4">Open Heaven Foundation</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Link href={link1}>
          <div className="border-4 border-black hover:border-white hover:font-bold rounded-2xl">
            <div className="border border-white hover:border-black rounded-2xl p-4">
              <h1 className="mb-2 ">Official Website</h1>
              <Image
                src="/portal.png"
                width={210}
                height={175}
                alt="Official Website Symbol"
                className="rounded-xl"
              />
            </div>
          </div>
        </Link>

        <Link href={link2}>
          <div className="border-4 border-black hover:border-white hover:font-bold rounded-2xl">
            <div className="border border-white hover:border-black rounded-2xl p-4">
              <h1 className="mb-2 ">Merchandise</h1>
              <Image
                src="/merchandise.png"
                width={210}
                height={175}
                alt="Merchandise Symbol"
                className="rounded-xl"
              />
            </div>
          </div>
        </Link>

        <Link href={link3}>
          <div className="border-4 border-black hover:border-white hover:font-bold rounded-2xl">
            <div className="border border-white hover:border-black rounded-2xl p-4">
              <h1 className="mb-2 ">Ministry</h1>
              <Image
                src="/ministry.png"
                width={210}
                height={175}
                alt="Ministry Symbol"
                className="rounded-xl"
              />
            </div>
          </div>
        </Link>

        <Link href={link4}>
          <div className="border-4 border-black hover:border-white hover:font-bold rounded-2xl">
            <div className="border border-white hover:border-black rounded-2xl p-4">
              <h1 className="mb-2 ">Education</h1>
              <Image
                src="/education.png"
                width={210}
                height={175}
                alt="Education Symbol"
                className="rounded-xl"
              />
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Home;
