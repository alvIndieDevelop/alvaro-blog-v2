# Technical Guidelines — Alvaro Indie Hub

## Overview

This document provides technical guidelines for development on the Alvaro Indie Hub project. It establishes conventions, best practices, and workflows to ensure consistent and high-quality code contributions.

> **Note:** This document covers the _how_. For project vision, decision rules, and strategic direction, see [`agent.md`](agent.md).

---

## Project Context

### Current Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5.9
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Content:** MDX files in `content/` directory
- **Animations:** Framer Motion 12
- **Deployment:** Netlify

### Directory Structure

```
src/
├── app/                    # App Router pages and layouts
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── loading.tsx         # Global loading
│   ├── error.tsx           # Global error
│   ├── not-found.tsx       # 404 page
│   ├── globals.css         # Global styles
│   ├── about/
│   ├── blog/
│   │   ├── page.tsx        # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx    # Individual post
│   ├── projects/
│   ├── services/
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots.txt
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── layouts/            # Layout components
│   ├── sections/           # Page sections
│   └── alvaroUI/           # Custom UI components
├── lib/                    # Utilities
│   ├── utils.ts
│   └── blog.ts             # Blog utilities
├── hooks/                  # Custom hooks
├── utils/                  # Helper functions
└── mdx-components.tsx      # MDX component overrides

content/
└── blog/                   # MDX blog posts
    ├── hello-world.mdx
    └── getting-started-with-nextjs.mdx
```

---

## Code Conventions

### TypeScript

```typescript
// ✅ DO: Use explicit types
interface BlogPost {
  id: string;
  title: string;
  slug: string;
}

// ❌ DON'T: Use any type
const data: any = fetchData();

// ✅ DO: Use proper error handling
try {
  const posts = await getAllPosts();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

### React Components

```typescript
// ✅ DO: Use functional components with TypeScript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={cn(baseStyles, variants[variant])}>
      {children}
    </button>
  );
}

// ✅ DO: Use named exports for components
export function MyComponent() { ... }

// ❌ DON'T: Mix default and named exports inconsistently
```

### File Naming

```
components/
├── MyComponent.tsx      # PascalCase for components
├── my-component/        # kebab-case for directories
│   ├── index.tsx        # Entry point
│   └── types.ts         # Types file
utils/
├── formatDate.ts        # camelCase for utilities
hooks/
├── use-toast.ts         # kebab-case with use- prefix for hooks
```

### Imports Order

```typescript
// 1. React and Next.js
import React from "react";
import { Metadata } from "next";
import Image from "next/image";

// 2. External libraries
import { motion } from "framer-motion";
import { format } from "date-fns";

// 3. Internal components
import { Button } from "@/components/ui/button";
import Header from "@/components/layouts/Header";

// 4. Types
import type { BlogPost } from "@/@types/schema";

// 5. Utilities and constants
import { cn } from "@/lib/utils";
import config from "@/utils/config";

// 6. Styles (if any)
import styles from "./Component.module.css";
```

---

## Component Guidelines

### shadcn/ui Components

The project uses shadcn/ui components located in [`src/components/ui/`](../src/components/ui/). These are:

- Pre-built, accessible components based on Radix UI
- Styled with Tailwind CSS
- Customizable via CSS variables

**When adding new UI elements:**

1. Check if a shadcn/ui component exists first
2. Use the existing component with custom styling
3. Only create custom components when necessary

### Layout Components

```typescript
// App Router uses layout.tsx for shared layouts
// Individual pages just need their content

export default function MyPage() {
  return (
    <main className="flex-1">
      {/* Page content */}
    </main>
  );
}
```

### Section Components

Section components follow this pattern:

```typescript
// src/components/sections/my-section/index.tsx
'use client'; // Only if using client-side features

import { motion } from 'framer-motion';

