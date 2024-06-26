"use client";

import { Canteen } from "@/lib/models/CanteenModel";
import { Product } from "@/lib/models/ProductModels";
import Image from "next/image";
import ProductItem from "@/components/products/ProductItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddToCart from "@/components/products/AddToCart";
import { formatRupiah } from "@/lib/utils";
import { useEffect, useState } from "react";
import productsService from "@/lib/services/productService";
import canteenService from "@/lib/services/canteenService";
import { Comments } from "@/lib/models/CommentModel";
import ImageDisplay from "@/components/image/imageShow";

// const product = {
//   _id: "aL65uv5TH6GKD2LYscVW",
//   canteenId: "nBxAIxKSeNQPM3tJolxo",
//   category: "minuman",
//   countInStock: 2,
//   description: "Minuman Dingin Enak",
//   image: "/images/product/product2.jpg",
//   name: "Es Teh",
//   numReviews: 0,
//   price: 12000,
//   rating: 0,
//   slug: "es-teh",
// };
// const commentList = [
//   {
//     _id: "1",

//     content: "orem Ipsting andshe own printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     rating: 5,
//   },
//   {
//     _id: "2",

//     content: "orebeen sinnter took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     rating: 2,
//   },
//   {
//     _id: "3",

//     content: "o typesetbeen the indutext ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software li",
//     rating: 3,
//   },
// ];

function countReview(commentList: Comments[]) {
  return commentList.length;
}
function averageRating(commentList: Comments[]) {
  if (commentList.length === 0) {
    return 0;
  }
  let total = 0;
  commentList.forEach((comment) => {
    total += comment.rating;
  });
  return total / commentList.length;
}

