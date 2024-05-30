"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatRupiah, getOrderDescription } from "@/lib/utils";
import orderService from "@/lib/services/orderService";
import { OrderDetail } from "@/lib/models/OrderModel";
import { useSession } from "next-auth/react";
import { Canteen } from "@/lib/models/CanteenModel";
import { ubahFormatTanggal } from "@/lib/utils";
import { dapatkanWaktu } from "@/lib/utils";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "@/lib/models/UserModel";
import canteenService from "@/lib/services/canteenService";
import userService from "@/lib/services/userService";
import { SubmitHandler, useForm } from "react-hook-form";
import productsService from "@/lib/services/productService";
import TextareaWithLabel from "@/components/input/textarea";
import { set } from "firebase/database";
import ImageDisplay from "@/components/image/imageShow";

type Inputs = {
  content: string;
  rating: number;
};

const Form = ({ orderId }: { orderId: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>();
  const [canteen, setCanteen] = useState<Canteen>();

  function updateOrderStatus(status: number) {
    orderService.updateOrderStatus(orderId, status);
  }

  // console.log(canteen);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [currentProductId, setCurrentProductId] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      content: "",
      rating: 0,
    },
  });
  const [ratingValue, setRatingValue] = useState(0);
  const getStarClass = (index: number) => {
    if (index <= ratingValue) {
      return "mask mask-star-2 bg-orange-500"; // Warna untuk rating yang dipilih dan di bawahnya
    } else {
      return "mask mask-star-2 bg-orange-200"; // Warna untuk rating di atas yang dipilih
    }
  };
  const [commentItems, setCommentItems] = useState(0);
  const [productId, setProductId] = useState<string[]>([]);

  const commentSubmit: SubmitHandler<Inputs> = async (form) => {
    // console.log("i'm here");
    const { content, rating } = form;
    // console.log(content, rating);
    const newComment = {
      content,
      rating: ratingValue,
    };
    // console.log(productId);
    // console.log(commentItems);
    // console.log(newComment);
    const productIdForm = productId[commentItems];
    // console.log(productIdForm);
    try {
      if (order) {
        await productsService.writeComment(
          order?.canteenId as string,
          productIdForm as string,
          newComment
        );
        reset();
        setRatingValue(0);
        setCommentItems(commentItems + 1);
        // console.log(commentItems);
        // console.log(order.items.length);
        if (commentItems + 1 === order.items.length) {
          // console.log("masuk");
          updateOrderStatus(6);
        }
      } else {
        return;
      }
    } catch (error) {
      console.error("Gagal Menulis Ulasan:", error);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "order"),
      where("id", "==", orderId),
      limit(1)
    );
    const unsubscribe = onSnapshot(
      q,
      async (snapshot: QuerySnapshot<DocumentData>) => {
        let orderData = null as OrderDetail | null;
        snapshot.forEach((doc: any) => {
          orderData = doc.data() as OrderDetail;
        });
        setOrder(orderData);
        if (orderData?.items) {
          const newProductIds = orderData.items.map(
            (item) => item.id as string
          );
          // console.log(newProductIds);
          setProductId(newProductIds);
        }
        // console.log(productId)
        if (orderData) {
          try {
            const [canteenData, userData] = await Promise.all([
              canteenService.getCanteenData(orderData.canteenId),
              userService.getUserDataById(orderData.customerId),
            ]);
            setCanteen(canteenData);
            setUser(userData);
          } catch (error) {
            console.error("Error fetching canteen data:", error);
          }
        }
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(order?.canteenId),
  // console.log(canteen);
  useEffect(() => {
    if (canteen) {
      if (session?.user.role !== "admin") {
        if (session?.user.canteenId !== canteen?.id) {
          // console.log(session?.user.canteenId);
          // console.log(canteen?.id);
          router.push("/");
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (!order) return <></>;

  return (
    <div className="">
      <title>Detail Pesanan</title>
      <h1 className="card-title mt-8 mb-4">Detail Pesanan</h1>
      <div className="grid lg:grid-cols-5 gap-4 ">
        <div className="lg:col-span-3">
          <div
            className="flex justify-between  px-5 py-4 bg-white w-full rounded-t-2xl  bg-center bg-repeat "
            style={{
              backgroundImage: `url('/images/pattern/pattern.svg')`,
            }}
          >
            <div className="flex flex-col justify-between space-y-2">
              <p className="font-medium sm:text-sm text-xs">
                No Pesanan: {order.id}
              </p>
              <div className="flex items-center text-gray-500 space-x-2 sm:text-xs text-[0.6rem]">
                <p>{ubahFormatTanggal(order.createdAt)}</p>
                <div className="h-1 w-1 rounded-full bg-gray-500"></div>
                <p className="">{dapatkanWaktu(order.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center bg-white rounded-full border-[#FFF5EC] border-2 sm:px-4 px-2">
              <p className="sm:font-semibold font-medium text-[#EEA147] sm:text-lg text-xs text-center">
                {canteen?.name}
              </p>
            </div>
            {/* {status === 1 && (
              <div className="items-center text-center bg-white border-2  border-[#FFF5EC] rounded-full px-5 py-3 text-xs text-green-700 flex justify-center ">
                <p>Mengkonfirmasi Pesanan</p>
              </div>
            )} */}
          </div>
          <div className="bg-white py-4 space-y-2 px-5 rounded-b-2xl shadow-md  lg:col-span-3">
            <div className="flex flex-col space-y-1 ">
              <p className="text-md font-medium">Pelanggan</p>
              <div className="flex space-x-2 text-sm font-light">
                <div className="">
                  <p>{`Email`}</p>
                  <p>{`Nama`}</p>
                </div>
                <div className="">
                  <p>: {user?.email}</p>
                  <p>: {user?.name}</p>
                </div>
              </div>
            </div>
            <table className="w-full   ">
              <thead className="border-b-[2px] border-gray-200">
                <tr className="sm:text-base text-xs">
                  <th className="font-medium py-2">No</th>
                  <th className="font-medium py-2">Barang</th>
                  <th className="font-medium py-2 ">Banyak</th>
                  <th className="font-medium py-2">Harga</th>
                  <th className="font-medium py-2">Jumlah</th>
                </tr>
              </thead>
              <tbody className=" ">
                {order.items.map((item, index) => (
                  <tr
                    key={item.slug}
                    className=" border-b-[1px] sm:text-sm text-[0.7rem] border-gray-100 font-light"
                  >
                    <td>
                      <p className="text-center">{index + 1}</p>
                    </td>
                    <td className="py-3 ">
                      <p className="ml-2 text-center">{item.name}</p>
                    </td>
                    <td className="max-w-6 min-w-5   px-2">
                      <p className="px-2  text-center  ">{item.qty}</p>
                    </td>
                    <td className="text-center  ">
                      Rp{formatRupiah(item.price)},00
                    </td>
                    <td className="text-center  ">
                      Rp{formatRupiah(item.price * item.qty)},00
                    </td>
                  </tr>
                ))}
              </tbody>
              <thead>
                <tr className="sm:text-base text-xs border-t-[2px] border-gray-200  ">
                  <th className="font-medium py-2 "></th>
                  <th className="font-medium py-2 "></th>
                  <th className="font-medium py-2 "></th>

                  <th className="font-medium py-2 ">Total</th>
                  <th className="font-medium py-2 ">
                    Rp{formatRupiah(order.itemsPrice)},00
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="lg:col-span-2 ">
          <div className="rounded-2xl py-4  px-5  bg-white shadow-md">
            <div className="">
              <ul className="space-y-6">
                <li className="flex justify-between border-b-[1px] border-gray-100   items-baseline py-2">
                  <div className=" text-sm sm:text-base font-medium">
                    Status
                    {/* ({items.reduce((a, c) => a + c.qty, 0)})  */}
                  </div>
                  <p className="sm:text-sm text-xs  font-light">
                    {getOrderDescription(order.status)}
                  </p>
                </li>
                {order.status === 1 && session?.user.role == "user" && (
                  <div className="flex justify-center w-full ">
                    {canteen?.qris && (
                      <ImageDisplay
                        path={canteen?.qris as string}
                        defaultPath=""
                        imgStyle="relative w-[70%] rounded-xl border-2"
                      />
                    )}
                    {/* <Image
                      src={"/images/qris/qris1.jpeg"}
                      width={500}
                      height={500}
                      alt="QRIS Canteen"
                      className="relative w-[70%] rounded-xl border-2"
                    ></Image> */}
                  </div>
                )}

                {session?.user.role === "user" ? (
                  <li className="flex  justify-center space-x-4">
                    {order.status !== 5 &&
                      order.status !== 4 &&
                      order.status !== 3 &&
                      order.status !== 6 &&
                      order.status !== 7 && (
                        <button
                          // onClick={() => router.push("/order")}
                          onClick={() => updateOrderStatus(7)}
                          className="btn border-0 btn-Delete "
                        >
                          Batalkan Pesanan
                        </button>
                      )}
                    {order.status === 1 && (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(2)}
                        className="btn border-0 btn-ePrimary "
                      >
                        Periksa Pembayaran
                      </button>
                    )}
                    {order.status === 4 && (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(5)}
                        className="btn border-0 btn-ePrimary "
                      >
                        Pesanan Sudah Diambil
                      </button>
                    )}
                    {order.status === 5 && (
                      <div className="w-full -mt-2">
                        <p className="text-sm font-semibold">Ulasan Makanan</p>
                        {order.items.map((item, index) => {
                          return (
                            commentItems === index && (
                              <form
                                id={item.id}
                                key={index}
                                onSubmit={handleSubmit(commentSubmit)}
                                // setCurrentProductId(item.id as string);
                                // setCommentItems(index);
                                className={`${
                                  commentItems === index ? "content" : "hidden"
                                } `}
                              >
                                <p className="font-light text-">{item.name}</p>
                                <div>
                                  <div className="rating rating-sm space-x-1">
                                    <input
                                      type="radio"
                                      name="rating-2"
                                      onClick={() => setRatingValue(1)}
                                      checked={ratingValue === 1}
                                      className={getStarClass(1)}
                                    />
                                    <input
                                      type="radio"
                                      name="rating-2"
                                      onClick={() => setRatingValue(2)}
                                      checked={ratingValue === 2}
                                      className={getStarClass(2)}
                                    />
                                    <input
                                      type="radio"
                                      name="rating-2"
                                      onClick={() => setRatingValue(3)}
                                      checked={ratingValue === 3}
                                      className={getStarClass(3)}
                                    />
                                    <input
                                      type="radio"
                                      name="rating-2"
                                      onClick={() => setRatingValue(4)}
                                      checked={ratingValue === 4}
                                      className={getStarClass(4)}
                                    />
                                    <input
                                      type="radio"
                                      name="rating-2"
                                      onClick={() => setRatingValue(5)}
                                      checked={ratingValue === 5}
                                      className={getStarClass(5)}
                                    />
                                  </div>
                                  <div className="pt-2">
                                    <TextareaWithLabel
                                      htmlFor={item.id}
                                      label=""
                                      error={errors.content?.message}
                                      register={register}
                                      name="content"
                                      // validationSchema={{
                                      //   required: "Lokasi wajib diisi",
                                      // }}
                                    />
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  // onClick={() => {
                                  //   buttonClick(item.id, index + 1);
                                  // }}
                                  // onSubmit={() => {
                                  //   buttonClick(item.id, index + 1);
                                  // }}
                                  disabled={isSubmitting}
                                  className=" rounded-xl px-5 py-2 text-sm btn-ePrimary"
                                >
                                  Ulas
                                </button>
                              </form>
                            )
                          );
                        })}
                      </div>
                    )}
                  </li>
                ) : session?.user.role == "canteen" ? (
                  <li className="flex  justify-center space-x-4">
                    {order.status !== 4 &&
                      order.status !== 3 &&
                      order.status !== 5 &&
                      order.status !== 6 &&
                      order.status !== 7 && (
                        <button
                          // onClick={() => router.push("/order")}
                          onClick={() => updateOrderStatus(7)}
                          className="btn border-0 btn-Delete "
                        >
                          Batalkan Pesanan
                        </button>
                      )}
                    {order.status === 0 && (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(1)}
                        className="btn border-0 btn-ePrimary "
                      >
                        Terima Pesanan
                      </button>
                    )}
                    {order.status === 2 && (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(3)}
                        className="btn border-0 btn-ePrimary "
                      >
                        Pembayaran Berhasil
                      </button>
                    )}
                    {order.status === 3 && (
                      <button
                        // onClick={() => router.push("/order")}
                        onClick={() => updateOrderStatus(4)}
                        className="btn border-0 btn-ePrimary "
                      >
                        Pesanan Siap
                      </button>
                    )}
                  </li>
                ) : (
                  <div></div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
