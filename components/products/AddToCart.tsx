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
    <div className="">
        <button className="btn h-2 px-[0.7rem] min-h-8 sm:min-h-12 sm:p-3 text-xs sm:text-base btn-ePrimary border-0 " type="button" onClick = {()=> decrease(existItem)}>
            -
        </button>
        <span className="px-2 font-semibold text-xs sm:text-base ">{existItem.qty}</span>
        <button className="btn h-2 px-[0.7rem] min-h-8 sm:min-h-12 sm:p-3 text-xs sm:text-base btn-ePrimary border-0" type="button" onClick={()=> increase(existItem)}>
          +
        </button> 
    </div>

  ):(
    <button
        className="btn h-2 px-2 min-h-8 sm:min-h-12 sm:p-3 btn-ePrimary border-0 drop-shadow-[0_10px_10px_rgba(237,161,71,0.4)] text-xs sm:text-base"
        type="button"
        onClick={addToCartHandler}
    >
        Tambah
    </button>

  )
}
