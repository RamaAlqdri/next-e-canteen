"use client";

import { Canteen } from "@/lib/models/CanteenModel";
import { Product } from "@/lib/models/ProductModels";
import Image from "next/image";
import ProductItem from "@/components/products/ProductItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { text } from "stream/consumers";

const Detail = ({
  canteen,
  products,
}: {
  canteen: Canteen;
  products: Product[];
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  let categoryList = ['semua','makanan', 'minuman', 'cemilan', ]
  
  const [productList, setProductList] = useState(products);

  const setProductbycategory = (category: string) => {
    if (category === 'semua') {
      setProductList(products)
    } else {
      setProductList(products.filter((product) => product.category === category))
    }
  }
  const setNewCategory = (category: string) => {
    setCategory(category)
    setProductbycategory(category)
  }

  const [category, setCategory] = useState("semua");

  


  
  if (!canteen) {
    return <div>Canteen Not Found</div>;
  }
  return (
    <>
      <div className="w-full mt-2 md:h-36 shadow-lg h-24 flex bg-white justify-between items-center  rounded-t-2xl rounded-b-md px-4  ">
        <div className="md:h-full  justify-center flex items-center ">
          <div className="sm:h-16 sm:w-16 relative  md:w-24 md:h-24  h-16 w-16">
            <Image
              src={canteen.image}
              alt={canteen.name}
              width={300}
              height={300}
              className="object-cover h-full w-full rounded-xl  "
            />
          </div>
        </div>
        <div className=" ml-4 w-full flex flex-col   md:h-24 ">
          <div className="flex justify-between">
            <div className="flex">
              <p className="font-semibold text-lg align-top ">{canteen.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <svg
              width="22"
              height="28"
              viewBox="0 0 22 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
            >
              <path
                d="M11 0C8.08369 0.00344047 5.28779 1.16347 3.22564 3.22563C1.16348 5.28778 0.00345217 8.08367 1.17029e-05 11C-0.00348119 13.3832 0.774992 15.7018 2.21601 17.6C2.21601 17.6 2.51601 17.995 2.56501 18.052L11 28L19.439 18.047C19.483 17.994 19.784 17.6 19.784 17.6L19.785 17.597C21.2253 15.6996 22.0034 13.3821 22 11C21.9966 8.08367 20.8365 5.28778 18.7744 3.22563C16.7122 1.16347 13.9163 0.00344047 11 0ZM11 15C10.2089 15 9.43553 14.7654 8.77773 14.3259C8.11993 13.8864 7.60724 13.2616 7.30449 12.5307C7.00174 11.7998 6.92253 10.9956 7.07687 10.2196C7.23121 9.44371 7.61217 8.73098 8.17158 8.17157C8.73099 7.61216 9.44373 7.2312 10.2197 7.07686C10.9956 6.92252 11.7998 7.00173 12.5307 7.30448C13.2616 7.60723 13.8864 8.11992 14.3259 8.77772C14.7654 9.43552 15 10.2089 15 11C14.9987 12.0605 14.5768 13.0771 13.827 13.827C13.0771 14.5768 12.0605 14.9987 11 15Z"
                fill="gray"
              />
            </svg>
            <p className="font-light text-sm">{canteen.location}</p>
          </div>

          <p className="font-light text-xs text-clip overflow-hidden bg-gray-50 h-16 md:block  hidden  rounded-lg px-2 py-2 ">
            {canteen.description}
          </p>
        </div>
      </div>
      <div className="mt-2 bg-white rounded-b-2xl rounded-t-md shadow-md py-3 px-3 flex justify-between">
        <ul className="flex space-x-2">
          {categoryList.map((categoryItem) => (
            <button
              key={categoryItem}
              onClick={() => setNewCategory(categoryItem)}
              // onClick={() => setCategory(category)}
              className={`capitalize sm:py-1 sm:px-3  px-1  sm:text-sm text-[0.6rem] rounded-xl border-[0.5px]  sm:border-2 border-[#EEA147] hover:text-white hover:bg-[#EEA147] ${
              categoryItem === category ? " bg-[#EEA147] text-white" : "text-[#EEA147]"
            }`}
            >
              {categoryItem}
            </button>
          ))}
        </ul>
        
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {productList.map((product: any) => (
          <ProductItem
            key={product.slug}
            product={product}
            canteenName={canteen.name}
          />
        ))}
      </div>
    </>
  );
};

export default Detail;
