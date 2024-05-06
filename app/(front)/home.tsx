"use client";

import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";
import productsService from "@/lib/services/productService";
import { Metadata } from "next";
import Link from "next/link";
import { convertDocToObj } from "@/lib/utils";
import { useEffect, useState } from "react";
import canteenService from "@/lib/services/canteenService";
import CanteenItem from "@/components/canteen/CanteenItem";
import Image from "next/image";
import { Product } from "@/lib/models/ProductModels";
import { Canteen } from "@/lib/models/CanteenModel";

const Beranda = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const [canteen, setCanteen] = useState<Canteen[]>([]);
  const [canteenLoading, setCanteenLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await productsService.getAllProducts();
      setProducts(data);
      setProductLoading(false);
    };
    const fetchCanteen = async () => {
      const data = await canteenService.getAllCanteenData();
      setCanteen(data);
      setCanteenLoading(false);
    };
    if (productLoading && canteenLoading) {
      fetchProducts();
      fetchCanteen();
    }
  }, [canteenLoading, productLoading]);

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
      {canteenLoading && (
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
      )}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-3">
        {!canteenLoading &&
          canteen
            .slice(0, 6)
            .map((canteen) => (
              <CanteenItem key={canteen.slug} canteen={canteen} />
            ))}
      </div>
      <div className="mt-3">
        <p className="text-md font-medium">Rekomendasi Makanan</p>
        <p className="sm:hidden contents text-xs font-light">
          Kami pilihin yang enak dan favorit
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-3">
        {products.map((product) => (
          // <div key={product._id}>{product.name}</div>
          <ProductItem
            key={product.slug}
            product={product}
            canteenName={product.canteenId}
          />
        ))}
      </div>
    </div>
  );
};
export default Beranda;
