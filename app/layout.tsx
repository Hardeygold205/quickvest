import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/constants/Navbar";
import TabBar from "@/constants/TabBar";
import { Providers } from "@/constants/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickVest Int.",
  description:
    "QuickVest is a web3 investment platform that allows users to invest in various projects and assets using cryptocurrencies.",
  icons: {
    icon: "/QuickVest.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="">
            <Navbar />
            <main>
              <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
                {children}
              </div>
            </main>
            <TabBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
