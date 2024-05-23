"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AreaChart,
  DonutChart,
  Select,
  SelectItem,
  TabGroup,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  DatePicker,
  DatePickerValue,
} from "@tremor/react";
import {
  getStatisticCanteen,
  valueFormatter,
  dataFormatterSingkat,
  dataFormatter,
} from "@/lib/statistic";
import { OrderDetail, OrderItem, dataStatistic } from "@/lib/models/OrderModel";
import { useSession } from "next-auth/react";
import {
  dapatkanWaktu,
  formatRupiah,
  getOrderDescription,
  ubahFormatTanggal,
} from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/models/ProductModels";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { db } from "@/lib/firebase";
import productsService from "@/lib/services/productService";
import ordersService from "@/lib/services/orderService";
import ImageDownloader from "../image/imageShow";
import { Canteen } from "@/lib/models/CanteenModel";
import canteenService from "@/lib/services/canteenService";
// import Papa from "papaparse";
// import { CSVLink, CSVDownload } from "react-csv";

// const order = [
//   {
//     _id: "TRX-8dzc-b1Aj-Hcl",
//     canteenId: "nBxAIxKSeNQPM3tJolxo",
//     createdAt: "2024-05-11T04:38:16.908Z",
//     customerId: "7fJaAEqBz1YtgwKaVWe3",
//     items: [
//       {
//         _id: "LWGNs50hsv3IZ91Ur2rX",
//         canteenId: "nBxAIxKSeNQPM3tJolxo",
//         category: "makanan",
//         countInStock: 4,
//         description: "Makanan Enak",
//         image: "/images/product/product2.jpg",
//         name: "Nasi Kebuli",
//         numReviews: 0,
//         price: 8000,
//         qty: 1,
//         rating: 0,
//         slug: "nasi-kebuli",
//       },
//     ],
//     itemsPrice: 8000,
//     paymentMethod: "QRIS",
//     status: 3,
//     readBy: {
//       customer: false,
//       canteen: true,
//     },
//   },
//   {
//     _id: "TRX-hF2O-HHLki-Nt",
//     canteenId: "nBxAIxKSeNQPM3tJolxo",
//     createdAt: "2024-05-11T12:18:00.951Z",
//     customerId: "7fJaAEqBz1YtgwKaVWe3",
//     items: [
//       {
//         _id: "LWGNs50hsv3IZ91Ur2rX",
//         canteenId: "nBxAIxKSeNQPM3tJolxo",
//         category: "makanan",
//         countInStock: 4,
//         description: "Makanan Enak",
//         image: "/images/product/product2.jpg",
//         name: "Nasi Goreng",
//         numReviews: 0,
//         price: 8000,
//         qty: 3,
//         rating: 0,
//         slug: "nasi-goreng",
//       },
//       {
//         _id: "aL65uv5TH6GKD2LYscVW",
//         canteenId: "nBxAIxKSeNQPM3tJolxo",
//         category: "minuman",
//         countInStock: 2,
//         description: "Minuman Dingin Enak",
//         image: "/images/product/product2.jpg",
//         name: "Es Teh",
//         numReviews: 0,
//         price: 12000,
//         qty: 1,
//         rating: 0,
//         slug: "es-teh",
//       },
//     ],
//     itemsPrice: 36000,
//     paymentMethod: "QRIS",
//     readBy: {
//       customer: false,
//       canteen: false,
//     },
//     status: 5,
//   },
//   {
//     _id: "TRX-wrZu-43GmOKQ7",
//     canteenId: "nBxAIxKSeNQPM3tJolxo",
//     createdAt: "2024-05-11T07:52:09.713Z",
//     customerId: "7fJaAEqBz1YtgwKaVWe3",
//     items: [
//       {
//         _id: "aL65uv5TH6GKD2LYscVW",
//         canteenId: "nBxAIxKSeNQPM3tJolxo",
//         category: "minuman",
//         countInStock: 2,
//         description: "Minuman Dingin Enak",
//         image: "/images/product/product2.jpg",
//         name: "Es Teh",
//         numReviews: 0,
//         price: 12000,
//         qty: 1,
//         rating: 0,
//         slug: "es-teh",
//       },
//       {
//         _id: "LWGNs50hsv3IZ91Ur2rX",
//         canteenId: "nBxAIxKSeNQPM3tJolxo",
//         category: "makanan",
//         countInStock: 4,
//         description: "Makanan Enak",
//         image: "/images/product/product2.jpg",
//         name: "Nasi Goreng",
//         numReviews: 0,
//         price: 8000,
//         qty: 1,
//         rating: 0,
//         slug: "nasi-goreng",
//       },
//     ],
//     itemsPrice: 20000,
//     paymentMethod: "QRIS",
//     readBy: {
//       customer: false,
//       canteen: true,
//     },
//     status: 4,
//   },
//   {
//     _id: "TRX-8AuY-Ys-AXiFv",
//     canteenId: "nBxAIxKSeNQPM3tJolxo",
//     createdAt: "2024-05-17T23:56:46.538Z",
//     customerId: "7fJaAEqBz1YtgwKaVWe3",
//     items: [
//       {
//         _id: "aL65uv5TH6GKD2LYscVW",
//         canteenId: "nBxAIxKSeNQPM3tJolxo",
//         category: "minuman",
//         countInStock: 2,
//         description: "Minuman Dingin Enak",
//         image: "/images/product/product2.jpg",
//         name: "Es Teh",
//         numReviews: 0,
//         price: 12000,
//         qty: 1,
//         rating: 0,
//         slug: "es-teh",
//       },
//     ],
//     itemsPrice: 12000,
//     paymentMethod: "QRIS",
//     readBy: {
//       customer: false,
//       canteen: false,
//     },
//     status: 4,
//   },
// ];

