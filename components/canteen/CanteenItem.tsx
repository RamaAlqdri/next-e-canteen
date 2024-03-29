import { Product } from "@/lib/models/ProductModels";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatRupiah } from "@/lib/utils";
// import AddToCart from "./AddToCart";
import { convertDocToObj } from "@/lib/utils";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card bg-base-200  mb-4">
      <figure>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover h-64 w-full"
          />
        </Link>
      </figure>
      <div className="card-body">
        <Link href={`/product/${product.slug}`}>
          <h2 className="card-title font-normal ">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <div className="flex justify-between">
          <div className="card-actions flex items-center justify-between">
            <span className="text-2xl font-semibold">
              Rp {formatRupiah(product.price)},00
            </span>
            {"  "}
          </div>
          
        </div>
      </div>
    </div>
  );
}
