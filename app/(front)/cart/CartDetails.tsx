"use client";

import useCartService from "@/lib/hooks/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatRupiah } from "@/lib/utils";

export default function CartDetails() {
  const router = useRouter();
  const { items, itemsPrice, decrease, increase } = useCartService();
  // console.log(items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <>
      {items.length === 0 ? (
        <div className="mt-32 flex  items-center justify-center">
          <div className="flex flex-col items-center ">
            <p className="text-[#F7C9B1] text-center text-xl font-semibold">
              Keranjang Kosong
            </p>
            <Image
              width={300}
              height={300}
              src={"/images/icon/cart.png"}
              alt="keranjang kosong"
              className="object-cover h-72 w-72 opacity-35"
            ></Image>
            <Link
              className="btn-ePrimary text-white py-2 px-3 rounded-lg bg-[#EEA147] text-md   justify-center"
              href="/"
            >
              Ayo Belanja
            </Link>
          </div>
        </div>
      ) : (
        <div className="">
          <h1 className="card-title mt-8 mb-4">Keranjang Anda</h1>
          <div className="grid lg:grid-cols-4 gap-4  ">
            <div className="bg-white py-4 px-5 rounded-2xl shadow-md  lg:col-span-3">
              <table className="w-full   ">
                <thead className="border-b-[1px] border-gray-100">
                  <tr className="text-base ">
                    <th className="font-medium py-2">Barang</th>
                    <th className="font-medium py-2 ">Jumlah</th>
                    <th className="font-medium py-2">Harga</th>
                  </tr>
                </thead>
                <tbody className=" ">
                  {items.map((item) => (
                    <tr
                      key={item.slug}
                      className=" border-b-[1px] border-gray-100 "
                    >
                      <td className="py-3 ">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center sm:ml-3"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={300}
                            height={300}
                            className="object-cover sm:h-14 rounded-xl  sm:w-14 h-10 w-10"
                          />
                          <span className="ml-2 px-2">{item.name}</span>
                        </Link>
                      </td>
                      <td className="max-w-6 min-w-5   px-2">
                        <div className="flex items-center justify-between border-[0.05rem] border-[#EEA147] rounded-lg overflow-hidden ">
                          <button
                            className="flex items-center justify-center text-white h-8 w-8  btn-ePrimary border-0  text-xs sm:text-md "
                            type="button"
                            onClick={() => decrease(item)}
                          >
                            -
                          </button>
                          <span className="px-2 font-semibold text-xs sm:text-xs ">
                            {item.qty}
                          </span>
                          <button
                            className="flex items-center justify-center text-white h-8 w-8   btn-ePrimary border-0  text-xs sm:text-md "
                            type="button"
                            onClick={() => increase(item)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="text-center  ">
                        Rp{formatRupiah(item.price)},00
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="rounded-2xl py-4 px-5  bg-white shadow-md">
                <div className="">
                  <ul>
                    <li>
                      <div className="mb-2  text-base font-medium">
                        Ringkasan Belanja
                        {/* ({items.reduce((a, c) => a + c.qty, 0)})  */}
                      </div>
                      <div className="flex border-t-[1px] border-gray-100  justify-between items-baseline py-2">
                        <p className="text-sm font-light">Total</p>
                        <p className="text-lg font-semibold">
                          Rp{formatRupiah(itemsPrice)},00
                        </p>
                      </div>
                    </li>
                    <li>
                      <button
                        onClick={() => router.push("/shipping")}
                        className="btn border-0 btn-ePrimary w-full"
                      >
                        Bayar
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
