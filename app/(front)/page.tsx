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
import Beranda from "./home";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "e-Canteens",
  description: process.env.NEXT_PUBLIC_APP_DESC || "e-Canteen, lorem ipsum",
};

export default async function Home() {
  // const featuredProducts = await productsService.getFeatured();
  // const canteen = await canteenService.getAllCanteenData();
  // const products = await productsService.getAllProducts();
  return <Beranda></Beranda>;
}
