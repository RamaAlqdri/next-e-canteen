/* eslint-disable @next/next/no-img-element */

"use client";
import { Metadata } from "next";
import UserBeranda from "./user_home";
import CanteenBeranda from "./canteen_home";
import AdminBeranda from "./admin_home";
import { useSession } from "next-auth/react";

// export const metadata: Metadata = {
//   title: process.env.NEXT_PUBLIC_APP_NAME || "e-Canteens",
//   description: process.env.NEXT_PUBLIC_APP_DESC || "e-Canteen, lorem ipsum",
// };

export default function Home() {
  const { data: session } = useSession();


  if (session?.user?.role === "canteen") {
    return <CanteenBeranda/>;
  } else if (session?.user?.role === "admin") {
    return <AdminBeranda/>;
  } else if (session?.user?.role === "blu") {
    return <div>BLU</div>;
  }else{
    return <UserBeranda />
  }
}
