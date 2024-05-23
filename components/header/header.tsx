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
