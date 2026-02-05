# Performance & SEO Upgrade Plan

## Overview

This plan outlines the migration from Next.js Pages Router to App Router, along with performance optimizations and SEO improvements for the Alvaro Blog V2 project.

---

## Phase 1: App Router Migration

### 1.1 Create App Directory Structure

```
src/app/
├── layout.tsx              # Root layout (replaces _app.tsx + _document.tsx)
├── page.tsx                # Home page (replaces pages/index.tsx)
├── loading.tsx             # Global loading state
├── error.tsx               # Global error boundary
├── not-found.tsx           # 404 page
├── globals.css             # Global styles
├── about/
│   ├── page.tsx            # About page
│   └── loading.tsx         # About loading state
├── blog/
│   ├── page.tsx            # Blog listing
│   ├── loading.tsx         # Blog loading state
│   └── [slug]/
│       ├── page.tsx        # Individual blog post
│       └── loading.tsx     # Post loading state
├── projects/
│   └── page.tsx            # Projects page
├── services/
│   └── page.tsx            # Services page
└── api/
    └── hello/
        └── route.ts        # API route (replaces pages/api/hello.ts)
```

### 1.2 Root Layout Migration

**Before (Pages Router):**
- `_app.tsx` - App wrapper with providers
- `_document.tsx` - HTML document structure

**After (App Router):**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Alvaro Martin Caballero - Developer, Writer, Creator',
    template: '%s | Alvaro Blog'
  },
  description: 'Personal portfolio, blog, and digital products.',
  metadataBase: new URL('https://alvaro-blog.netlify.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Alvaro Blog',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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

### 1.3 Page Migration Examples

**Home Page:**

```tsx
// src/app/page.tsx
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/projects'
import Contact from '@/components/sections/contact'
import { ServicesSection } from '@/components/sections/services/services-section'
import { ServiceProducts } from '@/components/sections/services/service-products'
import { ProcessSection } from '@/components/sections/services/process-section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <ServicesSection />
      <ServiceProducts />
      <ProcessSection />
      <Contact />
    </>
  )
}
```

**Blog Page with Server Components:**

```tsx
// src/app/blog/page.tsx
import { Metadata } from 'next'
import { getPublishedBlogPosts } from '@/services/notion-services'
import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read my latest thoughts on development, technology, and more.',
}

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <BlogList posts={posts} />
    </div>
  )
}
```

**Dynamic Blog Post:**

```tsx
// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getSingleBlogPost, getPublishedBlogPosts } from '@/services/notion-services'
import BlogPost from '@/components/BlogPost'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getSingleBlogPost(slug)
  
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
      images: post.cover ? [post.cover] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getSingleBlogPost(slug)
  
  if (!post) {
    notFound()
  }
  
  return <BlogPost post={post} />
}
```

### 1.4 Loading States

```tsx
// src/app/blog/loading.tsx
import { Skeleton } from '@/components/ui/skeleton'

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-10 w-48 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
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

### 1.5 Error Boundaries

```tsx
// src/app/error.tsx
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

---

## Phase 2: Image Optimization

### 2.1 Static Image Imports with Blur Placeholders

```tsx
// src/components/sections/Hero.tsx
import Image from 'next/image'
import profileImage from '@/public/media/Photo01.jpg'

export default function Hero() {
  return (
    <Image
      src={profileImage}
      alt="Profile photo"
      width={300}
      height={300}
      placeholder="blur"
      className="rounded-full"
      priority // Load immediately for LCP
    />
  )
}
```

### 2.2 Remote Images with Generated Blur

For Notion images, we'll generate blur placeholders:

```tsx
// src/lib/image-utils.ts
import { getPlaiceholder } from 'plaiceholder'

export async function getBlurDataURL(imageUrl: string): Promise<string> {
  try {
    const res = await fetch(imageUrl)
    const buffer = Buffer.from(await res.arrayBuffer())
    const { base64 } = await getPlaiceholder(buffer)
    return base64
  } catch {
    // Return a simple gray placeholder on error
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  }
}
```

### 2.3 Optimized Blog Card

```tsx
// src/components/BlogCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { BlogPost } from '@/@types/schema'

interface BlogCardProps {
  post: BlogPost
  blurDataURL?: string
}

export default function BlogCard({ post, blurDataURL }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group overflow-hidden rounded-lg border">
        {post.cover && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform group-hover:scale-105"
              placeholder={blurDataURL ? 'blur' : 'empty'}
              blurDataURL={blurDataURL}
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-muted-foreground line-clamp-2">{post.description}</p>
        </div>
      </article>
    </Link>
  )
}
```

### 2.4 Image Configuration

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.notion.so',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

module.exports = nextConfig
```

---

## Phase 3: Caching Strategies

### 3.1 Data Caching with Revalidation

```tsx
// src/services/notion-services.ts
import { unstable_cache } from 'next/cache'

// Cache blog posts for 60 seconds
export const getPublishedBlogPosts = unstable_cache(
  async () => {
    // ... existing implementation
  },
  ['blog-posts'],
  { revalidate: 60, tags: ['blog'] }
)

// Cache individual posts for 60 seconds
export const getSingleBlogPost = unstable_cache(
  async (slug: string) => {
    // ... existing implementation
  },
  ['blog-post'],
  { revalidate: 60, tags: ['blog'] }
)
```

### 3.2 On-Demand Revalidation API

```tsx
// src/app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')
  
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }
  
  const { tag } = await request.json()
  
  if (tag) {
    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, tag })
  }
  
  return NextResponse.json({ error: 'Missing tag' }, { status: 400 })
}
```

### 3.3 Static Generation Configuration

```tsx
// For pages that rarely change
export const dynamic = 'force-static'

