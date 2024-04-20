/* eslint-disable @next/next/no-img-element */
import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";
import productsService from "@/lib/services/productService";
import { Metadata } from "next";
import Link from "next/link";
import { convertDocToObj } from "@/lib/utils";
import { useEffect } from "react";
import canteenService from "@/lib/services/canteenService";
import CanteenItem from "@/components/canteen/CanteenItem";

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
        {featuredProducts.map((product, index) => (
          <div
            key={product._id}
            id={`slide-${index}`}
            className="carousel-item relative w-full"
          >
            <Link href={`/product/${product.slug}`}>
              <img src={product.banner} alt={product.name} className="w-full" />
            </Link>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }`}
                className="btn btn-circle"
              >
                ◀︎
              </a>
              <a
                href={`#slide-${
                  index === featuredProducts.length - 1 ? 0 : index + 1
                }`}
                className="btn btn-circle"
              >
                ▶︎
              </a>
            </div>
          </div>
        ))}
      </div> */}

      {/* <h2 className="text-2xl py-2">Welcome </h2> */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10">
        {canteen.map((canteen) => (
          <CanteenItem key={canteen.slug} canteen={canteen}/>
        
        ))}
        
        {/* {products.map((product) => (
          
          // <div key={product._id}>{product.name}</div>
          <ProductItem key={product.slug} product={product} />
        ))} */}
      </div>
    </>
  );
}
