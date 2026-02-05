# Agent Guidelines for Alvaro Blog V2

## Overview

This document provides guidelines for AI-assisted development on the Alvaro Blog V2 project. It establishes conventions, best practices, and workflows to ensure consistent and high-quality code contributions.

---

## Project Context

### What This Project Is
- A personal portfolio and blog website
- Built with Next.js 15 using Pages Router
- Uses Notion as a headless CMS for blog content
- Styled with Tailwind CSS and shadcn/ui components
- Deployed on Netlify

### Primary Goals
1. Showcase professional work and skills
2. Share blog content written in Notion
3. Display services and products offered
4. Provide contact information

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
  const posts = await notionService.getPublishedBlogPosts();
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
import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

// 2. External libraries
import { motion } from 'framer-motion';
import { format } from 'date-fns';

// 3. Internal components
import { Button } from '@/components/ui/button';
import Layout from '@/components/layouts/Layout';

// 4. Types
import type { BlogPost } from '@/@types/schema';

// 5. Utilities and constants
import { cn } from '@/lib/utils';
import config from '@/utils/config';

// 6. Styles (if any)
import styles from './Component.module.css';
```

---

## Component Guidelines

### shadcn/ui Components

The project uses shadcn/ui components located in [`src/components/ui/`](src/components/ui/). These are:
- Pre-built, accessible components based on Radix UI
- Styled with Tailwind CSS
- Customizable via CSS variables

**When adding new UI elements:**
1. Check if a shadcn/ui component exists first
2. Use the existing component with custom styling
3. Only create custom components when necessary

### Layout Components

```typescript
// All pages should use the Layout component
// Layout is already applied in _app.tsx, so pages just need content

export default function MyPage() {
  return (
    <>
      <NextSeo title="Page Title" description="Page description" />
      <main className="flex-1">
        {/* Page content */}
      </main>
    </>
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

## Data Fetching

### Static Generation with ISR

```typescript
// For pages that fetch from Notion
export const getStaticProps: GetStaticProps = async () => {
  const notionService = new NotionService();
  
  try {
    const posts = await notionService.getPublishedBlogPosts();
    return {
      props: { posts },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    return {
      props: { posts: [] },
      revalidate: 60,
    };
  }
};
```

### Dynamic Routes

```typescript
export async function getStaticPaths() {
  const notionService = new NotionService();
  const posts = await notionService.getPublishedBlogPosts();
  
  return {
    paths: posts.map(post => `/blog/${post.slug}`),
    fallback: 'blocking', // Generate new pages on-demand
  };
}
```

---

## SEO Guidelines

### Using next-seo

```typescript
import { NextSeo } from 'next-seo';

export default function MyPage() {
  return (
    <>
      <NextSeo
        title="Page Title | Alvaro Martin Caballero"
        description="Page description for search engines"
        openGraph={{
          title: 'Page Title',
          description: 'Description for social sharing',
          url: 'https://alvaro-blog.netlify.app/page-url',
        }}
      />
      {/* Page content */}
    </>
  );
}
```

**Note:** Avoid using both `NextSeo` and manual `<Head>` tags for the same metadata.

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
      console.error('Failed to fetch data:', error.message);
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

---

## Testing Guidelines

*(Testing infrastructure to be added)*

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
refactor: simplify notion service methods
docs: update architecture documentation
style: format code with prettier
chore: update dependencies
```

### Branch Naming

```
feature/add-newsletter-signup
fix/blog-pagination-mobile
refactor/notion-service
docs/update-readme
```

---

## Common Tasks

### Adding a New Page

1. Create file in `src/pages/` directory
2. Add SEO with `NextSeo`
3. Use existing layout structure
4. Add navigation link in Header and Footer if needed

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

### Modifying Notion Integration

1. Update types in [`src/@types/schema.d.ts`](src/@types/schema.d.ts)
2. Modify `NotionService` in [`src/services/notion-services.ts`](src/services/notion-services.ts)
3. Update transformer method if data structure changes

---

## Environment Setup

### Required Environment Variables

```env
# Notion Integration
NOTION_ACCESS_TOKEN=secret_xxx
NOTION_BLOG_DATABASE_ID=xxx

# Analytics
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
- Configure remote patterns in [`next.config.js`](next.config.js)

### Code Splitting

- Pages are automatically code-split
- Use dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
});
```

### Caching

- ISR is configured with 60-second revalidation
- Consider longer revalidation for stable content
- Use SWR or React Query for client-side caching if needed

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
- Review Notion API permissions

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Notion API Documentation](https://developers.notion.com)
- [Framer Motion Documentation](https://www.framer.com/motion)
