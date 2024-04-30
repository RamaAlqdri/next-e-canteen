/* eslint-disable @next/next/no-img-element */
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

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "e-Canteens",
  description: process.env.NEXT_PUBLIC_APP_DESC || "e-Canteen, lorem ipsum",
};

export default async function Home() {

  // const featuredProducts = await productsService.getFeatured();
  const canteen = await canteenService.getAllCanteenData();
  const products = await productsService.getAllProducts();
  return (
    <>
      {/* <div className="w-full carousel rounded-box mt-4">
        {products.map((product, index) => (
          <div
            key={product._id}
            id={`slide-${index}`}
            className="carousel-item relative w-full"
          >
            <Link href={`/product/${product.slug}`}>
              <Image
                src={product.image}
                width={500}
                height={500}
                alt={product.name}
                className="w-full"
              />
            </Link>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide-${index === 0 ? products.length - 1 : index - 1}`}
                className="btn btn-circle"
              >
                ◀︎
              </a>
              <a
                href={`#slide-${index === products.length - 1 ? 0 : index + 1}`}
                className="btn btn-circle"
              >
                ▶︎
              </a>
            </div>
          </div>
        ))}
      </div> */}
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

      {/* <h2 className="text-2xl py-2">Welcome </h2> */}
      <div className="mt-3">
        <p className="text-lg font-medium">Daftar Kantin</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-3">
        {canteen.slice(0, 6).map((canteen) => (
          <CanteenItem key={canteen.slug} canteen={canteen} />
        ))}
      </div>
      <div className="mt-3">
        <p className="text-lg font-medium">Rekomendasi Makanan</p>
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
    </>
  );
}
