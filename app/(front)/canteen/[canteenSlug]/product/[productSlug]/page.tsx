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
  params: { productSlug: string; canteenSlug: string };
}) {
  const product = await productsService.getProductBySlugWithoutCanteen(
    params.productSlug
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
  params: { productSlug: string; canteenSlug: string };
}) {
  // const { data: session } = useSession();
  // console.log(session);
  const canteen = await canteenService.getCanteenBySlug(params.canteenSlug);
  const canteenId = (await canteenService.getCanteenIdBySlug(
    params.canteenSlug
  )) as string;
  const product = await productsService.getProductBySlug(
    canteenId,
    params.productSlug
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
