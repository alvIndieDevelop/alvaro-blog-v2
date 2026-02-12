import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  author: string;
  readingTime: string;
  content: string;
  locale: string;
  isTranslated: boolean;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  author: string;
  readingTime: string;
  locale: string;
  isTranslated: boolean;
}

/**
 * Get the blog directory for a specific locale
 * Falls back to root directory if locale subdirectory doesn't exist
 */
function getBlogDir(locale: string = "en"): string {
  const localeDir = path.join(CONTENT_DIR, locale);
  
  // Check if locale-specific directory exists
  if (fs.existsSync(localeDir)) {
    return localeDir;
  }
  
  // Fall back to root content/blog directory (legacy support)
  return CONTENT_DIR;
}

/**
 * Check if a post exists in a specific locale
 */
function postExistsInLocale(slug: string, locale: string): boolean {
  const localeDir = path.join(CONTENT_DIR, locale);
  const filePath = path.join(localeDir, `${slug}.mdx`);
  return fs.existsSync(filePath);
}

/**
 * Get all posts for a specific locale
 * Falls back to English content if locale content doesn't exist
 */
export function getAllPosts(locale: string = "en"): BlogPostMeta[] {
  const blogDir = getBlogDir(locale);
  const fallbackDir = locale !== "en" ? getBlogDir("en") : null;
  
  // Ensure the blog directory exists
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const processedSlugs = new Set<string>();

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      processedSlugs.add(slug);
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        tags: data.tags || [],
        cover: data.cover,
        author: data.author || "Alvaro Martin Caballero",
        readingTime: readingTime(content).text,
        locale,
        isTranslated: true,
      };
    });

  // If we're looking for a non-English locale, also include English posts that aren't translated
  if (fallbackDir && fs.existsSync(fallbackDir)) {
    const fallbackFiles = fs.readdirSync(fallbackDir);
    
    fallbackFiles
      .filter((file) => file.endsWith(".mdx"))
      .forEach((file) => {
        const slug = file.replace(".mdx", "");
        
        // Skip if we already have this post in the target locale
        if (processedSlugs.has(slug)) return;
        
        const filePath = path.join(fallbackDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        posts.push({
          slug,
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date
            ? new Date(data.date).toISOString()
            : new Date().toISOString(),
          tags: data.tags || [],
          cover: data.cover,
          author: data.author || "Alvaro Martin Caballero",
          readingTime: readingTime(content).text,
          locale: "en", // Original locale
          isTranslated: false, // Not translated to target locale
        });
      });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single post by slug for a specific locale
 * Falls back to English if the post doesn't exist in the target locale
 */
export function getPostBySlug(slug: string, locale: string = "en"): BlogPost | null {
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
    title: data.title || "Untitled",
    description: data.description || "",
    date: data.date
      ? new Date(data.date).toISOString()
      : new Date().toISOString(),
    tags: data.tags || [],
    cover: data.cover,
    author: data.author || "Alvaro Martin Caballero",
    readingTime: readingTime(content).text,
    content,
    locale: actualLocale,
    isTranslated,
  };
}

/**
 * Get all unique tags from posts in a specific locale
 */
export function getAllTags(locale: string = "en"): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get posts filtered by tag for a specific locale
 */
export function getPostsByTag(tag: string, locale: string = "en"): BlogPostMeta[] {
  return getAllPosts(locale).filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

/**
 * Get all slugs (for static generation)
 */
export function getAllSlugs(): string[] {
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
