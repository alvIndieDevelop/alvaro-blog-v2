import type { ReactNode } from "react";

/**
 * Root layout - minimal wrapper
 *
 * The actual layout with providers, header, footer, etc.
 * is in [locale]/layout.tsx to support internationalization.
 *
 * This root layout is required by Next.js but delegates
 * all rendering to the locale-specific layout.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
