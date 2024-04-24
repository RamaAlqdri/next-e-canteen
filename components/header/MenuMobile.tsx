"use client";
import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";

const MenuMobile = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white drop-shadow-[0_0px_2px_rgba(0,0,0,0.1)] flex justify-around py-3">
      <div className="flex flex-col items-center">
        <FaHome className="text-2xl" />
        <span className="text-xs">Home</span>
      </div>
      <div className="flex flex-col items-center">
        <FaUser className="text-2xl" />
        <span className="text-xs">Profile</span>
      </div>
      <div className="flex flex-col items-center">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xs">Cart</span>
      </div>
    </div>
  );
};

export default MenuMobile;