export default function MySection() {
  return (
    <section id="my-section" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section content */}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Styling Guidelines

### Tailwind CSS

```typescript
// ✅ DO: Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-background">

// ✅ DO: Use the cn() utility for conditional classes
import { cn } from '@/lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  variant === 'primary' && 'primary-classes'
)}>

// ✅ DO: Use CSS variables for theming
<div className="bg-background text-foreground">

// ❌ DON'T: Use inline styles
<div style={{ backgroundColor: 'red' }}>
```

### Theme Colors

The project uses CSS variables for theming. Available colors:

- `background` / `foreground`
- `card` / `card-foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border`, `input`, `ring`

---

## Data Fetching (App Router)

### Server Components (Default)

```typescript
// Server components can fetch data directly
// src/app/blog/page.tsx

import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts(); // Runs on server

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      {/* Render posts */}
    </div>
  );
}
```

### Static Generation

```typescript
// Generate static params for dynamic routes
// src/app/blog/[slug]/page.tsx

import { getAllPosts, getPostBySlug } from '@/lib/blog';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      {/* Post content */}
    </article>
  );
}
```

### Client Components

```typescript
// Only use 'use client' when necessary
'use client';

import { useState } from 'react';

export function InteractiveComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}
```

---

## SEO Guidelines (App Router)

### Metadata API

```typescript
// Static metadata
// src/app/about/page.tsx

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Alvaro Martin Caballero',
};

export default function AboutPage() {
  return <main>{/* Content */}</main>;
}
```

### Dynamic Metadata

```typescript
// Dynamic metadata for blog posts
// src/app/blog/[slug]/page.tsx

import { Metadata } from "next";
import { getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}
```

### Root Layout Metadata

```typescript
// src/app/layout.tsx

export const metadata: Metadata = {
  metadataBase: new URL("https://alvaro-blog.netlify.app"),
  title: {
    default: "Alvaro Martin Caballero - Developer, Writer, Creator",
    template: "%s | Alvaro Blog",
  },
  description: "Personal portfolio, blog, and digital products.",
  // ... other metadata
};
```

---

## Error Handling

### API Calls

```typescript
// ✅ DO: Proper error handling with types
async function fetchData(): Promise<Data | null> {
  try {
    const response = await api.getData();
    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to fetch data:", error.message);
    }
    return null;
  }
}

// ✅ DO: Handle loading and error states in components
function DataComponent() {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ... fetch logic with proper state updates
}
```

### Error Boundaries (App Router)

```typescript
// src/app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

## Testing Guidelines

_(Testing infrastructure to be added)_

When testing is implemented:

- Unit tests for utility functions
- Component tests for UI components
- Integration tests for pages
- E2E tests for critical user flows

---

## Git Workflow

### Commit Messages

```
feat: add new blog filtering feature
fix: resolve pagination bug on mobile
refactor: simplify blog utilities
docs: update architecture documentation
style: format code with prettier
chore: update dependencies
```

### Branch Naming

```
feature/add-newsletter-signup
fix/blog-pagination-mobile
refactor/blog-utilities
docs/update-readme
```

---

## Common Tasks

### Adding a New Page

1. Create directory in `src/app/` (e.g., `src/app/new-page/`)
2. Create `page.tsx` with metadata export
3. Add navigation link in Header and Footer if needed

### Adding a New Component

1. Create in appropriate directory under `src/components/`
2. Use TypeScript interfaces for props
3. Follow existing naming conventions
4. Export from index file if in a directory

### Adding a New Section

1. Create directory in `src/components/sections/`
2. Create `index.tsx` as entry point
3. Add any sub-components in same directory
4. Import and use in relevant page

### Adding a New Blog Post

1. Create MDX file in `content/blog/`
2. Add frontmatter with required fields:

```mdx
---
title: Post Title
description: Brief description
date: 2024-01-15
tags: [tag1, tag2]
cover: /images/blog/cover.jpg
author: Alvaro Martin Caballero
---

# Post Title

Content goes here...
```

---

## Environment Setup

### Required Environment Variables

```env
# Analytics (optional)
GOOGLE_ANALYTICS_TRACKING_ID=G-xxx
```

### Development Commands

```bash
# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Run linting
yarn lint
```

---

## Performance Considerations

### Images

- Use Next.js `Image` component for optimization
- Provide width and height to prevent layout shift
- Use appropriate image formats (WebP when possible)
- Configure remote patterns in [`next.config.mjs`](../next.config.mjs)

### Code Splitting

- Pages are automatically code-split
- Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

### Static Generation

- Blog posts are statically generated at build time
- Use `generateStaticParams` for dynamic routes
- Content changes require rebuild (or use ISR if needed)

---

## Accessibility

- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation works
- Use ARIA attributes when necessary
- Test with screen readers
- Maintain color contrast ratios

---

## Security

- Never commit environment variables
- Sanitize user input
- Use HTTPS for all external requests
- Keep dependencies updated

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [MDX Documentation](https://mdxjs.com)
- [Framer Motion Documentation](https://www.framer.com/motion)

---

## Related Documents

- [`PLAN.md`](PLAN.md) — Development plan and task checklist
- [`agent.md`](agent.md) — Project vision, decision rules, and strategic direction
- [`architecture.md`](architecture.md) — System architecture overview
- [`plans/visual-upgrade-dark-fantasy.md`](plans/visual-upgrade-dark-fantasy.md) — Visual design specifications
- [`plans/realm-layers-architecture.md`](plans/realm-layers-architecture.md) — Realm system details
