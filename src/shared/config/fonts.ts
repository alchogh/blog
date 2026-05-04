import { Geist } from "next/font/google";
import localFont from "next/font/local";

export const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "45 920",
});

export const wantedSans = localFont({
  src: "./fonts/WantedSansVariable.woff2",
  display: "swap",
  variable: "--font-wanted-sans",
  weight: "400 1000",
});

export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});
