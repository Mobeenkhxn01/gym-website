import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "ForgeFit Gym | Strength, Conditioning & Personal Training",
  description:
    "ForgeFit is Austin's premier fitness club. Join for strength training, conditioning classes, personal coaching, and recovery support. Book your free consultation today."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>{children}</body>
    </html>
  );
}
