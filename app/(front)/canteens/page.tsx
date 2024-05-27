/* eslint-disable @next/next/no-img-element */
"use client";
import { Metadata } from "next";
import canteenService from "@/lib/services/canteenService";
import CanteenItem from "@/components/canteen/CanteenItem";
import { useEffect, useState } from "react";
import { Canteen } from "@/lib/models/CanteenModel";
import {
  Select,
  SelectItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@tremor/react";

export default function Home() {
  const [canteenData, setCanteenData] = useState<Canteen[]>([]);
  const [canteenLoading, setCanteenLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!canteenData.length) {
          const fetchedCanteenData = await canteenService.getAllCanteenData();
          setCanteenData(fetchedCanteenData);
          // console.log("Data fetched");
        } else {
        }
        setCanteenLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mb-20">
      <title>Daftar Kantin</title>
      {canteenLoading ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-4 2xl:grid-cols-5 sm:grid-cols-3  mt-10">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <div key={index}>
              <div className="bg-white relative animate-pulse p-4 rounded-2xl">
                <div className="aspect-square h-[300] w-full overflow-hidden rounded-lg bg-gray-200"></div>
                <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-400"></p>
                <p className="mt-2 block h-4 rounded-lg bg-gray-400 text-sm font-medium"></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* <div className="rounded-2xl pt-3 flex justify-between bg-white shadow-md px-6 pb-4 mt-6">
            <div className="w-1/5">
              <Select
                defaultValue="semua"
                className=""
              >
                <SelectItem value="semua" className="">
                  Semua
                </SelectItem>
                <SelectItem value="makanan" className="">
                  Makanan
                </SelectItem>
                <SelectItem value="minuman">Minuman</SelectItem>
                <SelectItem value="cemilan">Cemilan</SelectItem>
              </Select>
            </div>
          </div> */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 2xl:grid-cols-5 sm:grid-cols-3  mt-10">
            {canteenData.map((canteen) => (
              <CanteenItem key={canteen.slug} canteen={canteen} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
