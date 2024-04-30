"use client";
import useCartService from "@/lib/hooks/useCartStore";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/lib/models/UserModel";
import userService from "@/lib/services/userService";

interface Props {
  visible: boolean;
  setVisible: any;
}

const Profil = (
  { visible, setVisible }: Props
) => {
  const { data: session } = useSession();
  // const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <div className="space-y-4 z-30 fixed bg-white h-screen w-screen p-6">
          <div className="flex space-x-2 items-center">
            <button onClick={()=>{setVisible(false)}} className="flex items-center justify-center h-7 w-7 rounded-full hover:bg-gray-100">
              <svg
                width="84"
                height="79"
                viewBox="0 0 84 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M39.0312 73.0625L5 39.0312L39.0312 5M9.72656 39.0312H78.7344"
                  stroke="gray"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="text-md font-medium">Profilku</p>
          </div>
          <div>
            <div className="relative h-12 w-12  rounded-full overflow-hidden">
              <Image
                src="/images/avatar/my.png"
                alt="avatar"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Profil;
