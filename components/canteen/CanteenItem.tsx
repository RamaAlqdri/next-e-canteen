import { Product } from "@/lib/models/ProductModels";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { formatRupiah } from "@/lib/utils";
// import AddToCart from "./AddToCart";
import { convertDocToObj } from "@/lib/utils";
import { Canteen } from "@/lib/models/CanteenModel";
import ImageDisplay from "../image/imageShow";

export default function CanteenItem({ canteen }: { canteen: Canteen }) {
  return (
    <div className="rounded-3xl hover:brightness-90  cursor-pointer bg-white drop-shadow-md mb-0 sm:mb-4  ">
      <div className="   ">
        <div className="w-full aspect-square  h-[65%]  sm:w-full p-3">
          <Link href={`/canteen/${canteen.id}`} className="">
            <ImageDisplay
            path={canteen.image}
            defaultPath="/images/canteen/default.jpg"
            imgStyle="object-cover aspect-square h-full rounded-2xl  w-full"
            />
            {/* <Image
              src={canteen.image}
              alt={canteen.name}
              width={300}
              height={300}
              className="object-cover h-full rounded-2xl  w-full"
            /> */}
          </Link>
        </div>
        <div className="pb-4 pl-4    justify-normal ">
          <Link href={`/canteen/${canteen.id}`} className="">
            <h2 className=" font-semibold text-sm ">
              {canteen.name}
            </h2>
          </Link>
          <div className="mb-1 mt-1 flex gap-2 items-center">
            <div className=" h-3 w-3">
              <svg
                width="22"
                height="28"
                viewBox="0 0 22 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 "
              >
                <path
                  d="M11 0C8.08369 0.00344047 5.28779 1.16347 3.22564 3.22563C1.16348 5.28778 0.00345217 8.08367 1.17029e-05 11C-0.00348119 13.3832 0.774992 15.7018 2.21601 17.6C2.21601 17.6 2.51601 17.995 2.56501 18.052L11 28L19.439 18.047C19.483 17.994 19.784 17.6 19.784 17.6L19.785 17.597C21.2253 15.6996 22.0034 13.3821 22 11C21.9966 8.08367 20.8365 5.28778 18.7744 3.22563C16.7122 1.16347 13.9163 0.00344047 11 0ZM11 15C10.2089 15 9.43553 14.7654 8.77773 14.3259C8.11993 13.8864 7.60724 13.2616 7.30449 12.5307C7.00174 11.7998 6.92253 10.9956 7.07687 10.2196C7.23121 9.44371 7.61217 8.73098 8.17158 8.17157C8.73099 7.61216 9.44373 7.2312 10.2197 7.07686C10.9956 6.92252 11.7998 7.00173 12.5307 7.30448C13.2616 7.60723 13.8864 8.11992 14.3259 8.77772C14.7654 9.43552 15 10.2089 15 11C14.9987 12.0605 14.5768 13.0771 13.827 13.827C13.0771 14.5768 12.0605 14.9987 11 15Z"
                  fill="#EEA147"
                />
              </svg>
            </div>

            <p className="w-11/12  text-xs  font-light text-wrap truncate">
              {canteen.location}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
