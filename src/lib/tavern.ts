import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { TavernContentType } from "./realms";

const CONTENT_DIR = path.join(process.cwd(), "content/tavern/tales");

export type TavernMood = "happy" | "reflective" | "excited" | "casual";

export interface TavernTale {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  author: string;
  readingTime: string;
  content: string;
  type: TavernContentType;
  mood: TavernMood;
  locale: string;
  isTranslated: boolean;
}

export interface TavernTaleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  author: string;
  readingTime: string;
  type: TavernContentType;
  mood: TavernMood;
  locale: string;
  isTranslated: boolean;
}

/**
 * Get the tales directory for a specific locale
 * Falls back to root directory if locale subdirectory doesn't exist
 */
function getTalesDir(locale: string = "en"): string {
  const localeDir = path.join(CONTENT_DIR, locale);
  
  // Check if locale-specific directory exists
  if (fs.existsSync(localeDir)) {
    return localeDir;
  }
  
  // Fall back to root content/tavern/tales directory (legacy support)
  return CONTENT_DIR;
}

/**
 * Get all tavern tales metadata (without content) for a specific locale
 * Falls back to English content if locale content doesn't exist
 */
export function getAllTales(locale: string = "en"): TavernTaleMeta[] {
  const talesDir = getTalesDir(locale);
  const fallbackDir = locale !== "en" ? getTalesDir("en") : null;
  
  // Ensure the tales directory exists
  if (!fs.existsSync(talesDir)) {
    return [];
  }

  const files = fs.readdirSync(talesDir);
  const processedSlugs = new Set<string>();

  const tales = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      processedSlugs.add(slug);
      const filePath = path.join(talesDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title || "Untitled Tale",
        description: data.description || "",
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        tags: data.tags || [],
        cover: data.cover,
        author: data.author || "Alvaro Martin Caballero",
        readingTime: readingTime(content).text,
        type: (data.type as TavernContentType) || "tale",
        mood: (data.mood as TavernMood) || "casual",
        locale,
        isTranslated: true,
      };
    });

  // If we're looking for a non-English locale, also include English tales that aren't translated
  if (fallbackDir && fs.existsSync(fallbackDir)) {
    const fallbackFiles = fs.readdirSync(fallbackDir);
    
    fallbackFiles
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => {
        const slug = file.replace(".mdx", "");
        
        // Skip if we already have this tale in the target locale
        if (processedSlugs.has(slug)) return;
        
        const filePath = path.join(fallbackDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        tales.push({
          slug,
          title: data.title || "Untitled Tale",
          description: data.description || "",
          date: data.date
            ? new Date(data.date).toISOString()
            : new Date().toISOString(),
          tags: data.tags || [],
          cover: data.cover,
          author: data.author || "Alvaro Martin Caballero",
          readingTime: readingTime(content).text,
          type: (data.type as TavernContentType) || "tale",
          mood: (data.mood as TavernMood) || "casual",
          locale: "en", // Original locale
          isTranslated: false, // Not translated to target locale
        });
      });
  }

  return tales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single tale by slug (with content) for a specific locale
 * Falls back to English if the tale doesn't exist in the target locale
 */
export function getTaleBySlug(slug: string, locale: string = "en"): TavernTale | null {
  // First try the locale-specific directory
  const localeDir = path.join(CONTENT_DIR, locale);
  let filePath = path.join(localeDir, `${slug}.mdx`);
  let isTranslated = true;
  let actualLocale = locale;

  // Check if locale-specific file exists
  if (!fs.existsSync(filePath)) {
    // For non-English locales, mark as not translated
    if (locale !== "en") {
      isTranslated = false;
      actualLocale = "en";
    }
    
    // Try the English locale directory
    const englishDir = path.join(CONTENT_DIR, "en");
    filePath = path.join(englishDir, `${slug}.mdx`);
    
    // If still doesn't exist, try the root directory (legacy)
    if (!fs.existsSync(filePath)) {
      filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
    }
  }

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || "Untitled Tale",
    description: data.description || "",
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString(),
    tags: data.tags || [],
    cover: data.cover,
    author: data.author || "Alvaro Martin Caballero",
    readingTime: readingTime(content).text,
    content,
    type: (data.type as TavernContentType) || "tale",
    mood: (data.mood as TavernMood) || "casual",
    locale: actualLocale,
    isTranslated,
  };
}

/**
 * Get all unique tags from tavern tales for a specific locale
 */
export function getAllTaleTags(locale: string = "en"): string[] {
  const tales = getAllTales(locale);
  const tags = new Set<string>();

  tales.forEach((tale) => {
    tale.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get tales filtered by tag for a specific locale
 */
export function getTalesByTag(tag: string, locale: string = "en"): TavernTaleMeta[] {
  return getAllTales(locale).filter((tale) =>
    tale.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get tales filtered by mood for a specific locale
 */
export function getTalesByMood(mood: TavernMood, locale: string = "en"): TavernTaleMeta[] {
  return getAllTales(locale).filter((tale) => tale.mood === mood);
}

/**
 * Get all tale slugs (for static generation)
 */
export function getAllTaleSlugs(): string[] {
  const slugs = new Set<string>();
  
  // Check root directory (legacy)
  if (fs.existsSync(CONTENT_DIR)) {
    const rootFiles = fs.readdirSync(CONTENT_DIR);
    rootFiles
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => slugs.add(file.replace(".mdx", "")));
  }
  
  // Check locale directories
  const locales = ["en", "es"];
  locales.forEach((locale) => {
    const localeDir = path.join(CONTENT_DIR, locale);
    if (fs.existsSync(localeDir)) {
      const files = fs.readdirSync(localeDir);
      files
        .filter((file) => file.endsWith(".mdx"))
        .forEach((file) => slugs.add(file.replace(".mdx", "")));
    }
  });

  return Array.from(slugs);
}
