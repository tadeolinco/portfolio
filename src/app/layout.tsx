import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const fireCodeFont = Fira_Code({
  variable: "--font-fire-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sam Bautista",
  description: "Sam Bautista's portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>Sam Bautista</title>
      <meta name="description" content="Sam Bautista. JS Frontend Engineer." />
      <body className={`${fireCodeFont.variable} antialiased`}>
        <Suspense>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
