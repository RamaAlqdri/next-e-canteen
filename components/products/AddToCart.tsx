"use client";
import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCart({
  item,
  text,
  productPage,
}: {
  item: OrderItem;
  text?: string;
  productPage?: boolean;
}) {
  const router = useRouter();

  const { data: session } = useSession();
  // console.log(session);
  // console.log(item)
  const { items, increase, decrease } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();
  useEffect(() => {
    setExistItem(items.find((x) => x._id == item._id));
  }, [item, items]);
  const addToCartHandler = () => {
    increase(item);
  };

  if (session?.user.canteen === item.canteenId) {
    return null;
  }

  return existItem ? (
    <div className="flex items-center border-[0.05rem] border-[#EEA147] rounded-lg md:rounded-xl overflow-hidden ">
      <button
        className={`flex items-center justify-center text-white h-6 w-6   btn-ePrimary border-0  text-xs sm:text-md ${productPage && "md:w-10 md:h-10 "}`}
        type="button"
        onClick={() => decrease(existItem)}
      >
        -
      </button>
      <span className={`px-2 font-semibold text-xs sm:text-xs   ${productPage && "md:w-10 md:h-10 md:text-xl flex items-center justify-center"}`}>
        {existItem.qty}
      </span>
      <button
        className={`flex items-center justify-center text-white h-6 w-6   btn-ePrimary border-0  text-xs sm:text-md ${productPage && "md:w-10 md:h-10 "}`} 
        type="button"
        onClick={() => increase(existItem)}
      >
        +
      </button>
    </div>
  ) : (
    <button
      className={`flex items-center justify-center font-medium rounded-lg  text-white     btn-ePrimary border-[0.05rem] border-[#EEA147] drop-shadow-[0_10px_10px_rgba(237,161,71,0.4)] text-xs sm:text-md ${productPage ? "px-4 md:h-10 md:rounded-xl  ":"h-6 w-6"}`}
      type="button"
      onClick={addToCartHandler}
    >
      <p>{text || "+"}</p>
    </button>
  );
}
