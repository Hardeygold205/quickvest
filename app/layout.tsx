import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
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
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <Providers>
              <div className="">
                <Navbar />
                <main>
                  <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      {children}
                    </div>
                  </div>
                </main>
                <TabBar />
              </div>
            </Providers>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
