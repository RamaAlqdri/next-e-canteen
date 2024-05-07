"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import CheckoutSteps from "@/components/CheckoutSteps";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { formatRupiah, getOrderDescription } from "@/lib/utils";
import orderService from "@/lib/services/orderService";
import { Order } from "@/lib/models/OrderModel";
import useSnap from "@/lib/hooks/useSnap";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import { Session } from "next-auth/types";
import { disconnect } from "process";
import canteenService from "@/lib/services/canteenService";
import { Canteen } from "@/lib/models/CanteenModel";
import {ubahFormatTanggal} from "@/lib/utils";
import {dapatkanWaktu} from "@/lib/utils";
import { capitalizeText } from "@/lib/utils";

const Form = (

) => {
  const router = useRouter();

  const { data: session } = useSession();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;

  return (
    <div className="">
      <h1 className="card-title mt-8 mb-4">Pengaturan</h1>
      <div className="grid lg:grid-cols-5 gap-4  ">
        <div className="lg:col-span-3">
          <div
            className="flex justify-between  px-5 py-4 bg-white w-full rounded-2xl  bg-center bg-repeat shadow-md "
            
          >
            <div className="flex flex-col justify-between space-y-2">
              <p className="font-medium sm:text-sm text-xs">
                No Pesanan:
              </p>
              <div className="flex items-center text-gray-500 space-x-2 sm:text-xs text-[0.6rem]">
                <p>hm</p>
                <div className="h-1 w-1 rounded-full bg-gray-500"></div>
                <p className="">hm</p>
              </div>
            </div>
            <div className="flex items-center bg-white rounded-full border-[#FFF5EC] border-2 sm:px-4 px-2">
              <p className="sm:font-semibold font-medium text-[#EEA147] sm:text-lg text-xs text-center">
                hm
              </p>
            </div>
            {/* {status === 1 && (
              <div className="items-center text-center bg-white border-2  border-[#FFF5EC] rounded-full px-5 py-3 text-xs text-green-700 flex justify-center ">
                <p>Mengkonfirmasi Pesanan</p>
              </div>
            )} */}
          </div>
          
        </div>
        
      </div>
    </div>
  );
};
export default Form;

