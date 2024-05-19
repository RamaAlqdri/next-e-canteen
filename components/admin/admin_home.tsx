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
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!canteenData.length) {
          const fetchedCanteenData = await canteenService.getAllCanteenData();
          setCanteenData(fetchedCanteenData);
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

  const promiseAllCanteen = canteenService.getAllCanteenData();

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
