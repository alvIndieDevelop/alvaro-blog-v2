import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Modern body font - Inter
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Monospace font for code and stats - JetBrains Mono
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

// Fantasy display font - Cinzel (loaded from Google Fonts)
// Note: Using next/font/google for Cinzel
import { Cinzel } from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

// Export all font variables for use in layout
export const fontVariables = `${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable}`;
