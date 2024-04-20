"use client";
import useCartService from "@/lib/hooks/useCartStore";
import { OrderItem } from "@/lib/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();
  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);
  const addToCartHandler = () => {
    increase(item);
  };
  return existItem ? (
    <div className="flex items-center border-[0.05rem] border-[#EEA147] rounded-lg overflow-hidden ">
        <button className="flex items-center justify-center text-white h-6 w-6  btn-ePrimary border-0  text-xs sm:text-md " type="button" onClick = {()=> decrease(existItem)}>
            -
        </button>
        <span className="px-2 font-semibold text-xs sm:text-xs ">{existItem.qty}</span>
        <button className="flex items-center justify-center text-white h-6 w-6   btn-ePrimary border-0  text-xs sm:text-md " type="button" onClick={()=> increase(existItem)}>
          +
        </button> 
    </div>

  ):(
    <button
        className="flex items-center justify-center font-medium rounded-lg  text-white h-6 w-6   btn-ePrimary border-[0.05rem] border-[#EEA147] drop-shadow-[0_10px_10px_rgba(237,161,71,0.4)] text-xs sm:text-md"
        type="button"
        onClick={addToCartHandler}
    >
        +
    </button>

  )
}
