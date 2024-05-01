"use client";

import useCartService from "@/lib/hooks/useCartStore";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Cart = () => {
  const { items, itemsPrice } = useCartService();
  //   const router = useRouter();
  const path = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [show, setShow] = useState(false);
  //   if(items.reduce((a, c) => a + c.qty, 0) > 0){
  //     setShow(true);
  //   }else{
  //       setShow(false);
  //   }
  if (items.reduce((a, c) => a + c.qty, 0) <= 0 || path === "/cart") {
    return;
  }

  return (
    <div className="sm:hidden z-50 bottom-[4.5rem] fixed flex justify-center  w-full">
      <Link
        href={"/cart"}
        className="flex justify-between px-5 items-center text-white  bg-[#EEA147] h-12 w-[90%] opacity-95 rounded-2xl  "
      >
        <p className="font-medium">
          {items.reduce((a, c) => a + c.qty, 0)} item
        </p>
        <p className="font-bold">Rp {formatRupiah(itemsPrice)},00</p>
      </Link>
    </div>
  );
};

export default Cart;
