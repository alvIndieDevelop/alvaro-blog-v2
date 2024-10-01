import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "@/components/layouts/MainLayout";

const handleRouteChange = (url: string) => {
  (window as any).gtag("config", "G-K83BFTJEYN", {
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
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
