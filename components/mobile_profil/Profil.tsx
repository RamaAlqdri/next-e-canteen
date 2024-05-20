"use client";
import useCartService from "@/lib/hooks/useCartStore";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/lib/models/UserModel";
import userService from "@/lib/services/userService";

interface Props {
  visible: boolean;
  setVisible: any;
}

const Profil = ({ visible, setVisible }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const makeCanteen = () => {
    router.push("/make_canteen");
  };
  const { clear } = useCartService();
  const canteen = () => {
    if (session?.user?.canteenId) {
      router.push(`/canteen/${session.user.canteenId}`);
    } else {
      // Handle case when 'canteen' is null or undefined
      console.error("Canteen not found in session user");
    }
  };
  const signoutHandler = () => {
    signOut({ callbackUrl: "/signin" });
  };
  // const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <div className="space-y-4 z-30 fixed bg-white h-screen w-screen p-6">
          <div className="flex space-x-2 items-center">
            <button
              onClick={() => {
                setVisible(false);
              }}
              className="flex items-center justify-center h-7 w-7 rounded-full hover:bg-gray-100"
            >
              <svg
                width="84"
                height="79"
                viewBox="0 0 84 79"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M39.0312 73.0625L5 39.0312L39.0312 5M9.72656 39.0312H78.7344"
                  stroke="gray"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <p className="text-md font-medium">Profilku</p>
          </div>
          <div className="flex space-x-4 ">
            <div className="relative h-12 w-12  rounded-full overflow-hidden">
              <Image
                src="/images/avatar/my.png"
                alt="avatar"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
            <div className="-space-y-1">
              <p className="font-semibold text-lg">{session?.user.name}</p>
              <p className="font-light text-sm">{session?.user.email}</p>
            </div>
          </div>
          <p className="font-normal text-sm pt-4">Akun</p>
          <div className="">
            {session?.user?.role === "canteen" ? (
              <button
                type="button"
                className="hover:bg-gray-100 hover:rounded-xl px-4 flex justify-between border-y-[0.5px] w-full py-4 items-center"
                onClick={() => {
                  canteen();
                  setVisible(false);
                }}
              >
                <div className="flex items-center">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.5 4.70017L3.5 2.00017H14.5C15.0688 3.54405 15.5693 5.11223 16 6.70017V7.30018L15.7 7.70017C15.5835 7.79618 15.4467 7.86456 15.3 7.90017C15.1076 7.97801 14.8924 7.97801 14.7 7.90017C14.5533 7.86456 14.4165 7.79618 14.3 7.70017L14.1 7.30018L14 6.70017C14 6.43496 13.8946 6.1806 13.7071 5.99307C13.5196 5.80553 13.2652 5.70017 13 5.70017C12.7348 5.70017 12.4804 5.80553 12.2929 5.99307C12.1054 6.1806 12 6.43496 12 6.70017C12 7.10017 11.9 7.40017 11.7 7.70017C11.5154 7.88859 11.2638 7.99642 11 8.00017C10.8685 8.00438 10.7376 7.9797 10.6167 7.92787C10.4958 7.87603 10.3877 7.79831 10.3 7.70017C10.1 7.40017 10 7.10017 10 6.70017C10 6.43496 9.89464 6.1806 9.70711 5.99307C9.51957 5.80553 9.26522 5.70017 9 5.70017C8.73478 5.70017 8.48043 5.80553 8.29289 5.99307C8.10536 6.1806 8 6.43496 8 6.70017C8 7.10017 7.9 7.40017 7.7 7.70017C7.51537 7.88859 7.26377 7.99642 7 8.00017C6.86848 8.00438 6.73765 7.9797 6.6167 7.92787C6.49576 7.87603 6.38765 7.79831 6.3 7.70017C6.1 7.40017 6 7.10017 6 6.70017C6 6.43496 5.89464 6.1806 5.70711 5.99307C5.51957 5.80553 5.26522 5.70017 5 5.70017C4.73478 5.70017 4.48043 5.80553 4.29289 5.99307C4.10536 6.1806 4 6.43496 4 6.70017C4.00938 6.98029 3.9401 7.25743 3.8 7.50017L3.7 7.70017C3.58347 7.79618 3.44672 7.86456 3.3 7.90017L3 8.00017C2.80723 7.95207 2.63316 7.84762 2.5 7.70017H2.4C2.2 7.40017 2 7.10017 2 6.70017V6.50017L2.1 6.00017L2.5 4.70017ZM1 9.00017L0.9 8.90017C0.352545 8.29428 0.0341736 7.51604 0 6.70017L0.2 5.50017C0.547794 4.06332 1.01612 2.65834 1.6 1.30017C1.74419 0.914146 2.0041 0.58208 2.3442 0.349386C2.68429 0.116691 3.08796 -0.00527193 3.5 0.000174798H14.5C14.8835 0.0065324 15.2571 0.123036 15.5763 0.335799C15.8954 0.548563 16.1466 0.848609 16.3 1.20017C16.9574 3.00424 17.5247 4.83983 18 6.70017C18.0172 7.53788 17.7334 8.35398 17.2 9.00017L17 9.20017V16.0002C17 16.5306 16.7893 17.0393 16.4142 17.4144C16.0391 17.7895 15.5304 18.0002 15 18.0002H9C8.73478 18.0002 8.48043 17.8948 8.29289 17.7073C8.10536 17.5197 8 17.2654 8 17.0002V13.0002H5V17.0002C5 17.6002 4.6 18.0002 4 18.0002H3C2.46957 18.0002 1.96086 17.7895 1.58579 17.4144C1.21071 17.0393 1 16.5306 1 16.0002V9.10017V9.00017ZM10 11.9002C10 11.3002 10.4 10.9002 11 10.9002H13C13.6 10.9002 14 11.3002 14 11.9002V13.9002C14 14.5002 13.6 14.9002 13 14.9002H11C10.7348 14.9002 10.4804 14.7948 10.2929 14.6073C10.1054 14.4197 10 14.1654 10 13.9002V11.9002Z"
                      fill="gray"
                    />
                  </svg>
                  Kantin Anda
                </div>
                <div className="">
                  <svg
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                  >
                    <path
                      d="M0.310987 0.311085C0.111799 0.510333 -9.88884e-05 0.780536 -9.89007e-05 1.06227C-9.89131e-05 1.34401 0.111799 1.61421 0.310987 1.81346L5.57036 7.07284L0.310986 12.3322C0.117443 12.5326 0.0103494 12.801 0.0127702 13.0796C0.015191 13.3582 0.126933 13.6246 0.323929 13.8216C0.520925 14.0186 0.787414 14.1304 1.066 14.1328C1.34458 14.1352 1.61297 14.0281 1.81336 13.8346L7.82392 7.82402C8.02311 7.62477 8.13501 7.35457 8.13501 7.07284C8.13501 6.7911 8.02311 6.5209 7.82392 6.32165L1.81336 0.311085C1.61411 0.111897 1.34391 -2.96848e-07 1.06217 -3.09163e-07C0.780437 -3.21479e-07 0.510235 0.111897 0.310987 0.311085Z"
                      fill="gray"
                    />
                  </svg>
                </div>
              </button>
            ) : (
              <button
                type="button"
                className="hover:bg-gray-100 hover:rounded-xl px-4 flex justify-between border-y-[0.5px] w-full py-4 items-center "
                onClick={() => {
                  makeCanteen();
                  setVisible(false);
                }}
              >
                <div className="flex items-center">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.5 4.70017L3.5 2.00017H14.5C15.0688 3.54405 15.5693 5.11223 16 6.70017V7.30018L15.7 7.70017C15.5835 7.79618 15.4467 7.86456 15.3 7.90017C15.1076 7.97801 14.8924 7.97801 14.7 7.90017C14.5533 7.86456 14.4165 7.79618 14.3 7.70017L14.1 7.30018L14 6.70017C14 6.43496 13.8946 6.1806 13.7071 5.99307C13.5196 5.80553 13.2652 5.70017 13 5.70017C12.7348 5.70017 12.4804 5.80553 12.2929 5.99307C12.1054 6.1806 12 6.43496 12 6.70017C12 7.10017 11.9 7.40017 11.7 7.70017C11.5154 7.88859 11.2638 7.99642 11 8.00017C10.8685 8.00438 10.7376 7.9797 10.6167 7.92787C10.4958 7.87603 10.3877 7.79831 10.3 7.70017C10.1 7.40017 10 7.10017 10 6.70017C10 6.43496 9.89464 6.1806 9.70711 5.99307C9.51957 5.80553 9.26522 5.70017 9 5.70017C8.73478 5.70017 8.48043 5.80553 8.29289 5.99307C8.10536 6.1806 8 6.43496 8 6.70017C8 7.10017 7.9 7.40017 7.7 7.70017C7.51537 7.88859 7.26377 7.99642 7 8.00017C6.86848 8.00438 6.73765 7.9797 6.6167 7.92787C6.49576 7.87603 6.38765 7.79831 6.3 7.70017C6.1 7.40017 6 7.10017 6 6.70017C6 6.43496 5.89464 6.1806 5.70711 5.99307C5.51957 5.80553 5.26522 5.70017 5 5.70017C4.73478 5.70017 4.48043 5.80553 4.29289 5.99307C4.10536 6.1806 4 6.43496 4 6.70017C4.00938 6.98029 3.9401 7.25743 3.8 7.50017L3.7 7.70017C3.58347 7.79618 3.44672 7.86456 3.3 7.90017L3 8.00017C2.80723 7.95207 2.63316 7.84762 2.5 7.70017H2.4C2.2 7.40017 2 7.10017 2 6.70017V6.50017L2.1 6.00017L2.5 4.70017ZM1 9.00017L0.9 8.90017C0.352545 8.29428 0.0341736 7.51604 0 6.70017L0.2 5.50017C0.547794 4.06332 1.01612 2.65834 1.6 1.30017C1.74419 0.914146 2.0041 0.58208 2.3442 0.349386C2.68429 0.116691 3.08796 -0.00527193 3.5 0.000174798H14.5C14.8835 0.0065324 15.2571 0.123036 15.5763 0.335799C15.8954 0.548563 16.1466 0.848609 16.3 1.20017C16.9574 3.00424 17.5247 4.83983 18 6.70017C18.0172 7.53788 17.7334 8.35398 17.2 9.00017L17 9.20017V16.0002C17 16.5306 16.7893 17.0393 16.4142 17.4144C16.0391 17.7895 15.5304 18.0002 15 18.0002H9C8.73478 18.0002 8.48043 17.8948 8.29289 17.7073C8.10536 17.5197 8 17.2654 8 17.0002V13.0002H5V17.0002C5 17.6002 4.6 18.0002 4 18.0002H3C2.46957 18.0002 1.96086 17.7895 1.58579 17.4144C1.21071 17.0393 1 16.5306 1 16.0002V9.10017V9.00017ZM10 11.9002C10 11.3002 10.4 10.9002 11 10.9002H13C13.6 10.9002 14 11.3002 14 11.9002V13.9002C14 14.5002 13.6 14.9002 13 14.9002H11C10.7348 14.9002 10.4804 14.7948 10.2929 14.6073C10.1054 14.4197 10 14.1654 10 13.9002V11.9002Z"
                      fill="gray"
                    />
                  </svg>
                  Buat Kantin
                </div>
                <div className="">
                  <svg
                    width="9"
                    height="15"
                    viewBox="0 0 9 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                  >
                    <path
                      d="M0.310987 0.311085C0.111799 0.510333 -9.88884e-05 0.780536 -9.89007e-05 1.06227C-9.89131e-05 1.34401 0.111799 1.61421 0.310987 1.81346L5.57036 7.07284L0.310986 12.3322C0.117443 12.5326 0.0103494 12.801 0.0127702 13.0796C0.015191 13.3582 0.126933 13.6246 0.323929 13.8216C0.520925 14.0186 0.787414 14.1304 1.066 14.1328C1.34458 14.1352 1.61297 14.0281 1.81336 13.8346L7.82392 7.82402C8.02311 7.62477 8.13501 7.35457 8.13501 7.07284C8.13501 6.7911 8.02311 6.5209 7.82392 6.32165L1.81336 0.311085C1.61411 0.111897 1.34391 -2.96848e-07 1.06217 -3.09163e-07C0.780437 -3.21479e-07 0.510235 0.111897 0.310987 0.311085Z"
                      fill="gray"
                    />
                  </svg>
                </div>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                router.push('/orderlist')
                setVisible(false);
              }}
              className="hover:bg-gray-100 hover:rounded-xl px-4 flex justify-between border-b-[0.5px] w-full py-4 items-center"
            >
              <div className="flex items-center">
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 "
                >
                  <path
                    d="M17.59 5.06C17.3401 4.46843 16.9766 3.93162 16.52 3.48C16.0651 3.01558 15.5209 2.64818 14.92 2.4C14.5538 2.24936 14.1712 2.14196 13.78 2.08V0.75C13.78 0.551088 13.701 0.360322 13.5604 0.21967C13.4197 0.0790175 13.2289 0 13.03 0C12.8311 0 12.6403 0.0790175 12.4997 0.21967C12.359 0.360322 12.28 0.551088 12.28 0.75V2.02H5.67002V0.75C5.67002 0.551088 5.591 0.360322 5.45035 0.21967C5.3097 0.0790175 5.11893 0 4.92002 0C4.72111 0 4.53034 0.0790175 4.38969 0.21967C4.24904 0.360322 4.17002 0.551088 4.17002 0.75V2.08C3.13476 2.23277 2.17691 2.71697 1.44002 3.46C0.981886 3.91608 0.618729 4.45848 0.371558 5.05581C0.124386 5.65314 -0.0018943 6.29355 2.14752e-05 6.94V15.04C-0.00158682 15.6914 0.124102 16.3368 0.370022 16.94C0.611052 17.5398 0.971716 18.0842 1.43002 18.54C1.88402 19.004 2.42802 19.372 3.03002 19.62C3.62802 19.871 4.27002 20 4.92002 20H13.03C14.3323 19.9947 15.5797 19.4744 16.4996 18.5525C17.4196 17.6307 17.9374 16.3823 17.94 15.08V6.97C17.9564 6.31601 17.8372 5.66571 17.59 5.06ZM13.59 14.65H4.42002C4.22111 14.65 4.03034 14.571 3.88969 14.4303C3.74904 14.2897 3.67002 14.0989 3.67002 13.9C3.67002 13.7011 3.74904 13.5103 3.88969 13.3697C4.03034 13.229 4.22111 13.15 4.42002 13.15H13.52C13.7189 13.15 13.9097 13.229 14.0504 13.3697C14.191 13.5103 14.27 13.7011 14.27 13.9C14.27 14.0989 14.191 14.2897 14.0504 14.4303C13.9097 14.571 13.7189 14.65 13.52 14.65H13.59ZM13.59 9.58H4.42002C4.22111 9.58 4.03034 9.50098 3.88969 9.36033C3.74904 9.21968 3.67002 9.02891 3.67002 8.83C3.67002 8.63109 3.74904 8.44032 3.88969 8.29967C4.03034 8.15902 4.22111 8.08 4.42002 8.08H13.52C13.7189 8.08 13.9097 8.15902 14.0504 8.29967C14.191 8.44032 14.27 8.63109 14.27 8.83C14.27 9.02891 14.191 9.21968 14.0504 9.36033C13.9097 9.50098 13.7189 9.58 13.52 9.58H13.59Z"
                    fill="gray"
                  />
                </svg>
                Pesanan
              </div>
              <div className="">
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                >
                  <path
                    d="M0.310987 0.311085C0.111799 0.510333 -9.88884e-05 0.780536 -9.89007e-05 1.06227C-9.89131e-05 1.34401 0.111799 1.61421 0.310987 1.81346L5.57036 7.07284L0.310986 12.3322C0.117443 12.5326 0.0103494 12.801 0.0127702 13.0796C0.015191 13.3582 0.126933 13.6246 0.323929 13.8216C0.520925 14.0186 0.787414 14.1304 1.066 14.1328C1.34458 14.1352 1.61297 14.0281 1.81336 13.8346L7.82392 7.82402C8.02311 7.62477 8.13501 7.35457 8.13501 7.07284C8.13501 6.7911 8.02311 6.5209 7.82392 6.32165L1.81336 0.311085C1.61411 0.111897 1.34391 -2.96848e-07 1.06217 -3.09163e-07C0.780437 -3.21479e-07 0.510235 0.111897 0.310987 0.311085Z"
                    fill="gray"
                  />
                </svg>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                router.push("/account");
                setVisible(false);
              }}
              className="hover:bg-gray-100 hover:rounded-xl px-4 flex justify-between border-b-[0.5px] w-full py-4 items-center"
            >
              <div className="flex items-center">
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.2793 0.152C10.9093 -4.47035e-08 10.4393 0 9.50032 0C8.56132 0 8.09232 -4.47035e-08 7.72132 0.152C7.22877 0.354211 6.8367 0.743765 6.63132 1.235C6.53732 1.458 6.50132 1.719 6.48632 2.098C6.47965 2.3726 6.40305 2.64097 6.26376 2.87772C6.12448 3.11447 5.92711 3.31178 5.69032 3.451C5.44906 3.5851 5.17786 3.65615 4.90184 3.65754C4.62582 3.65894 4.35392 3.59065 4.11132 3.459C3.77332 3.281 3.52832 3.183 3.28632 3.151C2.75687 3.08148 2.22139 3.2238 1.79632 3.547C1.47832 3.789 1.24332 4.193 0.774315 5C0.304315 5.807 0.0703155 6.21 0.0173155 6.605C-0.0526845 7.131 0.0913156 7.663 0.417316 8.084C0.565316 8.276 0.774316 8.437 1.09732 8.639C1.57432 8.936 1.88032 9.442 1.88032 10C1.88032 10.558 1.57432 11.064 1.09832 11.36C0.774316 11.563 0.565315 11.724 0.416315 11.916C0.255398 12.1239 0.137285 12.3617 0.0687999 12.6156C0.000314891 12.8694 -0.0171837 13.1343 0.0173155 13.395C0.0703155 13.789 0.304315 14.193 0.774315 15C1.24432 15.807 1.47832 16.21 1.79632 16.453C2.22032 16.776 2.75632 16.918 3.28632 16.849C3.52832 16.817 3.77332 16.719 4.11132 16.541C4.35404 16.4092 4.62613 16.3408 4.90234 16.3422C5.17855 16.3436 5.44994 16.4147 5.69132 16.549C6.17732 16.829 6.46532 17.344 6.48632 17.902C6.50132 18.282 6.53732 18.542 6.63132 18.765C6.83532 19.255 7.22732 19.645 7.72132 19.848C8.09132 20 8.56132 20 9.50032 20C10.4393 20 10.9093 20 11.2793 19.848C11.7719 19.6458 12.1639 19.2562 12.3693 18.765C12.4633 18.542 12.4993 18.282 12.5143 17.902C12.5343 17.344 12.8233 16.828 13.3103 16.549C13.5516 16.4149 13.8228 16.3439 14.0988 16.3425C14.3748 16.3411 14.6467 16.4093 14.8893 16.541C15.2273 16.719 15.4723 16.817 15.7143 16.849C16.2443 16.919 16.7803 16.776 17.2043 16.453C17.5223 16.211 17.7573 15.807 18.2263 15C18.6963 14.193 18.9303 13.79 18.9833 13.395C19.0177 13.1343 19 12.8693 18.9314 12.6155C18.8627 12.3616 18.7444 12.1239 18.5833 11.916C18.4353 11.724 18.2263 11.563 17.9033 11.361C17.4263 11.064 17.1203 10.558 17.1203 10C17.1203 9.442 17.4263 8.936 17.9023 8.64C18.2263 8.437 18.4353 8.276 18.5843 8.084C18.7452 7.87606 18.8633 7.63829 18.9318 7.38443C19.0003 7.13057 19.0178 6.86566 18.9833 6.605C18.9303 6.211 18.6963 5.807 18.2263 5C17.7563 4.193 17.5223 3.79 17.2043 3.547C16.7792 3.2238 16.2438 3.08148 15.7143 3.151C15.4723 3.183 15.2273 3.281 14.8893 3.459C14.6466 3.59083 14.3745 3.65922 14.0983 3.65782C13.8221 3.65642 13.5507 3.58528 13.3093 3.451C13.0727 3.31166 12.8755 3.11429 12.7364 2.87755C12.5973 2.64081 12.5209 2.37251 12.5143 2.098C12.4993 1.718 12.4633 1.458 12.3693 1.235C12.2677 0.991736 12.1191 0.770883 11.9321 0.585058C11.745 0.399233 11.5232 0.252078 11.2793 0.152ZM9.50032 13C11.1703 13 12.5233 11.657 12.5233 10C12.5233 8.343 11.1693 7 9.50032 7C7.83032 7 6.47732 8.343 6.47732 10C6.47732 11.657 7.83132 13 9.50032 13Z"
                    fill="gray"
                  />
                </svg>
                Akun
              </div>
              <div className="">
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                >
                  <path
                    d="M0.310987 0.311085C0.111799 0.510333 -9.88884e-05 0.780536 -9.89007e-05 1.06227C-9.89131e-05 1.34401 0.111799 1.61421 0.310987 1.81346L5.57036 7.07284L0.310986 12.3322C0.117443 12.5326 0.0103494 12.801 0.0127702 13.0796C0.015191 13.3582 0.126933 13.6246 0.323929 13.8216C0.520925 14.0186 0.787414 14.1304 1.066 14.1328C1.34458 14.1352 1.61297 14.0281 1.81336 13.8346L7.82392 7.82402C8.02311 7.62477 8.13501 7.35457 8.13501 7.07284C8.13501 6.7911 8.02311 6.5209 7.82392 6.32165L1.81336 0.311085C1.61411 0.111897 1.34391 -2.96848e-07 1.06217 -3.09163e-07C0.780437 -3.21479e-07 0.510235 0.111897 0.310987 0.311085Z"
                    fill="gray"
                  />
                </svg>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                clear();
                signoutHandler();
                setVisible(false);
              }}
              className="hover:bg-gray-100 hover:rounded-xl px-4 flex justify-between border-b-[0.5px] w-full py-4 items-center"
            >
              <div className="flex items-center">
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.796 0.24405C9.653 -0.17395 11 1.42205 11 3.00005V17C11 18.578 9.653 20.1741 7.796 19.7561C3.334 18.7521 0 14.7661 0 10.0001C0 5.23405 3.334 1.24805 7.796 0.24405ZM13.293 6.29305C13.4805 6.10558 13.7348 6.00026 14 6.00026C14.2652 6.00026 14.5195 6.10558 14.707 6.29305L17.707 9.29305C17.8945 9.48058 17.9998 9.73489 17.9998 10.0001C17.9998 10.2652 17.8945 10.5195 17.707 10.7071L14.707 13.7071C14.5184 13.8892 14.2658 13.99 14.0036 13.9877C13.7414 13.9854 13.4906 13.8803 13.3052 13.6949C13.1198 13.5095 13.0146 13.2586 13.0123 12.9965C13.01 12.7343 13.1108 12.4817 13.293 12.2931L14.586 11.0001H6C5.73478 11.0001 5.48043 10.8947 5.29289 10.7072C5.10536 10.5196 5 10.2653 5 10.0001C5 9.73483 5.10536 9.48048 5.29289 9.29294C5.48043 9.10541 5.73478 9.00005 6 9.00005H14.586L13.293 7.70705C13.1055 7.51952 13.0002 7.26521 13.0002 7.00005C13.0002 6.73489 13.1055 6.48058 13.293 6.29305Z"
                    fill="gray"
                  />
                </svg>
                Keluar
              </div>
              <div className="">
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                >
                  <path
                    d="M0.310987 0.311085C0.111799 0.510333 -9.88884e-05 0.780536 -9.89007e-05 1.06227C-9.89131e-05 1.34401 0.111799 1.61421 0.310987 1.81346L5.57036 7.07284L0.310986 12.3322C0.117443 12.5326 0.0103494 12.801 0.0127702 13.0796C0.015191 13.3582 0.126933 13.6246 0.323929 13.8216C0.520925 14.0186 0.787414 14.1304 1.066 14.1328C1.34458 14.1352 1.61297 14.0281 1.81336 13.8346L7.82392 7.82402C8.02311 7.62477 8.13501 7.35457 8.13501 7.07284C8.13501 6.7911 8.02311 6.5209 7.82392 6.32165L1.81336 0.311085C1.61411 0.111897 1.34391 -2.96848e-07 1.06217 -3.09163e-07C0.780437 -3.21479e-07 0.510235 0.111897 0.310987 0.311085Z"
                    fill="gray"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Profil;
