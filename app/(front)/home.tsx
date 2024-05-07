"use client";

import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";
import productsService from "@/lib/services/productService";
import { Metadata } from "next";
import Link from "next/link";
import { convertDocToObj } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import canteenService from "@/lib/services/canteenService";
import CanteenItem from "@/components/canteen/CanteenItem";
import Image from "next/image";
import { Product } from "@/lib/models/ProductModels";
import { Canteen } from "@/lib/models/CanteenModel";
import Skeleton from "@/components/handle/skeleton";
import Await from "@/components/handle/await";

const Beranda = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const [canteen, setCanteen] = useState<Canteen[]>([]);
  const [canteenLoading, setCanteenLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const productsData = await productsService.getAllProducts();
  //       setProducts(productsData);
  //       const canteenData = await canteenService.getAllCanteenData();
  //       setCanteen(canteenData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setProductLoading(false);
  //       setCanteenLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
  const promiseCanteen = canteenService.getAllCanteenData();
  const promiseProduct = productsService.getAllProducts();

  return (
    <div className="mb-20">
      <div className="w-full mt-4">
        <div className="carousel-item rounded-2xl relative w-full">
          <Image
            src="/images/banner/banner1.png"
            width={2000}
            height={2000}
            alt="banner"
            className="w-full relative rounded-2xl"
          />
        </div>
      </div>

      <div className="mt-3 ">
        <p className="text-md font-medium">Rekomendasi Kantin</p>
        <p className="sm:hidden contents text-xs font-light">
          Kami pilihin kantin favorit Universitas Mataram
        </p>
      </div>
      {/* {canteenLoading && (
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between w-full ">
            <div className="skeleton h-72 w-52 bg-gray-200"></div>
            <div className="skeleton h-72 w-52 bg-gray-200"></div>
            <div className="skeleton h-72 w-52 bg-gray-200"></div>
          </div>
          <div className="flex justify-between w-full ">
            <div className="skeleton h-72 w-52 bg-gray-200"></div>
            <div className="skeleton h-72 w-52 bg-gray-200"></div>
            <div className="skeleton h-72 w-52 bg-gray-200"></div>
          </div>
        </div>
      )} */}
      <Suspense fallback={<Skeleton />}>
        <Await promise={promiseCanteen}>
          {(canteenData) => (
            <>
              <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-3">
                {canteenData.slice(0, 6).map((canteen: any) => (
                  <CanteenItem key={canteen.slug} canteen={canteen} />
                ))}
              </div>
            </>
          )}
        </Await>
      </Suspense>
      <div className="mt-3">
        <p className="text-md font-medium">Rekomendasi Makanan</p>
        <p className="sm:hidden contents text-xs font-light">
          Kami pilihin yang enak dan favorit
        </p>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Await promise={promiseProduct}>
          {(products) => (
            <>
              <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-3">
                {products.map((product) => (
                  <ProductItem
                    key={product.slug}
                    product={product}
                    canteenName={product.canteenId}
                  />
                ))}
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};
export default Beranda;