// For pages that need fresh data
export const dynamic = 'force-dynamic'

// For ISR with specific revalidation time
export const revalidate = 3600 // 1 hour
```

---

## Phase 4: SEO Improvements

### 4.1 Structured Data (JSON-LD)

```tsx
// src/components/JsonLd.tsx
interface PersonJsonLdProps {
  name: string
  jobTitle: string
  url: string
  image: string
  sameAs: string[]
}

export function PersonJsonLd({ name, jobTitle, url, image, sameAs }: PersonJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    url,
    image,
    sameAs,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface ArticleJsonLdProps {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author: string
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
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
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
```

### 4.2 Sitemap Generation

```tsx
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getPublishedBlogPosts } from '@/services/notion-services'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alvaro-blog.netlify.app'
  
  // Static pages
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
  
  // Dynamic blog posts
  const posts = await getPublishedBlogPosts()
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...blogPages]
}
```

### 4.3 Robots.txt

```tsx
// src/app/robots.ts
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

### 4.4 OpenGraph Images

```tsx
// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Alvaro Martin Caballero - Developer, Writer, Creator'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom right, #1a1a2e, #16213e)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 20 }}>
          Alvaro Martin Caballero
        </div>
        <div style={{ fontSize: 32, opacity: 0.8 }}>
          Developer, Writer, Creator
        </div>
      </div>
    ),
    { ...size }
  )
}
```

---

## Phase 5: Performance Monitoring

### 5.1 Web Vitals Tracking

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### 5.2 Custom Performance Metrics

```tsx
// src/lib/performance.ts
export function reportWebVitals(metric: {
  id: string
  name: string
  value: number
}) {
  // Send to analytics
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    window.gtag?.('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
}
```

---

## Migration Checklist

### Phase 1: App Router Migration
- [ ] Create `src/app` directory structure
- [ ] Create root `layout.tsx` with providers
- [ ] Migrate home page to `app/page.tsx`
- [ ] Migrate about page to `app/about/page.tsx`
- [ ] Migrate blog pages to `app/blog/`
- [ ] Migrate projects page to `app/projects/page.tsx`
- [ ] Migrate services page to `app/services/page.tsx`
- [ ] Migrate API routes to `app/api/`
- [ ] Add loading states for each route
- [ ] Add error boundaries
- [ ] Remove old `pages` directory
- [ ] Update imports to use `@/` alias

### Phase 2: Image Optimization
- [ ] Install `plaiceholder` for blur generation
- [ ] Update Hero component with static import
- [ ] Update BlogCard with optimized images
- [ ] Configure remote image patterns
- [ ] Add `priority` to above-fold images
- [ ] Add `sizes` attribute to responsive images

### Phase 3: Caching
- [ ] Implement `unstable_cache` for Notion data
- [ ] Add revalidation tags
- [ ] Create revalidation API endpoint
- [ ] Configure static/dynamic rendering per route

### Phase 4: SEO
- [ ] Add JSON-LD structured data
- [ ] Create dynamic sitemap
- [ ] Add robots.txt
- [ ] Create OpenGraph images
- [ ] Update metadata for all pages

### Phase 5: Monitoring
- [ ] Add Vercel Analytics
- [ ] Add Speed Insights
- [ ] Configure Web Vitals reporting

---

## Expected Results

### Performance Improvements
- **LCP (Largest Contentful Paint)**: < 2.5s (from ~3-4s)
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 200ms with caching

### SEO Improvements
- Rich snippets in search results
- Better social media previews
- Improved crawlability with sitemap
- Structured data for articles and person

### Developer Experience
- Simpler data fetching with Server Components
- Better code organization with App Router
- Automatic loading and error states
- Type-safe metadata

---

## Risk Mitigation

1. **Create a new branch** for the migration
2. **Keep Pages Router working** during migration (Next.js supports both)
3. **Test each page** after migration
4. **Monitor Core Web Vitals** before and after
5. **Gradual rollout** - migrate one page at a time