// const products = [
//   {
//     _id: "LWGNs50hsv3IZ91Ur2rX",
//     canteenId: "nBxAIxKSeNQPM3tJolxo",
//     category: "makanan",
//     countInStock: 4,
//     description: "Makanan Enak",
//     image: "/images/product/product2.jpg",
//     name: "Nasi Goreng",
//     numReviews: 0,
//     price: 8000,
//     rating: 0,
//     slug: "nasi-goreng",
//   },
//   {
//     _id: "aL65uv5TH6GKD2LYscVW",
//     canteenId: "nBxAIxKSeNQPM3tJolxo",
//     category: "minuman",
//     countInStock: 2,
//     description: "Minuman Dingin Enak",
//     image: "/images/product/product2.jpg",
//     name: "Es Teh",
//     numReviews: 0,
//     price: 12000,
//     rating: 0,
//     slug: "es-teh",
//   },
//   {
//     _id: "bZK56uvQTR2LYscVW8hF",
//     canteenId: "nBxAIxKSeNQPM3tJolxo",
//     category: "makanan",
//     countInStock: 6,
//     description: "Makanan Lezat dan Bergizi",
//     image: "/images/product/product3.jpg",
//     name: "Ayam Bakar",
//     numReviews: 0,
//     price: 15000,
//     rating: 0,
//     slug: "ayam-bakar",
//   },
// ] as Product[];

