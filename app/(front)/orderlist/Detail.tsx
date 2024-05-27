"use client";
import { dapatkanWaktu, formatRupiah, ubahFormatTanggal } from "@/lib/utils";
import Image from "next/image";
import { getOrderDescription } from "@/lib/utils";
import { useSession } from "next-auth/react";
import ordersService from "@/lib/services/orderService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { OrderDetail } from "@/lib/models/OrderModel";

const Detail = () => {
  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter();
  const [orderList, setOrderList] = useState<OrderDetail[]>([]);
  const [orderLoading, setOrderLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!orderList.length) {
          const orders = await ordersService.getAllOrderByUserId(
            session?.user.id as string
          );
          setOrderList(orders);
          setOrderLoading(false);
          // console.log("fetching data");
        }
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <h1 className="card-title mt-8 mb-4">Daftar Pesanan</h1>
      <div className="grid lg:grid-cols-5 gap-4  ">
        <div className="lg:col-span-3">
          <div className=" space-y-3  rounded-2xl   lg:col-span-3">
            {orderLoading ? (
              [1, 2, 3, 4, 5].map((index) => (
                <div key={index}>
                  <div className="bg-white animate-pulse space-y-2 py-5 shadow-md px-5 w-full  rounded-xl">
                    <div className="w-1/5 h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-4/5 h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-3/5 h-4 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              ))
            ) : (
              <>
                {orderList.map((order) => (
                  <button
                    onClick={() => {
                      router.push(`/placeorder/${order.id}`);
                    }}
                    key={order.id}
                    className="bg-white space-y-2 py-5 shadow-md hover:bg-gray-50 px-5 w-full  rounded-xl"
                  >
                    <div className="flex space-x-2 text-xs">
                      <p>{ubahFormatTanggal(order.createdAt)},</p>
                      <p>{dapatkanWaktu(order.createdAt)} WITA</p>
                    </div>
                    <div className="flex  justify-between  ">
                      <div className="flex  items-center  space-x-4">
                        {/* <div className="w-16 h-16">
                          <Image
                            alt={"canteen image"}
                            src={"/images/canteen/canteen3.jpg"}
                            width={300}
                            height={300}
                            className="aspect-square relative rounded-lg"
                          ></Image>
                        </div> */}
                        <div className="flex  flex-col  h-full  ">
                          <p className="text-sm truncate text-start w-[20rem] font-light text-gray-500 ">
                            {order.items.map((item, index) => (
                              <React.Fragment key={index}>
                                {item.qty} {item.name}
                                {", "}
                              </React.Fragment>
                            ))}
                          </p>
                          <div className="flex space-x-2 items-center mt-1">
                            {order.status === 6 || order.status === 5 ? (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7 7.99988L10.258 10.4439C10.4598 10.5953 10.7114 10.6647 10.9624 10.6384C11.2133 10.6121 11.445 10.4919 11.611 10.3019L18 2.99988"
                                  stroke="green"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M19 9.99984C19 11.8804 18.411 13.7137 17.3157 15.2423C16.2203 16.7708 14.6736 17.9179 12.8929 18.5224C11.1122 19.1269 9.18685 19.1583 7.3873 18.6124C5.58776 18.0665 4.00442 16.9706 2.85967 15.4787C1.71492 13.9867 1.06627 12.1736 1.00481 10.2941C0.943352 8.41461 1.47218 6.56305 2.51702 4.9995C3.56187 3.43595 5.07023 2.23896 6.83027 1.57665C8.5903 0.914347 10.5136 0.81999 12.33 1.30684"
                                  stroke="green"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ) : order.status === 7 ? (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 11C1 16.523 5.477 21 11 21C16.523 21 21 16.523 21 11C21 5.477 16.523 1 11 1M3.649 4.079C3.787 3.93233 3.92933 3.78967 4.076 3.651M6.947 1.73C7.129 1.64867 7.31333 1.57233 7.5 1.501M1.732 6.942C1.64933 7.12533 1.572 7.31133 1.5 7.5M14 8L11 11M11 11L8 14M11 11L14 14M11 11L8 8"
                                  stroke="red"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10ZM18 10C18 12.1217 17.1571 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18C7.87827 18 5.84344 17.1571 4.34315 15.6569C2.84285 14.1566 2 12.1217 2 10C2 7.87827 2.84285 5.84344 4.34315 4.34315C5.84344 2.84285 7.87827 2 10 2C12.1217 2 14.1566 2.84285 15.6569 4.34315C17.1571 5.84344 18 7.87827 18 10ZM16 10C16.0001 11.1868 15.6483 12.347 14.989 13.3338C14.3298 14.3206 13.3926 15.0898 12.2962 15.544C11.1998 15.9981 9.99324 16.117 8.82926 15.8854C7.66528 15.6538 6.59612 15.0823 5.757 14.243L10 10V4C11.5913 4 13.1174 4.63214 14.2426 5.75736C15.3679 6.88258 16 8.4087 16 10Z"
                                  fill="#EEA147"
                                />
                              </svg>
                            )}

                            <p className={`font-normal text-xs text-gray-500 `}>
                              {getOrderDescription(order.status)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className=" h-full">
                        <p className="font-medium text-md">
                          Rp{formatRupiah(order.itemsPrice)},00
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
