import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import { inter, jetbrainsMono, cinzel, fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alvaro-blog.netlify.app"),
  title: {
    default: "Alvaro Martin Caballero - Indie Developer",
    template: "%s | Alvaro's Sanctum",
  },
  description:
    "Welcome to the Sanctum. Explore my quests, read ancient scrolls, and discover the artifacts I've crafted on my journey as an indie developer.",
  keywords: [
    "developer",
    "portfolio",
    "blog",
    "nextjs",
    "react",
    "typescript",
    "indie developer",
    "game developer",
  ],
  authors: [{ name: "Alvaro Martin Caballero" }],
  creator: "Alvaro Martin Caballero",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alvaro-blog.netlify.app",
    siteName: "Alvaro's Sanctum",
    title: "Alvaro Martin Caballero - Indie Developer",
    description:
      "Welcome to the Sanctum. Explore my quests and discover the artifacts I've crafted.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvaro Martin Caballero",
    description: "Indie Developer | Full-Stack Mage | Game Crafter",
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
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Background pattern overlay */}
          <div className="fixed inset-0 -z-10 bg-void bg-grid-pattern" />
          
          <div className="relative flex min-h-screen flex-col">
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