const CanteenBeranda = ({ props = "" }: { props: string }) => {
  const [order, setOrder] = useState<OrderDetail[]>([]);
  const { data: session } = useSession();
  let canteenId = "";
  // console.log(session?.user.canteenId);
  if (props !== "") {
    canteenId = props as string;
  } else {
    canteenId = session?.user?.canteenId as string;
  }
  const [numReadOrder, setNumReadOrder] = useState(0);

  // useEffect(() => {
  //   function handleReadOrder() {
  //     const unreadOrder = order.filter((order) => !order.readBy.canteen);
  //     setNumReadOrder(unreadOrder.length);
  //   }
  //   handleReadOrder();
  // });

  useEffect(() => {
    const q = query(
      collection(db, "order"),
      where("canteenId", "==", canteenId)
    );
    const unsubscribe = onSnapshot(
      q,
      async (snapshot: QuerySnapshot<DocumentData>) => {
        const orderData: OrderDetail[] = snapshot.docs.map(
          (doc: any) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as OrderDetail)
        );
        setOrder(orderData);
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              Ringkasan
            </Tab>
            {session?.user.role !== "blu" ? (
              <>
                <Tab value="2">Produk</Tab>
                <Tab value="3">
                  {/* <div className="badge w-5 border-0 ml-16  absolute text-xs rounded-full badge-ePrimary">
                    {numReadOrder}
                  </div> */}
                  Pesanan
                </Tab>
              </>
            ) : (
              <></>
            )}
          </TabList>
          {props !== "" ? (
            <TabPanels className="">
              <TabPanel className="pb-10">
                <Dashboard props={props} orderList={order} />
              </TabPanel>
              <TabPanel className="pb-10">
                <ProductList props={props} />
              </TabPanel>
              <TabPanel className="pb-10">
                <OrderList props={props} orderList={order} />
              </TabPanel>
            </TabPanels>
          ) : (
            <TabPanels className="">
              <TabPanel className="pb-10">
                <Dashboard props={""} orderList={order} />
              </TabPanel>
              <TabPanel className="pb-10">
                <ProductList props={""} />
              </TabPanel>
              <TabPanel className="pb-10">
                <OrderList props={""} orderList={order} />
              </TabPanel>
            </TabPanels>
          )}
        </TabGroup>
      </div>
    </div>
  );
};
export default CanteenBeranda;

const ProductList = ({ props = "" }: { props: string }) => {
  const { data: session } = useSession();
  let canteenId = "";
  if (props !== "") {
    canteenId = props as string;
  } else {
    canteenId = session?.user?.canteenId as string;
  }
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [categories, setCategories] = useState<string>("semua");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!products.length) {
          const fetchedProducts = await productsService.getProductByCanteenId(
            canteenId
          );
          setProducts(fetchedProducts);
        }
        setProductsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {productsLoading ? (
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
                defaultValue="semua"
                onValueChange={(v) => setCategories(v)}
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
            <button
              onClick={() => {
                router.push(`/add_product/${canteenId}`);
              }}
              className="text-xs text-[#EEA147] hover:text-white font-medium hover:bg-[#EEA147] px-2 py-2 border-[#EEA147] border-2 rounded-xl"
            >
              Tambah Produk
            </button>
          </div>
          {products
            .filter(
              (product) =>
                categories === "semua" || product.category === categories
            )
            .map((product) => (
              <div
                key={product.id}
                className="flex justify-between cursor-pointer bg-white space-y-2 py-4 shadow-md hover:bg-gray-50 px-4 w-full  rounded-xl"
              >
                <div className="flex  justify-between  w-full  ">
                  <div
                    className="flex  items-center  w-full  space-x-4"
                    onClick={() => {
                      router.push(
                        `/canteen/${canteenId}/product/${product.id}`
                      );
                    }}
                  >
                    <div className="w-20 h-20">
                      <Image
                        alt={"canteen image"}
                        src={product.image}
                        width={300}
                        height={300}
                        className="aspect-square relative rounded-xl"
                      ></Image>
                    </div>
                    <div className="flex  flex-col justify-between  ">
                      <p className="font-normal text-start ">{product.name}</p>
                      <p className="font-light text-sm capitalize text-gray-500 text-start">
                        {product.category}
                      </p>
                      <p className="font-medium text-md text-start">
                        Rp{formatRupiah(product.price)},00
                      </p>
                    </div>
                  </div>
                  <div className=" h-full"></div>
                  <div className="flex items-start">
                    <button
                      onClick={() => {
                        router.push(`/edit_product/${canteenId}/${product.id}`);
                      }}
                      className="flex  items-center font-normal hover:bg-[#FFEBD7] text-sm p-1 rounded-lg"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M21.4549 5.41595C21.5499 5.56016 21.5922 5.73273 21.5747 5.90454C21.5573 6.07634 21.481 6.23685 21.3589 6.35895L12.1659 15.551C12.0718 15.6449 11.9545 15.7122 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.744C7.48485 16.7097 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0905 7.04888 15.9575 7.08189 15.831L8.08189 12.003C8.11109 11.888 8.16616 11.7813 8.24289 11.691L17.4699 2.46995C17.6105 2.3295 17.8011 2.25061 17.9999 2.25061C18.1986 2.25061 18.3893 2.3295 18.5299 2.46995L21.3589 5.29795C21.3948 5.33396 21.4269 5.37349 21.4549 5.41595ZM19.7679 5.82795L17.9999 4.06095L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.82795Z"
                          fill="#EEA147"
                        />
                        <path
                          d="M19.6411 17.16C19.9144 14.824 20.0017 12.4699 19.9021 10.12C19.8999 10.0646 19.9092 10.0094 19.9293 9.95782C19.9494 9.9062 19.98 9.85928 20.0191 9.82001L21.0031 8.83601C21.0299 8.80897 21.0641 8.79027 21.1013 8.78215C21.1386 8.77404 21.1774 8.77686 21.2131 8.79027C21.2488 8.80368 21.2799 8.82712 21.3026 8.85776C21.3253 8.88841 21.3386 8.92495 21.3411 8.96301C21.5263 11.7542 21.456 14.5566 21.1311 17.335C20.8951 19.357 19.2711 20.942 17.2581 21.167C13.7634 21.554 10.2367 21.554 6.74206 21.167C4.73006 20.942 3.10506 19.357 2.86906 17.335C2.45446 13.7904 2.45446 10.2096 2.86906 6.66501C3.10506 4.64301 4.72906 3.05801 6.74206 2.83301C9.39443 2.53889 12.0668 2.46764 14.7311 2.62001C14.7692 2.62275 14.8057 2.63635 14.8364 2.65922C14.867 2.68209 14.8904 2.71325 14.9039 2.74903C14.9174 2.78481 14.9203 2.82369 14.9124 2.86108C14.9044 2.89847 14.8859 2.93281 14.8591 2.96001L13.8661 3.95201C13.8272 3.99076 13.7807 4.02113 13.7297 4.04125C13.6786 4.06137 13.6239 4.07082 13.5691 4.06901C11.3458 3.99343 9.12001 4.07866 6.90906 4.32401C6.263 4.39552 5.65991 4.68273 5.19721 5.13926C4.73451 5.59579 4.43923 6.19497 4.35906 6.84001C3.9581 10.2683 3.9581 13.7317 4.35906 17.16C4.43923 17.805 4.73451 18.4042 5.19721 18.8608C5.65991 19.3173 6.263 19.6045 6.90906 19.676C10.2641 20.051 13.7361 20.051 17.0921 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8608C19.2666 18.4042 19.5609 17.805 19.6411 17.16Z"
                          fill="#EEA147"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const OrderList = ({
  props = "",
  orderList,
}: {
  props: string;
  orderList: OrderDetail[];
}) => {
  const { data: session } = useSession();
  let canteenId = "";
  if (props !== "") {
    canteenId = props as string;
  } else {
    canteenId = session?.user?.canteenId as string;
  }
  const router = useRouter();

  const [filter, setFilter] = useState(0);
  // const updateReadBy = async (orderId: string) => {
  //   const order = orderList.find((order) => order.id === orderId);
  //   if (order) {
  //     ordersService.updateReadOrder(order.id as string)
  //     console.log(order);
  //   }
  // }

  return orderList.length === 0 ? (
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
          <div>
            {/* <ImageDownloader imagePath={"gs://e-canteen-v1.appspot.com/canteen/avatar/_84081ce3-edb3-417a-a06d-bce6d1a9f13d.jpeg"}/> */}
          </div>
          <Select
            defaultValue="0"
            className=""
            onValueChange={(v) => setFilter(parseInt(v))}
          >
            <SelectItem value="0" className="">
              Semua
            </SelectItem>
            <SelectItem value="1">Belum Selesai</SelectItem>
            <SelectItem value="6">Selesai</SelectItem>
            <SelectItem value="7">Dibatalkan</SelectItem>
          </Select>
        </div>
      </div>
      {orderList
        .filter((order) => {
          if (filter === 0) {
            return true;
          } else if (filter === 1) {
            return (
              order.status !== 6 && order.status !== 7 && order.status !== 5
            );
          } else if (filter === 6) {
            return order.status === 6 || order.status === 5;
          } else {
            return order.status === filter;
          }
        })
        .map((order) => (
          <button
            onClick={() => {
              // updateReadBy(order.id as string);
              router.push(`/placeorder/${order.id}`);
            }}
            key={order.id}
            className={` space-y-2 py-5 bg-white shadow-md hover:bg-gray-50 px-5 w-full  rounded-xl 
            `}
            // ${order.readBy.canteen ? "bg-white" : "bg-[#FFEBD7]"}
          >
            <div className="flex space-x-2 text-xs">
              <p>{ubahFormatTanggal(order.createdAt)},</p>
              <p>{dapatkanWaktu(order.createdAt)}</p>
            </div>
            <div className="flex  justify-between  ">
              <div className="flex  items-center  space-x-4">
                <div className="flex  flex-col  h-full  ">
                  {/* <Await promise={promiseUser(order.customerId)}>
                  {(user) => (
                    <p className="font-medium text-start">{user?.name}</p>
                  )}
                </Await> */}
                  {/* <p className="font-medium text-start">
                        {order.orderBy?.fullName}
                      </p> */}
                  <p className="text-sm truncate text-start w-[20rem] font-light text-gray-500">
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
    </div>
  );
};

const Dashboard = ({
  props = "",
  orderList,
}: {
  props: string;
  orderList: OrderDetail[];
}) => {
  const { data: session } = useSession();
  let canteenId = "";
  if (props !== "") {
    canteenId = props as string;
  } else {
    canteenId = session?.user?.canteenId as string;
  }
  const [dateValue, setDateValue] = useState<Date>(new Date());
  const [canteenData, setCanteenData] = useState<Canteen>();
  const [typeData, setTypeData] = useState<string>("harian");

  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const [data, setData] = useState<any>([]);
  const [dataMakanan, setDataMakanan] = useState<any>([]);
  const [index, setIndex] = useState("");

  const [dataArray, setDataArray] = useState<dataStatistic[]>([]);

  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const downloadPDF = (
    canteenName: string,
    pendapatan: any,
    index: string,
    date: Date
  ) => {
    // Generate the data array from your existing function
    const data = makeData(canteenName, pendapatan);
    let contextHeader = "";
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
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

    if (index === "Jam") {
      // console.log(date.getDate());
      contextHeader = `${days[date.getDay()]}, ${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
      // console.log(contextHeader);
    } else if (index === "Minggu") {
      contextHeader = `Bulan ${months[date.getMonth()]} ${date.getFullYear()}`;
    } else if (index === "Bulan") {
      contextHeader = `Tahun ${date.getFullYear().toString()}`;
    }

    const doc = new jsPDF();
    const headers = data[0];
    const body = data.slice(1);

    doc.text(`Laporan Pendapatan ${canteenName}`, 105, 20, { align: "center" });
    doc.text(`${contextHeader}`, 105, 30, { align: "center" });
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

    doc.save(`Laporan_Pendapatan_${canteenName}.pdf`);
  };
  const makeData = (canteenName: string, pendapatan: any) => {
    let header = "";
    if (typeData === "bulanan") {
      header = "Tanggal";
    } else if (typeData === "tahunan") {
      header = "Bulan";
    } else {
      return [
        ["Nama Kantin", "Total Transaksi", "Pendapatan"],
        [canteenName, totalTransaksi, String(`Rp${formatRupiah(pendapatan)}`)],
      ];
    }
    return [
      ["Nama Kantin", header, "Total Transaksi", "Pendapatan"],
      ...dataArray.map((item) => [
        canteenName,
        item.Date,
        item.TotalTransaksi,
        String(`Rp${formatRupiah(item.Pendapatan)}`),
      ]),
      ["Total Pendapatan", "", "", String(`Rp${formatRupiah(pendapatan)}`)],
    ];
  };

  const handleStatistic = (order: OrderDetail[], date: Date) => {
    setLoading(true);
    const {
      dataHasil,
      totalPendapatanHasil,
      dataMakananHasil,
      totalTransaksiHasil,
      data,
    } = getStatisticCanteen(typeData, order, date);
    setTotalTransaksi(totalTransaksiHasil as number);
    setTotalPendapatan(totalPendapatanHasil);
    setData(dataHasil);
    setDataMakanan(dataMakananHasil);
    setDataArray(data);
    if (typeData === "harian") {
      setIndex("Jam");
    } else if (typeData === "bulanan") {
      setIndex("Minggu");
    } else if (typeData === "tahunan") {
      setIndex("Bulan");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const canteenData = await canteenService.getCanteenData(canteenId);
        setCanteenData(canteenData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(typeData); // Ini akan mencetak nilai terkini dari typeData setiap kali typeData berubah
    handleStatistic(
      orderList.filter((order) => order.status === 6),
      dateValue
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeData, dateValue]);

  return loading ? (
    <div className=" space-y-4">
      <div className="w-full animate-pulse bg-white rounded-b-2xl p-6 h-[5rem]">
        <div className="w-full h-full bg-gray-200 rounded-xl"></div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className=" w-full h-52 flex flex-col items-center  bg-white shadow-md p-6 rounded-2xl">
          <div className="w-full h-1/5 bg-gray-200  rounded-xl"></div>
          <div className="w-full h-3/5 mt-6 aspect-square bg-gray-200  rounded-2xl"></div>
        </div>
        <div className=" w-full h-52 flex flex-col items-center  bg-white shadow-md p-6 rounded-2xl">
          <div className="w-full h-1/5 bg-gray-200  rounded-xl"></div>
          <div className="w-full h-3/5 mt-6 aspect-square bg-gray-200  rounded-2xl"></div>
        </div>
      </div>
      <div className="h-[23rem] w-full animate-pulse bg-white p-6 rounded-2xl ">
        <div className="w-full h-[2rem] bg-gray-200  rounded-xl "></div>
        <div className="w-full h-5/6 mt-6 aspect-square bg-gray-200  rounded-2xl"></div>
      </div>
    </div>
  ) : (
    <div className="space-y-4 ">
      <div className="rounded-b-2xl pt-3 flex justify-between bg-white shadow-md px-6 pb-4">
        <div className="w-1/5 flex space-x-2">
          <Select
            defaultValue="harian"
            onValueChange={(v) => {
              setTypeData(v)
              //  console.log(typeData);
            }}
            className=""
          >
            <SelectItem value="harian" className="">
              Harian
            </SelectItem>
            <SelectItem value="bulanan">Bulanan</SelectItem>
            <SelectItem value="tahunan">Tahunan</SelectItem>
          </Select>
        </div>
        <div className="flex space-x-2">
          <div className="">
            <DatePicker
              value={dateValue}
              enableClear={false}
              enableYearNavigation
              onValueChange={(v) => {
                // console.log(v);
                if (v !== undefined) {
                  setDateValue(v as Date);
                }
              }}
              placeholder="Pilih Tanggal"
            />
          </div>
          <button
            onClick={() => {
              // downloadCSV("data.csv", "", totalPendapatan, index);
              downloadPDF(
                canteenData?.name as string,
                totalPendapatan,
                index,
                dateValue
              );
            }}
            className="text-xs text-red-600 hover:text-white font-medium hover:bg-red-600 px-2 py-2 border-red-600 border-2 rounded-xl"
          >
            Ekspor PDF
          </button>
          {session?.user.role !== "blu" && (
            <button
              onClick={() => {
                router.push(`/edit_canteen/${canteenId}`);
              }}
              className="text-xs text-[#EEA147] hover:text-white font-medium hover:bg-[#EEA147] px-2 py-2 border-[#EEA147] border-2 rounded-xl"
            >
              Edit Kantin
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 space-x-4 ">
        <div className="col-span-1 py-4  space-y-2 px-4 bg-white  shadow-md rounded-xl">
          <p className="text-sm text-gray-500">Penjualan Produk</p>
          <DonutChart
            className="py-4"
            data={dataMakanan}
            variant="donut"
            valueFormatter={valueFormatter}
            onValueChange={(v) => console.log(v)}
            colors={[
              "orange-100",
              "orange-500",
              "orange-200",
              "orange-800",
              "orange-300",
              "orange-700",
              "orange-400",
              "orange-600",
              "orange-500",
              "orange-100",
              "orange-900",
              "orange-200",
              "orange-800",
              "orange-300",
              "orange-700",
              "orange-400",
              "orange-600",
              "orange-500",
              "orange-100",
              "orange-900",
              "orange-200",
              "orange-800",
              "orange-300",
              "orange-700",
              "orange-400",
              "orange-600",
              "orange-500",
              "orange-100",
              "orange-900",
              "orange-200",
              "orange-800",
              "orange-300",
              "orange-700",
              "orange-400",
              "orange-600",
              "orange-500",
            ]}
          />
        </div>
        <div className="col-span-1 py-4  space-y-2 px-4 bg-white  shadow-md rounded-xl">
          <p className="text-sm text-gray-500">Total Pendapatan</p>
          <div className="drop-shadow-[0px_0px_30px_rgba(249,115,21,1)] flex items-center justify-center w-full h-4/5">
            <span className="text-3xl font-semibold text-orange-400  p-2  ">
              {dataFormatter(totalPendapatan)}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white shadow-md rounded-xl">
        <p className="text-sm text-gray-500">Grafik Pendapatan</p>
        <AreaChart
          className="w-full h-96 "
          data={data}
          index={index}
          categories={["Pendapatan"]}
          colors={["orange-500"]}
          // showYAxis={false}
          valueFormatter={dataFormatterSingkat}
          yAxisWidth={60}
        />
      </div>
    </div>
  );
};
