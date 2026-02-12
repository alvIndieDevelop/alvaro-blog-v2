import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import { inter, fontVariables } from "@/lib/fonts";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

// Generate static params for all supported locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Generate metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://alvaro-blog.netlify.app"),
    title: {
      default: t("title"),
      template: `%s | ${locale === "es" ? "El Santuario de Alvaro" : "Alvaro's Sanctum"}`,
    },
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: "Alvaro Martin Caballero" }],
    creator: "Alvaro Martin Caballero",
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: "https://alvaro-blog.netlify.app",
      siteName: locale === "es" ? "El Santuario de Alvaro" : "Alvaro's Sanctum",
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: "Alvaro Martin Caballero",
      description:
        locale === "es"
          ? "Desarrollador Indie | Mago Full-Stack | Artesano de Juegos"
          : "Indie Developer | Full-Stack Mage | Game Crafter",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: locale === "en" ? "/" : `/${locale}`,
      languages: {
        en: "/",
        es: "/es",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={fontVariables}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
