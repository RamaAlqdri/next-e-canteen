'use client'

import { SessionProvider as Provider } from "next-auth/react";
// import { auth } from "@/lib/auth";
import ClientProviders from "./ClientProviders";

export default  function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  
  return (
    <Provider >
      <ClientProviders>{children}</ClientProviders>
    </Provider>
  );
}
