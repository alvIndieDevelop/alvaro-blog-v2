import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation utilities
 *
 * These replace the standard Next.js navigation imports:
 * - Link: Use instead of next/link for locale-aware links
 * - redirect: Use instead of next/navigation redirect
 * - usePathname: Returns pathname without locale prefix
 * - useRouter: Locale-aware router with push/replace
 * - getPathname: Get pathname for a specific locale
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
