"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";

const MenuMobile = () => {
  const router = useRouter();
  const path = usePathname();
  const path2 = path.split("/");
  const path3 = path2[1];
//   console.log(path2[1]);
  const [beranda, setBeranda] = useState("gray");
  const [kantin, setKantin] = useState("gray");
  const [pesanan, setPesanan] = useState("gray");
  const [berandaGlow, setBerandaGlow] = useState("");
  const [kantinGlow, setKantinGlow] = useState("");
  const [pesananGlow, setPesananGlow] = useState("");

  useEffect(() => {
    if (path3 === "") {
      setBeranda("#EEA147");
      setKantin("gray");
      setPesanan("gray");

      setBerandaGlow("drop-shadow-[0_10px_10px_rgba(237,161,71,0.5)]");
      setKantinGlow("");
      setPesananGlow("");
    } else if (path3 === "canteen") {
      setKantin("#EEA147");
      setBeranda("gray");
      setPesanan("gray");

      setBerandaGlow("");
      setKantinGlow("drop-shadow-[0_10px_10px_rgba(237,161,71,0.5)]");
      setPesananGlow("");
    } else if (path3 === "order") {
      setPesanan("#EEA147");
      setBeranda("gray");
      setKantin("gray");

      setBerandaGlow("");
      setKantinGlow("");
      setPesananGlow("drop-shadow-[0_10px_10px_rgba(237,161,71,0.5)]");
    }
    // setBeranda("bg-base-200");
  }, [path3]);
  return (
    <div className="fixed  bottom-0 left-0 w-full px-6 py-1 bg-white drop-shadow-[0_0px_2px_rgba(0,0,0,0.1)] flex items-center justify-around ">
      <div 
      onClick={
        () => router.push("/")
      }
      className="flex flex-col justify-center items-center hover:bg-base-200 w-20  h-14 rounded-lg">
        <svg
          width="18"
          height="19"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ` + berandaGlow}
        >
          <path
            d="M10.45 0.529535C10.0442 0.187557 9.53066 0 9 0C8.46934 0 7.95577 0.187557 7.55 0.529535L0.8 6.22453C0.549459 6.43569 0.348059 6.69902 0.209877 6.99611C0.0716959 7.2932 6.77287e-05 7.61688 0 7.94454V17.2495C0 18.2155 0.784 18.9995 1.75 18.9995H4.75C5.21413 18.9995 5.65925 18.8152 5.98744 18.487C6.31563 18.1588 6.5 17.7137 6.5 17.2495V13.2465C6.5 12.5665 7.042 12.0145 7.717 11.9965H10.283C10.6088 12.0051 10.9183 12.1406 11.1456 12.3741C11.373 12.6076 11.5001 12.9207 11.5 13.2465V17.2495C11.5 18.2155 12.284 18.9995 13.25 18.9995H16.25C16.7141 18.9995 17.1592 18.8152 17.4874 18.487C17.8156 18.1588 18 17.7137 18 17.2495V7.94353C17.9999 7.61588 17.9283 7.2922 17.7901 6.99511C17.6519 6.69802 17.4505 6.43469 17.2 6.22354L10.45 0.529535Z"
            fill={beranda}
          />
        </svg>

        <span className="text-xs mt-1 opacity-70">Beranda</span>
      </div>
      <div className="flex flex-col justify-center items-center hover:bg-base-200 w-20  h-14 rounded-lg">
        <svg
          width="30"
          height="30"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ` + kantinGlow}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 4.70017L3.5 2.00017H14.5C15.0688 3.54405 15.5693 5.11223 16 6.70017V7.30018L15.7 7.70017C15.5835 7.79618 15.4467 7.86456 15.3 7.90017C15.1076 7.97801 14.8924 7.97801 14.7 7.90017C14.5533 7.86456 14.4165 7.79618 14.3 7.70017L14.1 7.30018L14 6.70017C14 6.43496 13.8946 6.1806 13.7071 5.99307C13.5196 5.80553 13.2652 5.70017 13 5.70017C12.7348 5.70017 12.4804 5.80553 12.2929 5.99307C12.1054 6.1806 12 6.43496 12 6.70017C12 7.10017 11.9 7.40017 11.7 7.70017C11.5154 7.88859 11.2638 7.99642 11 8.00017C10.8685 8.00438 10.7376 7.9797 10.6167 7.92787C10.4958 7.87603 10.3877 7.79831 10.3 7.70017C10.1 7.40017 10 7.10017 10 6.70017C10 6.43496 9.89464 6.1806 9.70711 5.99307C9.51957 5.80553 9.26522 5.70017 9 5.70017C8.73478 5.70017 8.48043 5.80553 8.29289 5.99307C8.10536 6.1806 8 6.43496 8 6.70017C8 7.10017 7.9 7.40017 7.7 7.70017C7.51537 7.88859 7.26377 7.99642 7 8.00017C6.86848 8.00438 6.73765 7.9797 6.6167 7.92787C6.49576 7.87603 6.38765 7.79831 6.3 7.70017C6.1 7.40017 6 7.10017 6 6.70017C6 6.43496 5.89464 6.1806 5.70711 5.99307C5.51957 5.80553 5.26522 5.70017 5 5.70017C4.73478 5.70017 4.48043 5.80553 4.29289 5.99307C4.10536 6.1806 4 6.43496 4 6.70017C4.00938 6.98029 3.9401 7.25743 3.8 7.50017L3.7 7.70017C3.58347 7.79618 3.44672 7.86456 3.3 7.90017L3 8.00017C2.80723 7.95207 2.63316 7.84762 2.5 7.70017H2.4C2.2 7.40017 2 7.10017 2 6.70017V6.50017L2.1 6.00017L2.5 4.70017ZM1 9.00017L0.9 8.90017C0.352545 8.29428 0.0341736 7.51604 0 6.70017L0.2 5.50017C0.547794 4.06332 1.01612 2.65834 1.6 1.30017C1.74419 0.914146 2.0041 0.58208 2.3442 0.349386C2.68429 0.116691 3.08796 -0.00527193 3.5 0.000174798H14.5C14.8835 0.0065324 15.2571 0.123036 15.5763 0.335799C15.8954 0.548563 16.1466 0.848609 16.3 1.20017C16.9574 3.00424 17.5247 4.83983 18 6.70017C18.0172 7.53788 17.7334 8.35398 17.2 9.00017L17 9.20017V16.0002C17 16.5306 16.7893 17.0393 16.4142 17.4144C16.0391 17.7895 15.5304 18.0002 15 18.0002H9C8.73478 18.0002 8.48043 17.8948 8.29289 17.7073C8.10536 17.5197 8 17.2654 8 17.0002V13.0002H5V17.0002C5 17.6002 4.6 18.0002 4 18.0002H3C2.46957 18.0002 1.96086 17.7895 1.58579 17.4144C1.21071 17.0393 1 16.5306 1 16.0002V9.10017V9.00017ZM10 11.9002C10 11.3002 10.4 10.9002 11 10.9002H13C13.6 10.9002 14 11.3002 14 11.9002V13.9002C14 14.5002 13.6 14.9002 13 14.9002H11C10.7348 14.9002 10.4804 14.7948 10.2929 14.6073C10.1054 14.4197 10 14.1654 10 13.9002V11.9002Z"
            fill={kantin}
          />
        </svg>
        <span className="text-xs mt-1 opacity-70">Kantin</span>
      </div>

      <div className="flex flex-col justify-center items-center hover:bg-base-200 w-20  h-14 rounded-lg">
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ` + pesananGlow}
        >
          <path
            d="M17.59 5.06C17.3401 4.46843 16.9766 3.93162 16.52 3.48C16.0651 3.01558 15.5209 2.64818 14.92 2.4C14.5538 2.24936 14.1712 2.14196 13.78 2.08V0.75C13.78 0.551088 13.701 0.360322 13.5604 0.21967C13.4197 0.0790175 13.2289 0 13.03 0C12.8311 0 12.6403 0.0790175 12.4997 0.21967C12.359 0.360322 12.28 0.551088 12.28 0.75V2.02H5.67002V0.75C5.67002 0.551088 5.591 0.360322 5.45035 0.21967C5.3097 0.0790175 5.11893 0 4.92002 0C4.72111 0 4.53034 0.0790175 4.38969 0.21967C4.24904 0.360322 4.17002 0.551088 4.17002 0.75V2.08C3.13476 2.23277 2.17691 2.71697 1.44002 3.46C0.981886 3.91608 0.618729 4.45848 0.371558 5.05581C0.124386 5.65314 -0.0018943 6.29355 2.14752e-05 6.94V15.04C-0.00158682 15.6914 0.124102 16.3368 0.370022 16.94C0.611052 17.5398 0.971716 18.0842 1.43002 18.54C1.88402 19.004 2.42802 19.372 3.03002 19.62C3.62802 19.871 4.27002 20 4.92002 20H13.03C14.3323 19.9947 15.5797 19.4744 16.4996 18.5525C17.4196 17.6307 17.9374 16.3823 17.94 15.08V6.97C17.9564 6.31601 17.8372 5.66571 17.59 5.06ZM13.59 14.65H4.42002C4.22111 14.65 4.03034 14.571 3.88969 14.4303C3.74904 14.2897 3.67002 14.0989 3.67002 13.9C3.67002 13.7011 3.74904 13.5103 3.88969 13.3697C4.03034 13.229 4.22111 13.15 4.42002 13.15H13.52C13.7189 13.15 13.9097 13.229 14.0504 13.3697C14.191 13.5103 14.27 13.7011 14.27 13.9C14.27 14.0989 14.191 14.2897 14.0504 14.4303C13.9097 14.571 13.7189 14.65 13.52 14.65H13.59ZM13.59 9.58H4.42002C4.22111 9.58 4.03034 9.50098 3.88969 9.36033C3.74904 9.21968 3.67002 9.02891 3.67002 8.83C3.67002 8.63109 3.74904 8.44032 3.88969 8.29967C4.03034 8.15902 4.22111 8.08 4.42002 8.08H13.52C13.7189 8.08 13.9097 8.15902 14.0504 8.29967C14.191 8.44032 14.27 8.63109 14.27 8.83C14.27 9.02891 14.191 9.21968 14.0504 9.36033C13.9097 9.50098 13.7189 9.58 13.52 9.58H13.59Z"
            fill={pesanan}
          />
        </svg>

        <span className="text-xs mt-1 opacity-70">Pesanan</span>
      </div>
    </div>
  );
};

export default MenuMobile;