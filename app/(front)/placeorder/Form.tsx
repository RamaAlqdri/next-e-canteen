"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import CheckoutSteps from "@/components/CheckoutSteps";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { formatRupiah } from "@/lib/utils";
import orderService from "@/lib/services/orderService";
import { Order } from "@/lib/models/OrderModel";
import useSnap from "@/lib/hooks/useSnap";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import { Session } from "next-auth/types";
import { disconnect } from "process";
import canteenService from "@/lib/services/canteenService";
import { Canteen } from "@/lib/models/CanteenModel";

const Form = () => {
  const router = useRouter();
  const { paymentMethod, orderBy, items, itemsPrice, totalPrice, clear } =
    useCartService();

  const placeOrder = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items,
          orderBy: orderBy,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          isPaid: false,
          createdAt: new Date().toISOString(),
        }),
      });
      // console.log(data)
      console.log(response);

      if (!response.ok) {
        console.log(response);
        throw new Error(
          "Failed to place order. Server responded with status: " +
            response.status
        );
      }

      const data = await response.json();
      console.log(data);
      console.log("tes");
      clear();
      snapEmbed(data.data.snap_token, "snap-container", {
        onSuccess: function (result: any) {
          console.log("success", result);
          // setSnapShow(false)
        },
        onPending: function (result: any) {
          console.log("pending", result);
          // setSnapShow(false)
        },
        onClose: function () {
          // setSnapShow(false)
        },
      });
      toast.success("Order placed successfully");
      // router.push("/");
      // Redirect or handle response data as needed
    } catch (error: any) {
      console.error("Error placing order:", error.message);
      toast.error("Failed to place order. Please try again later.");
      // Additional error handling if needed
    }
  };
  // const [kantin, setKantin] = useState<Canteen>();
  // const [isLoading, setIsLoading] = useState('belum');

  // useEffect(() => {
  //   async function fetchData() {
  //     const kantinData = await canteenService.getCanteenData("food-utama");
  //     setKantin(kantinData);
  //     setIsLoading('udah');
  //   }
  //   fetchData();
  // }, [kantin]);

  const { data: session } = useSession();

  const [status, setStatus] = useState("pay");
  // confirm, paying, payconfirm, done

  const { snapEmbed } = useSnap();

  // console.log(myPattern)

  useEffect(() => {
    if (!paymentMethod) {
      return router.push("/payment");
    }
    if (items.length === 0) {
      // return router.push("/");
    }
  }, [items.length, paymentMethod, router]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <></>;

  return (
    <div className="">
      <h1 className="card-title mt-8 mb-4">Pesanan Anda</h1>
      <div className="grid lg:grid-cols-5 gap-4  ">
        <div className="lg:col-span-3">
          <div
            className="flex justify-between  px-5 py-4 bg-white w-full rounded-t-2xl  bg-center bg-repeat "
            style={{
              backgroundImage: `url('/images/pattern/pattern.svg')`,
            }}
          >
            <div className="flex flex-col justify-between space-y-2">
              <p className="font-medium sm:text-sm text-xs">
                No Pesanan: {"TRX-jtbi-lUMY4F_X"}
              </p>
              <div className="flex items-center text-gray-500 space-x-2 sm:text-xs text-[0.6rem]">
                <p>04 Mei 2024</p>
                <div className="h-1 w-1 rounded-full bg-gray-500"></div>
                <p className="">14:02:30 WIB</p>
              </div>
            </div>
            <div className="flex items-center bg-white rounded-full border-[#FFF5EC] border-2 sm:px-4 px-2">
              <p className="sm:font-semibold font-medium text-[#EEA147] sm:text-lg text-xs text-center">
                Fakultas Teknik
              </p>
            </div>
            {/* {status === 1 && (
              <div className="items-center text-center bg-white border-2  border-[#FFF5EC] rounded-full px-5 py-3 text-xs text-green-700 flex justify-center ">
                <p>Mengkonfirmasi Pesanan</p>
              </div>
            )} */}
          </div>
          <div className="bg-white py-4 px-5 rounded-b-2xl shadow-md  lg:col-span-3">
            <table className="w-full   ">
              <thead className="border-b-[2px] border-gray-200">
                <tr className="sm:text-base text-xs">
                  <th className="font-medium py-2">No</th>
                  <th className="font-medium py-2">Barang</th>
                  <th className="font-medium py-2 ">Banyak</th>
                  <th className="font-medium py-2">Harga</th>
                  <th className="font-medium py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody className=" ">
                {items.map((item, index) => (
                  <tr
                    key={item.slug}
                    className=" border-b-[1px] sm:text-sm text-[0.7rem] border-gray-100 font-light"
                  >
                    <td>
                      <p className="text-center">{index + 1}</p>
                    </td>
                    <td className="py-3 ">
                      <p className="ml-2 text-center">{item.name}</p>
                    </td>
                    <td className="max-w-6 min-w-5   px-2">
                      <p className="px-2  text-center  ">{item.qty}</p>
                    </td>
                    <td className="text-center  ">
                      Rp{formatRupiah(item.price)},00
                    </td>
                    <td className="text-center  ">
                      Rp{formatRupiah(item.price * item.qty)},00
                    </td>
                  </tr>
                ))}
              </tbody>
              <thead>
                <tr className="sm:text-base text-xs border-t-[2px] border-gray-200  ">
                  <th className="font-medium py-2 "></th>
                  <th className="font-medium py-2 "></th>
                  <th className="font-medium py-2 "></th>

                  <th className="font-medium py-2 ">Total</th>
                  <th className="font-medium py-2 ">
                    Rp{formatRupiah(itemsPrice)},00
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="lg:col-span-2 ">
          <div className="rounded-2xl py-4  px-5  bg-white shadow-md">
            <div className="">
              <ul className="space-y-6">
                <li className="flex justify-between border-b-[1px] border-gray-100   items-baseline py-2">
                  <div className=" text-sm sm:text-base font-medium">
                    Status
                    {/* ({items.reduce((a, c) => a + c.qty, 0)})  */}
                  </div>
                  <p className="sm:text-sm text-xs  font-light">
                    {status === "confirm" && "Menunggu Konfirmasi Kantin"}
                    {status === "pay" && "Membayar Pesanan"}
                    {status === "payconfirm" && "Memeriksa Pembayaran"}
                    {status === "done" && "Pesanan Selesai"}
                  </p>
                </li>
                {status === "pay" && session?.user.role == "user" && (
                  <div className="flex justify-center w-full ">
                    <Image
                      src={"/images/qris/qris1.jpeg"}
                      width={500}
                      height={500}
                      alt="QRIS Canteen"
                      className="relative w-[70%] rounded-xl border-2"
                    ></Image>
                  </div>
                )}

                {session?.user.role === "user" ? (
                  <li className="flex  justify-center space-x-4">
                    {status !== "done" && (
                      <button
                        // onClick={() => router.push("/order")}
                        className="btn border-0 btn-Delete "
                      >
                        Batalkan Pesanan
                      </button>
                    )}
                    {status === "pay" && (
                      <button
                        // onClick={() => router.push("/order")}
                        className="btn border-0 btn-ePrimary "
                      >
                        Periksa Pembayaran
                      </button>
                    )}
                  </li>
                ) : session?.user.role == "canteen" ? (
                  <li className="flex  justify-center space-x-4">
                    {status !== "done" && (
                      <button
                        // onClick={() => router.push("/order")}
                        className="btn border-0 btn-Delete "
                      >
                        Batalkan Pesanan
                      </button>
                    )}
                    {status === "confirm" && (
                      <button
                        // onClick={() => router.push("/order")}
                        className="btn border-0 btn-ePrimary "
                      >
                        Terima Pesanan
                      </button>
                    )}
                    {status === "payconfirm" && (
                      <button
                        // onClick={() => router.push("/order")}
                        className="btn border-0 btn-ePrimary "
                      >
                        Pembayaran Berhasil
                      </button>
                    )}
                  </li>
                ) : (
                  <div></div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
