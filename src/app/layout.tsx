import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import React from "react";
import {Providers} from "@/app/providers";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Ponytail_practical",
  description: "Best Project Ever",
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
        {children}
      </Providers>
      </body>
    </html>
  );
}
