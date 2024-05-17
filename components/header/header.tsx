"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import userService from "@/lib/services/userService";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import SearchComponent from "./SearchMobile";
import Cart from "../popUp_cart/Cart";

const Header = () => {
  // const router = useRouter();
  // const { items } = useCartService();
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // const makeCanteen = () => {
  //   router.push("/make_canteen");
  // };

  // const signoutHandler = () => {
  //   signOut({ callbackUrl: "/signin" });
  // };
  // const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  // const isMediumScreen = useMediaQuery("(min-width: 768px)");
  // const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const [viewportWidth, setViewportWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.clientWidth;
    }
    return 0;
  });
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="fixed z-20 w-full">
      {/* cek media witdh */}
      {/* {viewportWidth <=640 ? ( */}
      <div className="w-full">
        {/* <SearchComponent /> */}
        {/* <MenuMobile /> */}
      </div>
      {/* ) : ( */}
      <Menu />
      {/* )} */}
      {/* <Cart /> */}
    </header>
  );
};

export default Header;
