import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
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
      <body className={`${fireCodeFont.variable} antialiased`}>{children}</body>
    </html>
  );
}
