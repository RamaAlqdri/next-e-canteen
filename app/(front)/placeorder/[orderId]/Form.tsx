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
import { ubahFormatTanggal } from "@/lib/utils";
import { dapatkanWaktu } from "@/lib/utils";
import { capitalizeText } from "@/lib/utils";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const Form = ({ orderId }: { orderId: string }) => {
  const router = useRouter();

  const { data: session } = useSession();
  const [order, setOrder] = useState<Order | null>(null);

  function updateOrderStatus(status: number) {
    orderService.updateOrderStatus(orderId, status);
  } 

  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return <></>;

  useEffect(() => {
    const q = query(
      collection(db, "order"),
      where("_id", "==", orderId),
      limit(1)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        let orderData: Order | null = null;
        snapshot.forEach((doc: any) => {
          orderData = doc.data() as Order;
        });
        setOrder(orderData);
      }
    );

    // Membersihkan pemantauan saat komponen tidak lagi diperlukan
    return () => {
      unsubscribe();
    };
  }, []);

  if (!order) return <></>;

  return (
    <div className="">
      <h1 className="card-title mt-8 mb-4">Detail Pesanan</h1>
      <div className="grid lg:grid-cols-5 gap-4 ">
        <div className="lg:col-span-3">
          <div
            className="flex justify-between  px-5 py-4 bg-white w-full rounded-t-2xl  bg-center bg-repeat "
            style={{
              backgroundImage: `url('/images/pattern/pattern.svg')`,
            }}
          >
            <div className="flex flex-col justify-between space-y-2">
              <p className="font-medium sm:text-sm text-xs">
                No Pesanan: {order._id}
              </p>
              <div className="flex items-center text-gray-500 space-x-2 sm:text-xs text-[0.6rem]">
                <p>{ubahFormatTanggal(order.createdAt)}</p>
                <div className="h-1 w-1 rounded-full bg-gray-500"></div>
                <p className="">{dapatkanWaktu(order.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center bg-white rounded-full border-[#FFF5EC] border-2 sm:px-4 px-2">
              <p className="sm:font-semibold font-medium text-[#EEA147] sm:text-lg text-xs text-center">
                {capitalizeText(order.canteenSlug)}
              </p>
            </div>
            {/* {status === 1 && (
              <div className="items-center text-center bg-white border-2  border-[#FFF5EC] rounded-full px-5 py-3 text-xs text-green-700 flex justify-center ">
                <p>Mengkonfirmasi Pesanan</p>
              </div>
            )} */}
          </div>
          <div className="bg-white py-4 space-y-2 px-5 rounded-b-2xl shadow-md  lg:col-span-3">
            <div className="flex flex-col space-y-1 ">
              <p className="text-md font-medium">Pelanggan</p>
              <div className="flex space-x-2 text-sm font-light">
                <div className="">
                  <p>{`Email`}</p>
                  <p>{`Nama`}</p>
                </div>
                <div className="">
                  <p>: {order.orderBy?.email}</p>
                  <p>: {order.orderBy?.fullName}</p>
                </div>
              </div>
            </div>
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
                {order.items.map((item, index) => (
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
                    Rp{formatRupiah(order.itemsPrice)},00
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
                    {getOrderDescription(order.status)}
                  </p>
                </li>
                {order.status === 1 && session?.user.role == "user" && (
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
                    {order.status !== 4 && order.status !== 3&& (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(4)}
                        className="btn border-0 btn-Delete "
                      >
                        Batalkan Pesanan
                      </button>
                    )}
                    {order.status === 1 && (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(2)}
                        className="btn border-0 btn-ePrimary "
                      >
                        Periksa Pembayaran
                      </button>
                    )}
                  </li>
                ) : session?.user.role == "canteen" ? (
                  <li className="flex  justify-center space-x-4">
                    {order.status !== 4 && order.status !== 3 && (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(4)}
                        className="btn border-0 btn-Delete "
                      >
                        Batalkan Pesanan
                      </button>
                    )}
                    {order.status === 0 && (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(1)}
                        className="btn border-0 btn-ePrimary "
                      >
                        Terima Pesanan
                      </button>
                    )}
                    {order.status === 2 && (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(3)}
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
