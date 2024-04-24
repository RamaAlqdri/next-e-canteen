"use client";

import { Canteen } from "@/lib/models/CanteenModel";
import { Product } from "@/lib/models/ProductModels";
import Image from "next/image";
import ProductItem from "@/components/products/ProductItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Detail = ({ canteen, products }: { canteen: Canteen; products: any }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const addProduct = () => {
    // router.push(`/add_product?canteen=${canteen.slug}`);
    router.push("/add_product");}

//   console.log(session?.user.canteen);
  if (!canteen) {
    return <div>Canteen Not Found</div>;
  }
  return (
    <>
      <div className="w-full h-36 flex justify-between items-center  rounded-xl px-4  ">
        <div className="h-full justify-center flex items-center">
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
        {session && session?.user.canteen === canteen.slug && (
          <button onClick={addProduct} className="btn btn-primary">add product</button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.map((product: any) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
};

export default Detail;
