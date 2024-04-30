import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Providers from "@/components/Providers"
import { Poppins } from "next/font/google";
import Cart from "@/components/popUp_cart/Cart";


// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	adjustFontFallback: false,
});

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
      <body className={poppins.className}>
      <Providers>
          <div className="min-h-screen flex flex-col items-center">
            <Header />
            
            {children}
            {/* <footer className="footer footer-center p-4  text-base-content">
              <p>Copyright ☠︎ 2023 - All right reserved by Next</p>
            </footer> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
