import data from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/products/AddToCart";
import productsService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils";
import { formatRupiah } from "@/lib/utils";
import canteenService from "@/lib/services/canteenService";
import ProductItem from "@/components/products/ProductItem";

export async function generateMetadata({
  params,
}: {
  params: { canteenSlug: string };
}) {
  const canteen = await canteenService.getCanteenBySlug(params.canteenSlug);
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
  params: { canteenSlug: string };
}) {
  const canteen = await canteenService.getCanteenBySlug(params.canteenSlug);
  const canteenId = await canteenService.getCanteenIdBySlug(params.canteenSlug);
  const products = await productsService.getAllProductsFromCanteen(canteenId);

  if (!canteen) {
    return <div>Canteen Not Found</div>;
  }
  return (
    <>
      <div className="w-full h-36 flex justify-between items-center  rounded-xl px-4  ">
        <div className="h-full   justify-center flex items-center">
          <div className="h-24 relative w-24 ">
            <Image
              src={canteen.image}
              alt={canteen.name}
              width={300}
              height={300}
              className="object-cover h-full w-full rounded-full "
            />
          </div>
        </div>
        <div className=" ml-4 w-full flex flex-col  justify-start h-24">
          <p className="font-semibold ">{canteen.name}</p>
          <p className="font-light text-sm">{canteen.location}</p>
          {/* <p className="font-light text-sm">{canteen.description}</p> */}
        </div>
        <div>
          add product
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}
