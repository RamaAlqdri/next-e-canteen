import { Product } from "@/lib/models/ProductModels";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatRupiah } from "@/lib/utils";
import AddToCart from "./AddToCart";
import { convertDocToObj } from "@/lib/utils";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card bg-base-200 mb-0 sm:mb-4 ">
      <div className="flex sm:grid">
        <div className="h-32 w-32 sm:h-96 sm:w-full m-2 sm:m-0">
          <Link href={`/product/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-cover sm:h-96 h-32 w-32 rounded-2xl sm:w-full"
            />
          </Link>
        </div>
        <div className="sm:card-body w-2/3 sm:w-full flex flex-col justify-between m-4 sm:m-0 sm:flex-none sm:justify-normal sm:grid ">
          <Link href={`/product/${product.slug}`}>
            <h2 className="card-title font-normal ">{product.name}</h2>
          </Link>
          <p className="mb-2">{product.brand}</p>
          <div className="flex justify-between">
            <div className="card-actions flex sm:items-center items-end justify-between">
              <span className="sm:text-2xl text-lg font-semibold">
                Rp {formatRupiah(product.price)},00
              </span>
              {"  "}
            </div>
            <div>
              <AddToCart
                item={{
                  ...convertDocToObj(product),
                  qty: 0,
                  color: "",
                  size: "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
