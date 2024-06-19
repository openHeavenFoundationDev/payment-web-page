"use client";
import Image from "next/image";
import Link from "next/link";

const link1 = "https://www.foundationopenheaven.com/";
const link2 = "https://foundationopenheaven.vercel.app/landingpage/merchandise";
const link3 = "https://www.foundationopenheaven.com/";
const link4 = "https://www.foundationopenheaven.com/";

const Home: React.FC = () => {
  return (
    <main className="bg-black text-white flex flex-col xl:flex-row justify-start items-center min-h-screen p-8">
      <div className="flex flex-col justify-center items-center gap-6 mb-6 md:mr-6">
        <Image
          src="/logo.png"
          width={150}
          height={200}
          alt="Open Heaven Foundation Logo"
        />
        <h1 className="text-3xl xl:text-4xl text-center font-bold mb-4">
          Open Heaven Foundation Portal
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        <Link href={link1} target="_blank">
          <div className="border-4 border-black hover:border-white hover:font-bold rounded-2xl">
            <div className="border border-white hover:border-black rounded-2xl flex justify-center items-center p-4">
              <div>
                <h1 className="mb-2">Website</h1>
                <Image
                  src="/portal.png"
                  width={210}
                  height={175}
                  alt="Official Website Symbol"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </Link>

        <Link href={link2} target="_blank">
          <div className="border-4 border-black hover:border-white hover:font-bold rounded-2xl">
            <div className="border border-white hover:border-black rounded-2xl flex justify-center items-center p-4">
              <div>
                <h1 className="mb-2">Donation</h1>
                <Image
                  src="/donation.png"
                  width={210}
                  height={175}
                  alt="donation Symbol"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </Link>

        <Link href={link3} target="_blank">
          <div className="border-4 border-black hover:border-white hover:font-bold rounded-2xl">
            <div className="border border-white hover:border-black rounded-2xl flex justify-center items-center p-4">
              <div>
                <h1 className="mb-2">Ministry</h1>
                <Image
                  src="/ministry.png"
                  width={210}
                  height={175}
                  alt="Ministry Symbol"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </Link>

        <Link href={link4} target="_blank">
          <div className="border-4 border-black hover:border-white hover:font-bold rounded-2xl">
            <div className="border border-white hover:border-black rounded-2xl flex justify-center items-center p-4">
              <div>
                <h1 className="mb-2">Education</h1>
                <Image
                  src="/education.png"
                  width={210}
                  height={175}
                  alt="Education Symbol"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Home;
