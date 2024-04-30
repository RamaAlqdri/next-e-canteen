"use client";

import { Canteen } from "@/lib/models/CanteenModel";
import { Product } from "@/lib/models/ProductModels";
import Image from "next/image";
import ProductItem from "@/components/products/ProductItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { text } from "stream/consumers";

const Detail = ({}: {}) => {
  const { data: session } = useSession();
  const router = useRouter();

  return <div className="z-50 bg-black  fixed"></div>;
};

export default Detail;
