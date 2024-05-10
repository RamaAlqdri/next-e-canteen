import data from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/products/AddToCart";
import productsService from "@/lib/services/productService";

import { formatRupiah } from "@/lib/utils";
import canteenService from "@/lib/services/canteenService";
import { getSession, useSession } from "next-auth/react";
import Detail from "./Detail";

export async function generateMetadata({
  params,
}: {
  params: { productId: string; canteenId: string };
}) {
  const product = await productsService.getProductById(
    params.canteenId,
    params.productId
  );

  if (!product) {
    return { title: "Product not Found" };
  }
  return {
    title: product.name,
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { productId: string; canteenId: string };
}) {
  // const { data: session } = useSession();
  // console.log(session);
  const canteen = await canteenService.getCanteenData(params.canteenId);
  const product = await productsService.getProductById(
    params.canteenId,
    params.productId
  );
  // const product = await productsService.getProduct(params.productSlug, params.canteenSlug)
  // const canteen = await canteenService.getCanteenData(product.canteenId);
  if (!product) {
    return <div>Product Not Found</div>;
  }
  return (
    <>
      <Detail canteen={canteen} product={product} />
    </>
  );
}
