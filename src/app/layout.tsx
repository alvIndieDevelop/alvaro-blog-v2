import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://alvaro-blog.netlify.app"),
  title: {
    default: "Alvaro Martin Caballero - Developer, Writer, Creator",
    template: "%s | Alvaro Blog",
  },
  description:
    "Personal portfolio, blog, and digital products. Discover my projects, read my thoughts, and explore my digital creations.",
  keywords: ["developer", "portfolio", "blog", "nextjs", "react", "typescript"],
  authors: [{ name: "Alvaro Martin Caballero" }],
  creator: "Alvaro Martin Caballero",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alvaro-blog.netlify.app",
    siteName: "Alvaro Blog",
    title: "Alvaro Martin Caballero - Developer, Writer, Creator",
    description: "Personal portfolio, blog, and digital products.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvaro Martin Caballero",
    description: "Developer, Writer, Creator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
