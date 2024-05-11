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
import { Order } from "@/lib/models/OrderModel";
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
  const promiseAllCanteen = canteenService.getAllCanteenData();

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <Await promise={promiseAllCanteen}>
          {(canteens) => (
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
              {canteens.map((canteen) => (
                <div
                  key={canteen.slug}
                  className="flex justify-between cursor-pointer bg-white space-y-2 py-4 shadow-md hover:bg-gray-50 px-4 w-full  rounded-xl"
                >
                  <div className="flex  justify-between  w-full  ">
                    <div
                      className="flex  items-center  w-full  space-x-4"
                      onClick={() => {
                        router.push(`/canteen_dashboard/${canteen._id}`);
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
        </Await>
      </Suspense>
    </div>
  );
};
