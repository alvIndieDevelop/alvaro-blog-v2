import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // Used when no locale matches
  defaultLocale: "en",

  // Only add locale prefix for non-default locales
  // English: /about, /forge, /blog
  // Spanish: /es/about, /es/forge, /es/blog
  localePrefix: "as-needed",
});

// Type for supported locales
export type Locale = (typeof routing.locales)[number];
