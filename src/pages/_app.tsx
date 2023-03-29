import "@/styles/globals.css";
import type { AppProps } from "next/app";
import MainLayout from "@/components/layouts/MainLayout";
import { analytics } from "@/utils/firebase";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    analytics;
  }, []);

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
