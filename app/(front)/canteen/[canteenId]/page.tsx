
import data from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/products/AddToCart";
import productsService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils";
import { formatRupiah } from "@/lib/utils";
import canteenService from "@/lib/services/canteenService";
import ProductItem from "@/components/products/ProductItem";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";

import { Metadata } from "next";
import Detail from "./Detail";

export async function generateMetadata({
  params,
}: {
  params: { canteenId: string };
}) {
  const canteen = await canteenService.getCanteenData(params.canteenId);
  if (!canteen) {
    return { title: "Product not Found" };
  }
  return {
    title: canteen.name,
  };
}

export default async function Canteen({
  params,
}: {
  params: { canteenId: string };
}) {
  const canteen = await canteenService.getCanteenData(params.canteenId);

  const products = await productsService.getAllProductsFromCanteen(params.canteenId);


  // const [product1, setProduct1] = useState(products[0]);

  // const [productList, setProductList] = useState(products);

  // console.log(canteen);
  // console.log(canteenId);
  // console.log(products);

  return (
    <>
      <Detail canteen={canteen} products={products} />
    </>
  );
}
