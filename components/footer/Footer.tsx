// components/Footer.js

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 w-full  text-white shadow-md py-4">
      <div className="flex flex-col items-center  space-y-2 container mx-auto text-center">
        <div>
          <Image
            src={"/images/icon/unram.png"}
            alt={"unram logo"}
            width={50}
            height={50}
          />
        </div>
        <div className="flex space-x-2  font-semibold items-center">
          <p>{new Date().getFullYear()}</p>
          <p>Universitas Mataram</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
