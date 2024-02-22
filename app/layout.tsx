import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Providers from "@/components/Providers"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Canteen",
  description: "Online Canteen Website of Faculty of Engineering, University of Mataram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
              <p>Copyright ☠︎ 2023 - All right reserved by Next</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
