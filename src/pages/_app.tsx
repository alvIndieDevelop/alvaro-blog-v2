import React from "react";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layouts/Layout";
import config from "../utils/config";
import { Toaster } from "../components/ui/toaster";

const handleRouteChange = (url: string) => {
  (window as any).gtag("config", `${config.GOOGLE.ANALYTICS.TRACKING_ID}`, {
    page_path: url,
  });
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <Layout>
        <DefaultSeo
          title={config.APP.SEO.DEFAULT_TITLE}
          description={config.APP.SEO.DEFAULT_DESCRIPTION}
          openGraph={{
            type: "website",
            url: config.APP.SEO.DEFAULT_URL,
            site_name: "Alvaro Blog",
          }}
        />
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </ThemeProvider>
  );
}
