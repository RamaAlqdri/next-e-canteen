"use client";
import useCartService from "@/lib/hooks/useCartStore";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/lib/models/UserModel";
import userService from "@/lib/services/userService";
const Menu = () => {
  const router = useRouter();
  const { items } = useCartService();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: session } = useSession();
  const makeCanteen = () => {
    router.push("/make_canteen");
  };
  const canteen = () =>{
    if (session?.user?.canteen) {
      router.push(`/canteen/${session.user.canteen}`);
    } else {
      // Handle case when 'canteen' is null or undefined
      console.error("Canteen not found in session user");
    }
  }


  const signoutHandler = () => {
    signOut({ callbackUrl: "/signin" });
  };


  // console.log(session?.user?.canteen);
  
  // const email = session?.user?.email as string;
  // console.log(email);
  // const userData = await userService.getUserData(email);
  // console.log(userData);

  return (
    <div>
      <ul className="flex items-stretch">
        <li className="">
          <Link className="btn btn-ghost rounded-btn" href="/cart">
            <svg
              width="20"
              height="20"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 0C0.367392 0 0.240215 0.0526785 0.146447 0.146447C0.0526785 0.240215 0 0.367392 0 0.5C0 0.632608 0.0526785 0.759785 0.146447 0.853553C0.240215 0.947321 0.367392 1 0.5 1H0.746C0.854571 1.00019 0.960131 1.03571 1.04673 1.1012C1.13332 1.16669 1.19625 1.25858 1.226 1.363L2.812 6.913C2.9017 7.22621 3.09094 7.50169 3.3511 7.6978C3.61126 7.89392 3.9282 7.99999 4.254 8H8.823C9.12285 8.00005 9.41583 7.91024 9.66413 7.74215C9.91243 7.57406 10.1047 7.33541 10.216 7.057L11.69 3.371C11.7506 3.21933 11.7731 3.05512 11.7556 2.89273C11.7381 2.73034 11.681 2.57472 11.5895 2.43946C11.4979 2.3042 11.3747 2.19343 11.2304 2.11682C11.0861 2.04021 10.9253 2.0001 10.762 2H2.448L2.187 1.088C2.09753 0.774773 1.90852 0.499186 1.64854 0.302896C1.38856 0.106607 1.07176 0.000284368 0.746 0H0.5ZM3.774 6.637L2.734 3H10.762L9.287 6.686C9.24985 6.77869 9.18581 6.85813 9.10311 6.91409C9.02041 6.97006 8.92285 6.99998 8.823 7H4.254C4.14543 6.99981 4.03987 6.96429 3.95327 6.8988C3.86668 6.83331 3.80375 6.74142 3.774 6.637ZM4.5 12C4.69698 12 4.89204 11.9612 5.07403 11.8858C5.25601 11.8104 5.42137 11.6999 5.56066 11.5607C5.69995 11.4214 5.81044 11.256 5.88582 11.074C5.9612 10.892 6 10.697 6 10.5C6 10.303 5.9612 10.108 5.88582 9.92597C5.81044 9.74399 5.69995 9.57863 5.56066 9.43934C5.42137 9.30005 5.25601 9.18956 5.07403 9.11418C4.89204 9.0388 4.69698 9 4.5 9C4.10218 9 3.72064 9.15804 3.43934 9.43934C3.15804 9.72064 3 10.1022 3 10.5C3 10.8978 3.15804 11.2794 3.43934 11.5607C3.72064 11.842 4.10218 12 4.5 12ZM4.5 11C4.36739 11 4.24021 10.9473 4.14645 10.8536C4.05268 10.7598 4 10.6326 4 10.5C4 10.3674 4.05268 10.2402 4.14645 10.1464C4.24021 10.0527 4.36739 10 4.5 10C4.63261 10 4.75979 10.0527 4.85355 10.1464C4.94732 10.2402 5 10.3674 5 10.5C5 10.6326 4.94732 10.7598 4.85355 10.8536C4.75979 10.9473 4.63261 11 4.5 11ZM8.5 12C8.69698 12 8.89204 11.9612 9.07403 11.8858C9.25601 11.8104 9.42137 11.6999 9.56066 11.5607C9.69995 11.4214 9.81044 11.256 9.88582 11.074C9.9612 10.892 10 10.697 10 10.5C10 10.303 9.9612 10.108 9.88582 9.92597C9.81044 9.74399 9.69995 9.57863 9.56066 9.43934C9.42137 9.30005 9.25601 9.18956 9.07403 9.11418C8.89204 9.0388 8.69698 9 8.5 9C8.10218 9 7.72064 9.15804 7.43934 9.43934C7.15804 9.72064 7 10.1022 7 10.5C7 10.8978 7.15804 11.2794 7.43934 11.5607C7.72064 11.842 8.10218 12 8.5 12ZM8.5 11C8.36739 11 8.24021 10.9473 8.14645 10.8536C8.05268 10.7598 8 10.6326 8 10.5C8 10.3674 8.05268 10.2402 8.14645 10.1464C8.24021 10.0527 8.36739 10 8.5 10C8.63261 10 8.75979 10.0527 8.85355 10.1464C8.94732 10.2402 9 10.3674 9 10.5C9 10.6326 8.94732 10.7598 8.85355 10.8536C8.75979 10.9473 8.63261 11 8.5 11Z"
                fill="#86837F"
              />
            </svg>

            {mounted && items.length !== 0 && (
              <div className="badge w-5 border-0 ml-9 mb-4 absolute text-xs rounded-full badge-ePrimary">
                {items.reduce((a, c) => a + c.qty, 0)}{" "}
              </div>
            )}
          </Link>
        </li>
        {session && session.user ? (
          <>
            <li>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-ghost rounded-btn">
                  {session.user.name}
                  <div className="relative h-10 w-10 ml-2 rounded-full overflow-hidden">
                    <Image
                      src="/images/avatar/my.png"
                      alt="avatar"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg> */}
                </label>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-2 shadow bg-base-300 rounded-box w-52"
                >
                  <li>
                    {session?.user?.role === "canteen" ? (
                      <button type="button" onClick={canteen}>
                        
                        Your Canteen
                      </button>
                    ) : (
                      <button type="button" onClick={makeCanteen}>
                        Make a Canteen
                      </button>
                    )}
                    <button type="button" onClick={signoutHandler}>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          </>
        ) : (
          <li>
            <button
              className="font-medium px-3 h-10 rounded-lg btn-ePrimary ml-4"
              type="button"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </li>
        )}
        {/* <div className="flex items-center ml-4">
          <p className="text-md font-medium">Rama</p>
          <div className="relative h-10 w-10 ml-2 rounded-full overflow-hidden">
            <Image
              src="/images/avatar/my.png"
              alt="avatar"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => signIn()}
            className="font-medium px-3 h-10 rounded-lg btn-ePrimary ml-4 "
          >
            Sign In
          </button>
        </div> */}
      </ul>
    </div>
  );
};
export default Menu;
