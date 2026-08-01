import { Manrope, Oswald } from "next/font/google";

export const displayFont = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
