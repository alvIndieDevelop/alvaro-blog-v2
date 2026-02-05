# App Router + MDX Blog Migration Plan

## Overview

This plan outlines the complete migration from Pages Router to App Router, replacing Notion CMS with local MDX files for blog content, and implementing performance/SEO improvements.

---

## Phase 1: Remove Notion & Add MDX Support

### 1.1 Remove Notion Dependencies

**Files to Delete:**
```
src/services/notion-services.ts
```

**Dependencies to Remove from package.json:**
```json
{
  "@notionhq/client": "^2.2.15",
  "notion-to-md": "^3.1.1"
}
```

### 1.2 Install MDX Dependencies

```bash
yarn add @next/mdx @mdx-js/loader @mdx-js/react
yarn add gray-matter reading-time
yarn add -D @types/mdx
```

### 1.3 MDX Configuration

**next.config.mjs** (rename from .js):

```js
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
```

### 1.4 MDX Components File

**src/mdx-components.tsx** (required for App Router):

```tsx
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom heading with anchor links
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mt-4 mb-2">{children}</h3>
    ),
    
    // Custom link component
    a: ({ href, children }) => {
      if (href?.startsWith('/')) {
        return <Link href={href} className="text-primary hover:underline">{children}</Link>
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          {children}
        </a>
      )
    },
    
    // Custom image component
    img: ({ src, alt }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg my-4"
      />
    ),
    
    // Code blocks with syntax highlighting
    pre: ({ children }) => (
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),
    
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
        {children}
      </code>
    ),
    
    // Blockquote styling
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    
    ...components,
  }
}
```

### 1.5 Blog Content Structure

```
content/
└── blog/
    ├── hello-world.mdx
    ├── getting-started-with-nextjs.mdx
    └── my-development-journey.mdx
```

**Example MDX Blog Post (content/blog/hello-world.mdx):**

```mdx
---
title: Hello World
description: My first blog post using MDX
date: 2024-01-15
tags: [nextjs, mdx, blog]
cover: /images/blog/hello-world.jpg
author: Alvaro Martin Caballero
---

# Hello World

Welcome to my blog! This is my first post using **MDX**.

## Why MDX?

MDX allows me to use React components directly in my markdown:

<Callout type="info">
  This is a custom callout component!
</Callout>

## Code Example

```typescript
const greeting = 'Hello, World!'
console.log(greeting)
```

## Conclusion

Thanks for reading!
```

### 1.6 Blog Utilities

**src/lib/blog.ts:**

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  cover?: string
  author: string
  readingTime: string
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  cover?: string
  author: string
  readingTime: string
}

export function getAllPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR)
  
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '')
      const filePath = path.join(BLOG_DIR, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      
      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        tags: data.tags || [],
        cover: data.cover,
        author: data.author || 'Alvaro Martin Caballero',
        readingTime: readingTime(content).text,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return posts
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    cover: data.cover,
    author: data.author || 'Alvaro Martin Caballero',
    readingTime: readingTime(content).text,
    content,
  }
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}
```

---

## Phase 2: App Router Migration

### 2.1 New Directory Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── loading.tsx             # Global loading
│   ├── error.tsx               # Global error
│   ├── not-found.tsx           # 404 page
│   ├── globals.css             # Global styles
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual post
│   ├── projects/
│   │   └── page.tsx
│   ├── services/
│   │   └── page.tsx
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
├── components/                  # Keep existing components
├── lib/
│   ├── utils.ts
│   └── blog.ts                 # New blog utilities
└── mdx-components.tsx          # MDX component overrides
```

### 2.2 Root Layout

**src/app/layout.tsx:**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://alvaro-blog.netlify.app'),
  title: {
    default: 'Alvaro Martin Caballero - Developer, Writer, Creator',
    template: '%s | Alvaro Blog',
  },
  description: 'Personal portfolio, blog, and digital products. Discover my projects, read my thoughts, and explore my digital creations.',
  keywords: ['developer', 'portfolio', 'blog', 'nextjs', 'react', 'typescript'],
  authors: [{ name: 'Alvaro Martin Caballero' }],
  creator: 'Alvaro Martin Caballero',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alvaro-blog.netlify.app',
    siteName: 'Alvaro Blog',
    title: 'Alvaro Martin Caballero - Developer, Writer, Creator',
    description: 'Personal portfolio, blog, and digital products.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alvaro Martin Caballero',
    description: 'Developer, Writer, Creator',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 2.3 Blog Pages

**src/app/blog/page.tsx:**

```tsx
import { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import BlogList from '@/components/BlogList'
import TagFilter from '@/components/TagFilter'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest thoughts on development, technology, and more.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <TagFilter tags={tags} />
      <BlogList posts={posts} />
    </div>
  )
}
```

**src/app/blog/[slug]/page.tsx:**

```tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/mdx-components'
import { ArticleJsonLd } from '@/components/JsonLd'
import ShareButtons from '@/components/ShareButtons'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const components = useMDXComponents({})

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={`https://alvaro-blog.netlify.app/blog/${slug}`}
        datePublished={post.date}
        author={post.author}
      />
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMMM d, yyyy')}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={post.content} components={components} />
      </div>

      <footer className="mt-8 pt-8 border-t">
        <ShareButtons
          url={`https://alvaro-blog.netlify.app/blog/${slug}`}
          title={post.title}
        />
      </footer>
    </article>
  )
}
```

### 2.4 Loading States

**src/app/blog/loading.tsx:**

```tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-48 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 2.5 Error Boundary

**src/app/error.tsx:**

```tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <p className="text-muted-foreground">
        {error.message || 'An unexpected error occurred'}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}
```

### 2.6 Not Found Page

**src/app/not-found.tsx:**

```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl">Page Not Found</h2>
      <p className="text-muted-foreground">
        The page you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
```

---

## Phase 3: SEO Improvements

### 3.1 Dynamic Sitemap

**src/app/sitemap.ts:**

```typescript
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alvaro-blog.netlify.app'

  const staticPages = [
    '',
    '/about',
    '/blog',
    '/projects',
    '/services',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const posts = getAllPosts()
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
```

### 3.2 Robots.txt

**src/app/robots.ts:**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: 'https://alvaro-blog.netlify.app/sitemap.xml',
  }
}
```

### 3.3 JSON-LD Components

**src/components/JsonLd.tsx:**

```tsx
interface ArticleJsonLdProps {
  title: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author: string
  image?: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
}: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Person',
      name: 'Alvaro Martin Caballero',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Alvaro Martin Caballero',
    jobTitle: 'Software Developer',
    url: 'https://alvaro-blog.netlify.app',
    sameAs: [
      'https://github.com/alvIndieDevelop',
      'https://linkedin.com/in/alvaro-martin-caballero',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

---

## Phase 4: Image Optimization

### 4.1 Static Image Imports

```tsx
// src/components/sections/Hero.tsx
import Image from 'next/image'
import profileImage from '@/public/media/Photo01.jpg'

export default function Hero() {
  return (
    <Image
      src={profileImage}
      alt="Alvaro Martin Caballero"
      width={300}
      height={300}
      placeholder="blur"
      priority
      className="rounded-full"
    />
  )
}
```

### 4.2 Blog Image Component

```tsx
// src/components/BlogImage.tsx
import Image from 'next/image'

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
}

export function BlogImage({ src, alt, caption }: BlogImageProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={400}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, 800px"
      />
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
```

---

## Migration Checklist

### Phase 1: Remove Notion & Add MDX
- [ ] Remove `@notionhq/client` and `notion-to-md` from package.json
- [ ] Delete `src/services/notion-services.ts`
- [ ] Install MDX dependencies
- [ ] Create `content/blog/` directory
- [ ] Create `src/lib/blog.ts` utilities
- [ ] Create `src/mdx-components.tsx`
- [ ] Rename `next.config.js` to `next.config.mjs`
- [ ] Update next.config with MDX support
- [ ] Create sample blog posts
- [ ] Run `yarn install`

### Phase 2: App Router Migration
- [ ] Create `src/app/` directory structure
- [ ] Create root `layout.tsx`
- [ ] Create `globals.css` (copy from styles)
- [ ] Migrate home page to `app/page.tsx`
- [ ] Migrate about page to `app/about/page.tsx`
- [ ] Migrate blog pages to `app/blog/`
- [ ] Migrate projects page to `app/projects/page.tsx`
- [ ] Migrate services page to `app/services/page.tsx`
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Add not-found page
- [ ] Delete old `pages/` directory
- [ ] Update all imports

### Phase 3: SEO
- [ ] Create `sitemap.ts`
- [ ] Create `robots.ts`
- [ ] Add JSON-LD components
- [ ] Update metadata for all pages

### Phase 4: Image Optimization
- [ ] Update Hero with static import
- [ ] Add blur placeholders
- [ ] Configure image sizes

### Final Steps
- [ ] Run `yarn build` to verify
- [ ] Test all pages
- [ ] Check Core Web Vitals
- [ ] Deploy and verify

---

## Expected Results

### Before Migration
- Pages Router with Notion CMS
- External API calls for blog content
- No loading states
- Basic SEO

### After Migration
- App Router with local MDX files
- No external dependencies for content
- Built-in loading and error states
- Full SEO with sitemap, robots.txt, JSON-LD
- Optimized images with blur placeholders
- Better performance (no API calls)

### Performance Improvements
- **TTFB**: Faster (no Notion API calls)
- **LCP**: Improved with image optimization
- **FID**: Better with Server Components
- **CLS**: Reduced with proper image sizing
