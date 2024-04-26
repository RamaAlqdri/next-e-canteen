"use client";

import { Canteen } from "@/lib/models/CanteenModel";
import { Product } from "@/lib/models/ProductModels";
import Image from "next/image";
import ProductItem from "@/components/products/ProductItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Detail = ({
  canteen,
  products,
}: {
  canteen: Canteen;
  products: Product[];
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const addProduct = () => {
    // router.push(`/add_product?canteen=${canteen.slug}`);
    router.push("/add_product");
  };
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await fetch("/api/products", {
  //         method: "GET",
  //         // headers: {
  //         //   "Content-Type": "application/json",
  //         // },
  //         body: JSON.stringify({
  //           categoty: "makanan",
  //           canteenslug: canteen.slug,
  //         }),
  //       });
  //       const data = await res.json();
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   console.log(session?.user.canteen);
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
            {session && session?.user.canteen === canteen.slug && (
              <button
                //   onClick={fetchProducts}
                className="flex  items-center font-normal hover:bg-[#FFEBD7] text-sm p-1 rounded-lg"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M21.4549 5.41595C21.5499 5.56016 21.5922 5.73273 21.5747 5.90454C21.5573 6.07634 21.481 6.23685 21.3589 6.35895L12.1659 15.551C12.0718 15.6449 11.9545 15.7122 11.8259 15.746L7.99689 16.746C7.87032 16.779 7.73732 16.7783 7.61109 16.744C7.48485 16.7097 7.36978 16.6431 7.27729 16.5506C7.18479 16.4581 7.1181 16.343 7.08382 16.2168C7.04955 16.0905 7.04888 15.9575 7.08189 15.831L8.08189 12.003C8.11109 11.888 8.16616 11.7813 8.24289 11.691L17.4699 2.46995C17.6105 2.3295 17.8011 2.25061 17.9999 2.25061C18.1986 2.25061 18.3893 2.3295 18.5299 2.46995L21.3589 5.29795C21.3948 5.33396 21.4269 5.37349 21.4549 5.41595ZM19.7679 5.82795L17.9999 4.06095L9.48189 12.579L8.85689 14.972L11.2499 14.347L19.7679 5.82795Z"
                    fill="#EEA147"
                  />
                  <path
                    d="M19.6411 17.16C19.9144 14.824 20.0017 12.4699 19.9021 10.12C19.8999 10.0646 19.9092 10.0094 19.9293 9.95782C19.9494 9.9062 19.98 9.85928 20.0191 9.82001L21.0031 8.83601C21.0299 8.80897 21.0641 8.79027 21.1013 8.78215C21.1386 8.77404 21.1774 8.77686 21.2131 8.79027C21.2488 8.80368 21.2799 8.82712 21.3026 8.85776C21.3253 8.88841 21.3386 8.92495 21.3411 8.96301C21.5263 11.7542 21.456 14.5566 21.1311 17.335C20.8951 19.357 19.2711 20.942 17.2581 21.167C13.7634 21.554 10.2367 21.554 6.74206 21.167C4.73006 20.942 3.10506 19.357 2.86906 17.335C2.45446 13.7904 2.45446 10.2096 2.86906 6.66501C3.10506 4.64301 4.72906 3.05801 6.74206 2.83301C9.39443 2.53889 12.0668 2.46764 14.7311 2.62001C14.7692 2.62275 14.8057 2.63635 14.8364 2.65922C14.867 2.68209 14.8904 2.71325 14.9039 2.74903C14.9174 2.78481 14.9203 2.82369 14.9124 2.86108C14.9044 2.89847 14.8859 2.93281 14.8591 2.96001L13.8661 3.95201C13.8272 3.99076 13.7807 4.02113 13.7297 4.04125C13.6786 4.06137 13.6239 4.07082 13.5691 4.06901C11.3458 3.99343 9.12001 4.07866 6.90906 4.32401C6.263 4.39552 5.65991 4.68273 5.19721 5.13926C4.73451 5.59579 4.43923 6.19497 4.35906 6.84001C3.9581 10.2683 3.9581 13.7317 4.35906 17.16C4.43923 17.805 4.73451 18.4042 5.19721 18.8608C5.65991 19.3173 6.263 19.6045 6.90906 19.676C10.2641 20.051 13.7361 20.051 17.0921 19.676C17.7381 19.6045 18.3412 19.3173 18.8039 18.8608C19.2666 18.4042 19.5609 17.805 19.6411 17.16Z"
                    fill="#EEA147"
                  />
                </svg>
              </button>
            )}
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
        {/* {session && session?.user.canteen === canteen.slug && (
          <div className="flex flex-col justify-center gap-2">
            <button
              onClick={addProduct}
              className="font-normal flex text-sm items-center pl-3 h-8 w-[11rem] rounded-lg btn-eWhite ml-4"
            >
              <svg
                width="43"
                height="43"
                viewBox="0 0 43 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
              >
                <path
                  d="M39.914 2.766C37.524 0.375 34.148 0 30.164 0H12.445C8.508 0 5.133 0.375 2.742 2.765C0.352 5.155 0 8.507 0 12.422V30.14C0 34.148 0.352 37.476 2.742 39.867C5.132 42.257 8.508 42.632 12.516 42.632H30.164C34.148 42.632 37.524 42.257 39.914 39.867C42.304 37.477 42.656 34.148 42.656 30.14V12.492C42.656 8.484 42.305 5.133 39.914 2.766ZM21.328 35.061C20.8372 35.0602 20.3668 34.865 20.0197 34.518C19.6726 34.1711 19.4771 33.7008 19.476 33.21V23.156H9.446C8.414 23.156 7.594 22.312 7.594 21.328C7.594 20.343 8.414 19.453 9.445 19.453H19.476V9.421C19.476 8.367 20.296 7.546 21.328 7.546C22.383 7.546 23.18 8.366 23.18 9.421V19.453H33.234C34.266 19.453 35.086 20.343 35.086 21.328C35.086 22.312 34.266 23.156 33.234 23.156H23.18V33.211C23.1815 33.4546 23.1345 33.696 23.042 33.9213C22.9494 34.1466 22.813 34.3513 22.6408 34.5235C22.4685 34.6957 22.2637 34.8319 22.0384 34.9244C21.813 35.0168 21.5716 35.0626 21.328 35.061Z"
                  fill="gray"
                />
              </svg>
              Tambah Produk
            </button>
            <button
              //   onClick={fetchProducts}
              className="font-normal hover:bg-[#FFEBD7] text-sm px-3 h-8 rounded-lg btn-eWhite ml-4"
            >
              Edit Kantin
            </button>
          </div>
        )} */}
      </div>
      <div className="mt-2 bg-white rounded-b-2xl rounded-t-md shadow-md py-3 px-3 flex justify-between">
        <ul className="flex space-x-2">
          <li className="py-1 px-3  text-sm rounded-xl border-2 border-[#EEA147] hover:text-white hover:bg-[#EEA147] text-[#EEA147]">
            Makanan
          </li>
          <li className="py-1 px-3  text-sm rounded-xl border-2 border-[#EEA147] hover:text-white hover:bg-[#EEA147] text-[#EEA147]">
            Minuman
          </li>
          <li className="py-1 px-3  text-sm rounded-xl border-2 border-[#EEA147] hover:text-white hover:bg-[#EEA147] text-[#EEA147]">
            Cemilan
          </li>
        </ul>
        {session && session?.user.canteen === canteen.slug && (
          <button className="flex  items-center font-normal hover:bg-[#FFEBD7] text-sm p-0.5 rounded-lg mr-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
            >
              <path
                d="M7.00708 12C7.00708 11.801 7.0861 11.6103 7.22675 11.4696C7.3674 11.329 7.55817 11.25 7.75708 11.25H11.2501V7.75696C11.2501 7.55805 11.3291 7.36728 11.4698 7.22663C11.6104 7.08598 11.8012 7.00696 12.0001 7.00696C12.199 7.00696 12.3898 7.08598 12.5304 7.22663C12.6711 7.36728 12.7501 7.55805 12.7501 7.75696V11.25H16.2431C16.442 11.25 16.6328 11.329 16.7734 11.4696C16.9141 11.6103 16.9931 11.801 16.9931 12C16.9931 12.1989 16.9141 12.3896 16.7734 12.5303C16.6328 12.6709 16.442 12.75 16.2431 12.75H12.7501V16.243C12.7501 16.4419 12.6711 16.6326 12.5304 16.7733C12.3898 16.9139 12.199 16.993 12.0001 16.993C11.8012 16.993 11.6104 16.9139 11.4698 16.7733C11.3291 16.6326 11.2501 16.4419 11.2501 16.243V12.75H7.75708C7.55817 12.75 7.3674 12.6709 7.22675 12.5303C7.0861 12.3896 7.00708 12.1989 7.00708 12Z"
                fill="#EEA147"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.31709 3.76904C10.4296 3.42399 13.5706 3.42399 16.6831 3.76904C18.5101 3.97304 19.9851 5.41204 20.1991 7.24904C20.5691 10.406 20.5691 13.595 20.1991 16.752C19.9841 18.589 18.5091 20.027 16.6831 20.232C13.5706 20.5771 10.4296 20.5771 7.31709 20.232C5.49009 20.027 4.01509 18.589 3.80109 16.752C3.43186 13.5951 3.43186 10.4059 3.80109 7.24904C4.01509 5.41204 5.49109 3.97304 7.31709 3.76904ZM16.5171 5.25904C13.5149 4.92627 10.4852 4.92627 7.48309 5.25904C6.92733 5.32069 6.40859 5.56791 6.01066 5.96075C5.61274 6.35359 5.35888 6.86912 5.29009 7.42404C4.93443 10.465 4.93443 13.5371 5.29009 16.578C5.35909 17.1328 5.61304 17.6481 6.01095 18.0407C6.40885 18.4334 6.92748 18.6804 7.48309 18.742C10.4601 19.074 13.5401 19.074 16.5171 18.742C17.0725 18.6802 17.5909 18.433 17.9886 18.0404C18.3863 17.6478 18.6401 17.1326 18.7091 16.578C19.0647 13.5371 19.0647 10.465 18.7091 7.42404C18.6399 6.86963 18.386 6.35468 17.9883 5.96226C17.5906 5.56983 17.0724 5.32281 16.5171 5.26104"
                fill="#EEA147"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.map((product: any) => (
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