const canteenName = "Kantin A";
const Detail = ({
  canteenId,
  productId,
}: {
  canteenId: string;
  productId: string;
}) => {
  const { data: session } = useSession();

  const router = useRouter();
  const back = () => {
    router.back();
  };

  const [product, setProduct] = useState<Product>();
  const [canteenName, setCanteenName] = useState<string>();
  const [commentList, setComment] = useState<Comments[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct = await productsService.getProductById(
          canteenId,
          productId
        );
        setProduct(fetchedProduct);
        const canteenName = await canteenService.getCanteenName(canteenId);
        setCanteenName(canteenName);
        const fetchedComment = await productsService.getCommentFromProductLimit(
          canteenId,
          productId
        );
        setComment(fetchedComment);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <title>{product?.name}</title>
      {!product ? (
        <>
          {/* <div className="my-2">
          <button onClick={back}> back</button>
        </div> */}
          <div className="bg-white animate-pulse p-6 mt-6 grid md:grid-cols-5 rounded-3xl shadow-md">
            <div className="relative w-full px-4 aspect-square md:col-span-2   rounded-2xl">
              <div className="bg-gray-200 w-full h-full rounded-2xl"></div>
            </div>
            <div className="md:col-span-3 p-4  flex flex-col">
              <div>
                <ul className="space-y-3 ">
                  <li className=" h-8 bg-gray-300 rounded-2xl"></li>
                  <li className=" h-8 bg-gray-300 w-3/5 rounded-2xl"></li>
                  <li className=" h-8 bg-gray-300 w-2/5 rounded-2xl"></li>
                  <li className=" h-8 bg-gray-300 w-4/5 rounded-2xl"></li>
                  <li className=" h-8 bg-gray-300 w-2/5 rounded-2xl"></li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* <div className="my-2">
            <button onClick={back}> back</button>
          </div> */}
          <div className="bg-white mb-8 p-4 mt-6 grid md:grid-cols-5 rounded-3xl shadow-md">
            <div className="relative max-h-[26rem] w-full aspect-square md:col-span-2 p-2">
              <ImageDisplay
                path={product?.image || ""}
                defaultPath="/images/product/default.jpg"
                imgStyle="rounded-2xl object-cover w-full h-full"
              />

            </div>
            <div className="md:col-span-3 p-2 ml-2 flex flex-col">
              <div>
                <ul className="space-y-2 ">
                  <li className="flex justify-between">
                    <h1 className="text-xl lg:text-2xl font-semibold">
                      {product?.name}
                    </h1>
                    <div className="text-[#EEA061] text-sm">
                      {product?.countInStock || 0 > 0 ? "Tersedia" : "Habis"}
                    </div>
                  </li>
                  <li className="flex space-x-2 items-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="drop-shadow-[0_10px_10px_rgba(237,161,71,0.5)] sm:w-4 sm:h-4 h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.5 4.70017L3.5 2.00017H14.5C15.0688 3.54405 15.5693 5.11223 16 6.70017V7.30018L15.7 7.70017C15.5835 7.79618 15.4467 7.86456 15.3 7.90017C15.1076 7.97801 14.8924 7.97801 14.7 7.90017C14.5533 7.86456 14.4165 7.79618 14.3 7.70017L14.1 7.30018L14 6.70017C14 6.43496 13.8946 6.1806 13.7071 5.99307C13.5196 5.80553 13.2652 5.70017 13 5.70017C12.7348 5.70017 12.4804 5.80553 12.2929 5.99307C12.1054 6.1806 12 6.43496 12 6.70017C12 7.10017 11.9 7.40017 11.7 7.70017C11.5154 7.88859 11.2638 7.99642 11 8.00017C10.8685 8.00438 10.7376 7.9797 10.6167 7.92787C10.4958 7.87603 10.3877 7.79831 10.3 7.70017C10.1 7.40017 10 7.10017 10 6.70017C10 6.43496 9.89464 6.1806 9.70711 5.99307C9.51957 5.80553 9.26522 5.70017 9 5.70017C8.73478 5.70017 8.48043 5.80553 8.29289 5.99307C8.10536 6.1806 8 6.43496 8 6.70017C8 7.10017 7.9 7.40017 7.7 7.70017C7.51537 7.88859 7.26377 7.99642 7 8.00017C6.86848 8.00438 6.73765 7.9797 6.6167 7.92787C6.49576 7.87603 6.38765 7.79831 6.3 7.70017C6.1 7.40017 6 7.10017 6 6.70017C6 6.43496 5.89464 6.1806 5.70711 5.99307C5.51957 5.80553 5.26522 5.70017 5 5.70017C4.73478 5.70017 4.48043 5.80553 4.29289 5.99307C4.10536 6.1806 4 6.43496 4 6.70017C4.00938 6.98029 3.9401 7.25743 3.8 7.50017L3.7 7.70017C3.58347 7.79618 3.44672 7.86456 3.3 7.90017L3 8.00017C2.80723 7.95207 2.63316 7.84762 2.5 7.70017H2.4C2.2 7.40017 2 7.10017 2 6.70017V6.50017L2.1 6.00017L2.5 4.70017ZM1 9.00017L0.9 8.90017C0.352545 8.29428 0.0341736 7.51604 0 6.70017L0.2 5.50017C0.547794 4.06332 1.01612 2.65834 1.6 1.30017C1.74419 0.914146 2.0041 0.58208 2.3442 0.349386C2.68429 0.116691 3.08796 -0.00527193 3.5 0.000174798H14.5C14.8835 0.0065324 15.2571 0.123036 15.5763 0.335799C15.8954 0.548563 16.1466 0.848609 16.3 1.20017C16.9574 3.00424 17.5247 4.83983 18 6.70017C18.0172 7.53788 17.7334 8.35398 17.2 9.00017L17 9.20017V16.0002C17 16.5306 16.7893 17.0393 16.4142 17.4144C16.0391 17.7895 15.5304 18.0002 15 18.0002H9C8.73478 18.0002 8.48043 17.8948 8.29289 17.7073C8.10536 17.5197 8 17.2654 8 17.0002V13.0002H5V17.0002C5 17.6002 4.6 18.0002 4 18.0002H3C2.46957 18.0002 1.96086 17.7895 1.58579 17.4144C1.21071 17.0393 1 16.5306 1 16.0002V9.10017V9.00017ZM10 11.9002C10 11.3002 10.4 10.9002 11 10.9002H13C13.6 10.9002 14 11.3002 14 11.9002V13.9002C14 14.5002 13.6 14.9002 13 14.9002H11C10.7348 14.9002 10.4804 14.7948 10.2929 14.6073C10.1054 14.4197 10 14.1654 10 13.9002V11.9002Z"
                        fill="#EEA147"
                      />
                    </svg>

                    <p className="text-md">{canteenName}</p>
                  </li>
                  <li className="flex space-x-2 items-center ">
                    <div className="rating  rating-sm">
                      {[1, 2, 3, 4, 5].map((angka, index) =>
                        angka <= averageRating(commentList) ? (
                          <div key={index}>
                            <input
                              disabled
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-400"
                            />
                          </div>
                        ) : (
                          <div key={index}>
                            <input
                              disabled
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-200"
                            />
                          </div>
                        )
                      )}
                    </div>
                    <p className="text-xs font-light">
                      dari {countReview(commentList)} ulasan
                    </p>
                  </li>

                  <li className=" overflow-hidden">
                    <p className="h-full font-light text-sm text-gray-700 text-clip">
                      {product?.description}
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <div className="mt-4 ">
                  <div className="space-y-2">
                    <div className=" flex space-x-4 items-center">
                      <div className="text-lg md:text-xl font-semibold item-center ">
                        Rp {formatRupiah(product?.price || 0)},00
                      </div>
                    </div>
                    <div className="flex">
                      {session?.user.canteenId !== product?.canteenId &&
                        product?.countInStock !== 0 && (
                          <div className="">
                            <AddToCart
                              item={{ ...product, qty: 0 }}
                              text={"Masukkan ke Keranjang"}
                              productPage={true}
                            />
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white mb-8 px-6 py-6 mt-6 rounded-3xl shadow-md">
            <div>
              <p className="text-md font-semibold">Ulasan</p>
            </div>
            {commentList.length === 0 ? (
              <div className="text-sm font-light mt-4 w-full text-center">
                Belum ada ulasan untuk produk ini
              </div>
            ) : (
              <div className="space-y-2 mt-4">
                {commentList.map((comment) => (
                  <div
                    key={comment.id}
                    className="space-y-1 items-center w-full border rounded-2xl py-2 px-4 "
                  >
                    <div className="rating  rating-xs ">
                      {[1, 2, 3, 4, 5].map((angka, index) =>
                        angka <= comment.rating ? (
                          <div key={index}>
                            <input
                              disabled
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-500"
                            />
                          </div>
                        ) : (
                          <div key={index}>
                            <input
                              disabled
                              name="rating-2"
                              className="mask mask-star-2 bg-orange-200"
                            />
                          </div>
                        )
                      )}
                    </div>
                    <div className="font-light text-xs md:text-sm">
                      {comment.content}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Detail;
