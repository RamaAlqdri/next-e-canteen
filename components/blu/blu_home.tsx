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
  getBase64ImageTes,
  getOrderDescription,
  ubahFormatTanggal,
} from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import CanteenBeranda from "@/components/canteen/canteen_home";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Canteen } from "@/lib/models/CanteenModel";
import ImageDisplay from "../image/imageShow";

const BLUBeranda = () => {
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
          </TabList>
          <TabPanels className="">
            <TabPanel className="">
              <CanteenList />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};
export default BLUBeranda;

const CanteenList = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const [canteenData, setCanteenData] = useState<Canteen[]>([]);
  const [orderList, setOrderList] = useState<OrderDetail[]>([]);
  const downloadPDF = (orderList: OrderDetail[]) => {
    const date = new Date();
    // Generate the data array from your existing function
    const data = makeData(orderList, date);

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

    const doc = new jsPDF();
    const headers = data[0];
    const body = data.slice(1);

    getBase64ImageTes(
      "/images/icon/unram-canteen.png",
      function (base64Data: any, imgWidth: any, imgHeight: any) {
        const maxWidth = 50; // Lebar maksimum gambar di PDF
        const ratio = maxWidth / imgWidth; // Rasio untuk menjaga aspek gambar
        const width = maxWidth;
        const height = imgHeight * ratio;
        doc.addImage(base64Data, "PNG", 15, 20, width, height);
        doc.setFont("helvetica", "bold");

        doc.setFontSize(16);
        doc.text(`Laporan Pendapatan Kantin`, 67, 25, {
          align: "left",
        });
        doc.setFont("helvetica", "plain");
        doc.setFontSize(12);
        doc.text(
          `Bulan ${months[date.getMonth()]} ${date.getFullYear()}`,
          67,
          31,
          { align: "left" }
        );
        autoTable(doc, {
          head: [headers],
          body: body,
          startY: 37,
          styles: { fillColor: [238, 160, 97] },
          columnStyles: {
            0: { fillColor: [255, 255, 255] },
            1: { fillColor: [255, 255, 255] },
            2: { fillColor: [255, 255, 255] },
            3: { fillColor: [255, 255, 255] },
          },

          theme: "grid",
        });
        doc.save(
          `Laporan_Pendapatan_Kantin_Bulan_${
            months[date.getMonth()]
          }_${date.getFullYear()}.pdf`
        );
      }
    );
  };
  const makeData = (orderList: OrderDetail[], date: Date) => {
    const data = canteenData.map((canteen) => {
      // Filter orders for the current canteen
      const filteredOrders = orderList.filter(
        (order) => order.canteenId === canteen.id
      );

      // Get statistics for the canteen
      const { totalPendapatanHasil, totalTransaksiHasil } = getStatisticCanteen(
        "bulanan",
        filteredOrders,
        date
      );

      // Return an object that includes canteen details and its statistics
      return {
        canteenName: canteen.name,
        totalTransaksiHasil: totalTransaksiHasil,
        totalPendapatanHasil: totalPendapatanHasil,
      };
    });

    return [
      ["Kantin", "Total Transaksi", "Pendapatan"],
      ...data.map((item) => [
        item.canteenName,
        item.totalTransaksiHasil,
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
          // console.log("Data fetched");
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
              {/* <Select
                defaultValue="none"

                className=""
              >
                <SelectItem value="1" className=""></SelectItem>
                <SelectItem value="2"></SelectItem>
                <SelectItem value="3"></SelectItem>
              </Select> */}
            </div>
            <div>
              <button
                onClick={() => {
                  downloadPDF(orderList);
                }}
                className="text-xs text-red-600 hover:text-white font-medium hover:bg-red-600 px-2 py-2 border-red-600 border-2 rounded-xl"
              >
                Ekspor PDF
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
                    <ImageDisplay
                      path={canteen.image}
                      defaultPath="/images/canteen/default.jpg"
                      imgStyle="aspect-square relative rounded-xl"
                    />
                    {/* <Image
                      alt={"canteen image"}
                      src={canteen.image}
                      width={300}
                      height={300}
                      className="aspect-square relative rounded-xl"
                    ></Image> */}
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
