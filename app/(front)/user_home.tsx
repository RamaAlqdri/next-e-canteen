"use client";

import ProductItem from "@/components/products/ProductItem";

import productsService from "@/lib/services/productService";

import { useEffect, useState } from "react";
import canteenService from "@/lib/services/canteenService";
import CanteenItem from "@/components/canteen/CanteenItem";
import Image from "next/image";
import Skeleton from "@/components/handle/skeleton";
import { Canteen } from "@/lib/models/CanteenModel";
import { Product } from "@/lib/models/ProductModels";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserBeranda = () => {
  const [canteenData, setCanteenData] = useState<Canteen[]>([]);
  const [canteenLoading, setCanteenLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const router = useRouter();

  const { data: session } = useSession();
  // console.log(session);

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
        if (!products.length) {
          const fetchedProducts = await productsService.getAllProducts();
          setProducts(fetchedProducts);
        }
        setProductLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <div className="mt-3 flex space-x-2">
        <p className="text-md font-medium">Kantin di Universitas Mataram</p>
        {/* <p className="sm:hidden contents text-xs font-light">
          Kami pilihin kantin favorit Universitas Mataram
        </p> */}
        <button onClick={()=>{
          router.push('/canteens')
        }}
        className="btn-ePrimary text-[0.65rem] px-2 rounded-lg font-light ">lihat semua</button>
      </div>

      {canteenLoading ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-4 2xl:grid-cols-5 sm:grid-cols-3 mt-3">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index}>
              <div key={index} className="bg-white relative animate-pulse p-4 rounded-2xl">
                <div className="aspect-square h-[300] w-full overflow-hidden rounded-lg bg-gray-200"></div>
                <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-400"></p>
                <p className="mt-2 block h-4 rounded-lg bg-gray-400 text-sm font-medium"></p>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-4 2xl:grid-cols-5 sm:grid-cols-3 mt-3">
          {canteenData.slice(0, 6).map((canteen: any) => (
            <CanteenItem key={canteen.slug} canteen={canteen} />
          ))}
        </div>
      )}
      <div className="mt-3">
        <p className="text-md font-medium">Rekomendasi Makanan</p>
        {/* <p className="sm:hidden contents text-xs font-light">
          Kami pilihin yang enak dan favorit
        </p> */}
      </div>
      {productLoading ? (
        <div className="grid grid-cols-2 gap-2 sm:gap-4 2xl:grid-cols-5 sm:grid-cols-3 mt-3">
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index}>
            <div key={index} className="bg-white relative animate-pulse p-4 rounded-2xl">
              <div className="aspect-square h-[300] w-full overflow-hidden rounded-lg bg-gray-200"></div>
              <p className="mt-2 h-4 w-1/2 rounded-lg bg-gray-400"></p>
              <p className="mt-2 block h-4 rounded-lg bg-gray-400 text-sm font-medium"></p>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:gap-4 2xl:grid-cols-5 sm:grid-cols-3 mt-3">
          {products.map((product) => (
            <ProductItem
              key={product.slug}
              product={product}
              // canteenName={product.canteenId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default UserBeranda;
