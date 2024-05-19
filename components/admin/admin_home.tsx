"use client";

import ProductItem from "@/components/products/ProductItem";

import productsService from "@/lib/services/productService";

import { Suspense, useEffect, useState } from "react";
import canteenService from "@/lib/services/canteenService";
import CanteenItem from "@/components/canteen/CanteenItem";
import Image from "next/image";
import Skeleton from "@/components/handle/skeleton";
import Await from "@/components/handle/await";
import {
  AreaChart,
  Card,
  DonutChart,
  Select,
  Title,
  SelectItem,
  TabGroup,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Divider,
} from "@tremor/react";
import {
  getStatisticCanteen,
  valueFormatter,
  dataFormatterSingkat,
  dataFormatter,
} from "@/lib/statistic";
import { OrderDetail } from "@/lib/models/OrderModel";
import { useSession } from "next-auth/react";
import ordersService from "@/lib/services/orderService";
import {
  capitalizeText,
  dapatkanWaktu,
  formatRupiah,
  getOrderDescription,
  ubahFormatTanggal,
} from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import CanteenBeranda from "@/components/canteen/canteen_home";
import { Canteen } from "@/lib/models/CanteenModel";
import { CanteenRequest } from "@/lib/models/RequestModel";
import router from "next/router";

const AdminBeranda = () => {
  return (
    // {handleStatistic("harian")}
    <div className="lg:grid lg:grid-cols-6">
      <div className="lg:col-span-4">
        <TabGroup className="-space-y-[0.6rem]">
          <TabList
            className="mt-8  bg-white pt-4 border-b-2 px-6 rounded-t-2xl shadow-md"
            variant="line"
            color={"orange-400"}
            defaultValue="1"
          >
            <Tab className="" value="1">
              Kantin
            </Tab>
            <Tab value="2">Permintaan</Tab>
          </TabList>
          <TabPanels className="">
            <TabPanel className="">
              <CanteenList />
            </TabPanel>
            <TabPanel>
              <RequestList />
            </TabPanel>
            {/* <TabPanel></TabPanel> */}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};
export default AdminBeranda;

const CanteenList = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [canteenData, setCanteenData] = useState<Canteen[]>([]);
  const [orderList, setOrderList] = useState<OrderDetail[]>([]);
  function arrayToCSV(data: any) {
    return data.map((row: any) => row.join(",")).join("\n");
  }

  function downloadCSV(
    filename = "data.csv",
    canteenName: string,
    orderList: OrderDetail[],
    index: any
  ) {
    // const csvData = arrayToCSV(data);
    const csvData = arrayToCSV(makeCsv(canteenName, orderList, index));
    console.log(csvData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  const makeCsv = (
    canteenName: string,
    orderList: OrderDetail[],
    index: any
  ) => {
    let date = new Date();
    let contextHeader = "";
    let header = "";
    const data = canteenData.map((canteen) => {
      // Filter orders for the current canteen
      const filteredOrders = orderList.filter(
        (order) => order.canteenId === canteen.id
      );

      // Get statistics for the canteen
      const { totalPendapatanHasil } = getStatisticCanteen(
        index,
        filteredOrders
      );

      // Return an object that includes canteen details and its statistics
      return {
        canteenName: canteen.name,
        totalPendapatanHasil: totalPendapatanHasil,
      };
    });
    if (index === "Jam") {
      header = "Hari";
      // Get the day of the week from the date object
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      contextHeader = days[date.getDay()]; // date.getDay() returns a number from 0 (Sunday) to 6 (Saturday)
    } else if (index === "Minggu") {
      header = "Bulan";
      // Get the month from the date object
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      contextHeader = months[date.getMonth()]; // date.getMonth() returns a number from 0 (January) to 11 (December)
    } else if (index === "Bulan") {
      header = "Tahun";
      // Get the full year
      contextHeader = date.getFullYear().toString(); // date.getFullYear() returns a four-digit year (e.g., 2024)
    }

    return [
      ["Kantin", header, "Pendapatan"],
      ...data.map((item) => [
        item.canteenName,
        contextHeader,
        String(`Rp${formatRupiah(item.totalPendapatanHasil)}`),
      ]),
    ];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!canteenData.length) {
          const fetchedCanteenData = await canteenService.getAllCanteenData();
          const fetchedOrderList = await ordersService.getAllOrder();
          setCanteenData(fetchedCanteenData);
          setOrderList(fetchedOrderList);
          console.log("Data fetched");
        } else {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {canteenData.length === 0 ? (
        <div className=" space-y-4">
          <div className="w-full animate-pulse bg-white rounded-b-2xl p-6 h-[5rem]">
            <div className="w-full h-full bg-gray-200 rounded-xl"></div>
          </div>

          <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
            <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
            <div className="w-full h-full flex flex-col justify-between py-1">
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
            </div>
          </div>
          <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
            <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
            <div className="w-full h-full flex flex-col justify-between py-1">
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
            </div>
          </div>
          <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
            <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
            <div className="w-full h-full flex flex-col justify-between py-1">
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
            </div>
          </div>
          <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
            <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
            <div className="w-full h-full flex flex-col justify-between py-1">
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
            </div>
          </div>
          <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
            <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
            <div className="w-full h-full flex flex-col justify-between py-1">
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
              <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-b-2xl pt-3 flex justify-between bg-white shadow-md px-6 pb-4">
            <div className="w-1/5">
              <Select
                defaultValue="none"
                // onValueChange={(v) => handleStatistic(v, orders)}
                className=""
              >
                <SelectItem value="1" className=""></SelectItem>
                <SelectItem value="2"></SelectItem>
                <SelectItem value="3"></SelectItem>
              </Select>
            </div>
            <div>
              <button
                onClick={() => {
                  downloadCSV("data.csv", "", orderList, "Minggu");
                }}
                className="text-xs text-lime-600 hover:text-white font-medium hover:bg-lime-600 px-2 py-2 border-lime-600 border-2 rounded-xl"
              >
                Ekspor CSV
              </button>
            </div>
          </div>
          {canteenData.map((canteen) => (
            <div
              key={canteen.slug}
              className="flex justify-between cursor-pointer bg-white space-y-2 py-4 shadow-md hover:bg-gray-50 px-4 w-full  rounded-xl"
            >
              <div className="flex  justify-between  w-full  ">
                <div
                  className="flex  items-center  w-full  space-x-4"
                  onClick={() => {
                    router.push(`/canteen_dashboard/${canteen.id}`);
                    // to component from canteen_home
                  }}
                >
                  <div className="w-20 h-20">
                    <Image
                      alt={"canteen image"}
                      src={canteen.image}
                      width={300}
                      height={300}
                      className="aspect-square relative rounded-xl"
                    ></Image>
                  </div>
                  <div className="flex  flex-col justify-between  ">
                    <p className="font-normal text-start">{canteen.name}</p>
                    <p className="font-light text-sm text-gray-500 text-start">
                      {canteen.location}
                    </p>
                    {/* <p className="font-medium text-md text-start">
                          Rp{formatRupiah(product.price)},00
                        </p> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
const RequestList = () => {
  const [filter, setFilter] = useState("Semua");

  const [requestList, setRequestList] = useState<CanteenRequest[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!requestList.length) {
          const fetchedRequestData =
            await canteenService.getAllCanteenRequest();
          // const fetchedOrderList = await ordersService.getAllOrder();
          setRequestList(fetchedRequestData);
          console.log(fetchedRequestData);
          console.log("Data fetched");
        } else {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return requestList.length === 0 ? (
    <div className=" space-y-4">
      <div className="w-full animate-pulse bg-white rounded-b-2xl p-6 h-[5rem]">
        <div className="w-full h-full bg-gray-200 rounded-xl"></div>
      </div>

      <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
        <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
        <div className="w-full h-full flex flex-col justify-between py-1">
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
        </div>
      </div>
      <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
        <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
        <div className="w-full h-full flex flex-col justify-between py-1">
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
        </div>
      </div>
      <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
        <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
        <div className="w-full h-full flex flex-col justify-between py-1">
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
        </div>
      </div>
      <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
        <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
        <div className="w-full h-full flex flex-col justify-between py-1">
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
        </div>
      </div>
      <div className="h-[8rem] flex space-x-4 w-full animate-pulse bg-white p-6 rounded-2xl ">
        <div className="h-[5rem] w-[5.5rem] bg-gray-200 rounded-2xl"></div>
        <div className="w-full h-full flex flex-col justify-between py-1">
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[10rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[6rem]"></div>
          <div className="bg-gray-200 rounded-md h-[1.1rem] w-[12rem]"></div>
        </div>
      </div>
    </div>
  ) : (
    <div className="space-y-3 ">
      <div className="rounded-b-2xl pt-3  bg-white shadow-md px-6 pb-4">
        <div className="w-1/5">
          <Select
            defaultValue="Semua"
            className=""
            onValueChange={(v) => setFilter(v)}
          >
            <SelectItem value="Semua">Semua</SelectItem>
            <SelectItem value="Diterima">Diterima</SelectItem>
            <SelectItem value="Ditolak">Ditolak</SelectItem>
            <SelectItem value="Permintaan">Permintaan</SelectItem>
          </Select>
        </div>
      </div>
      {requestList.filter((request)=>{
        if (filter === "Semua") {
          return true
        }else if (filter === "Diterima") {
          return request.status === "Diterima"
        } else if (filter === "Ditolak") {
          return request.status === "Ditolak"
        } else {
          return request.status === "Permintaan"
        }
      }).map((request) => (
        <button
          onClick={() => {
            // updateReadBy(order.id as string);
            router.push(`/canteen_request/${request.id}`);
          }}
          key={request.id}
          className={` space-y-2 py-5 bg-white shadow-md hover:bg-gray-50 px-5 w-full  rounded-xl 
            `}
          // ${order.readBy.canteen ? "bg-white" : "bg-[#FFEBD7]"}
        >
          <div className="flex space-x-2 text-xs">
            {/* <p>{ubahFormatTanggal(order.createdAt)},</p> */}
            {/* <p>{dapatkanWaktu(order.createdAt)}</p> */}
          </div>
          <div className="flex  justify-between  ">
            <div className="flex  items-center  space-x-4">
              <div className="flex  flex-col justify-start   h-full  ">
                {/* <Await promise={promiseUser(order.customerId)}>
                  {(user) => (
                    <p className="font-medium text-start">{user?.name}</p>
                  )}
                </Await> */}
                {/* <p className="font-medium text-start">
                        {order.orderBy?.fullName}
                      </p> */}
                {/* <p className="text-sm truncate text-start w-[20rem] font-light text-gray-500">
                    {order.items.map((item, index) => (
                      <React.Fragment key={index}>
                        {item.qty} {item.name}
                        {", "}
                      </React.Fragment>
                    ))}
                  </p> */}
                  <p className="font-medium text-md text-start">{request.canteenName}</p>
                  <p className="font-normal text-start text-xs">{request.user.name}</p>
                <div className="flex space-x-2 items-center mt-1">
                  {request.status === "Diterima" ? (
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
                  ) : request.status === "Ditolak" ? (
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
                    {request.status}
                  </p>
                </div>
              </div>
            </div>
            <div className=" h-full">
              {/* <p className="font-medium text-md">
                  Rp{formatRupiah(order.itemsPrice)},00
                </p> */}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
