
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/products/AddToCart";
import productsService from "@/lib/services/productService";

import { formatRupiah } from "@/lib/utils";
import canteenService from "@/lib/services/canteenService";
import { getSession, useSession } from "next-auth/react";
import Detail from "./Detail";


export default async function ProductDetails({
  params,
}: {
  params: { productId: string; canteenId: string };
}) {
  // const { data: session } = useSession();
  // console.log(session);
  
  return (
    <>
      <Detail canteenId={params.canteenId} productId={params.productId} />
    </>
  );
}
