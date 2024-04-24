"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";

import Menu from "./Menu";
import MenuMobile from "./MenuMobile";
import userService from "@/lib/services/userService";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useCartService from "@/lib/hooks/useCartStore";
import SearchComponent from "./SearchMobile";

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
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <header className="fixed z-20 w-full">
      {/* cek media witdh */}
      {isSmallScreen ? (
        <div className="w-full">
          <SearchComponent />
          <MenuMobile />
        </div>
      ) : (
        <Menu />
      )}
    </header>
  );
};

export default Header;
