# i18n Spanish Translation Implementation Plan

## Overview

This plan outlines the implementation of internationalization (i18n) for the Alvaro Indie Hub project, adding Spanish language support alongside the existing English content using `next-intl`.

## Decisions Made ✅

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **i18n Library** | `next-intl` | Best App Router support, type-safe, high benchmark score |
| **URL Strategy** | Default without prefix | `/about` (EN), `/es/about` (ES) - preserves existing SEO |
| **Content Strategy** | Separate files per language | Most flexible, clear organization |
| **Fallback Behavior** | Show English with banner | Better UX than 404 for untranslated content |

---

## Current State Analysis

### Project Structure
- **Framework**: Next.js 16.1.6 with App Router
- **Current Language**: English only (`lang="en"` in layout)
- **Content System**: MDX files in `content/` directory
- **UI Components**: Mix of Server and Client Components
- **No i18n library** currently installed

### Files Requiring Translation

| Category | Files | Translation Approach |
|----------|-------|---------------------|
| Layout | `src/app/layout.tsx` | Metadata, HTML lang |
| Navigation | `src/components/layouts/Header.tsx` | Menu items, labels |
| Footer | `src/components/layouts/Footer.tsx` | Copyright, tagline |
| Hero | `src/components/sections/Hero.tsx` | All text content |
| Realms | `src/lib/realms.ts` | Names, descriptions |
| Pages | All `page.tsx` files | Page content |
| MDX Content | `content/**/*.mdx` | Separate files per locale |

---

## Architecture Design

### URL Structure (Default Locale Without Prefix)

```
Current:  /about, /forge, /blog/hello-world

After:
  English (default): /about, /forge, /blog/hello-world
  Spanish:           /es/about, /es/forge, /es/blog/hola-mundo
```

This preserves existing URLs for SEO while adding Spanish support.

### Directory Structure After Implementation

```
alvaro-blog-v2/
├── src/
│   ├── i18n/
│   │   ├── routing.ts          # Locale routing config
│   │   ├── request.ts          # Request config for server
│   │   └── navigation.ts       # Localized navigation helpers
│   ├── messages/
│   │   ├── en.json             # English translations
│   │   └── es.json             # Spanish translations
│   ├── app/
│   │   └── [locale]/           # Dynamic locale segment
│   │       ├── layout.tsx      # Locale-aware layout
│   │       ├── page.tsx        # Home page
│   │       ├── about/
│   │       ├── forge/
│   │       ├── workshop/
│   │       ├── tavern/
│   │       ├── library/
│   │       ├── blog/
│   │       ├── projects/
│   │       ├── services/
│   │       └── map/
│   └── middleware.ts           # Locale detection & routing
├── content/
│   ├── blog/
│   │   ├── en/                 # English blog posts
│   │   └── es/                 # Spanish blog posts
│   ├── projects/
│   │   ├── en/
│   │   └── es/
│   └── tavern/
│       ├── en/
│       └── es/
```

---

## Implementation Phases

### Phase 1: Core i18n Setup

#### 1.1 Install Dependencies
```bash
yarn add next-intl
```

#### 1.2 Create Routing Configuration
Create `src/i18n/routing.ts`:
```typescript
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed' // Only prefix non-default locales (/es/*)
});

export type Locale = (typeof routing.locales)[number];
```

#### 1.3 Create Request Configuration
Create `src/i18n/request.ts`:
```typescript
import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

#### 1.4 Create Middleware
Create `src/middleware.ts`:
```typescript
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};
```

#### 1.5 Update Next.js Config
Update `next.config.mjs`:
```javascript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// ... existing config
export default withNextIntl(withMDX(nextConfig));
```

---

### Phase 2: Translation Files

#### 2.1 English Messages (`src/messages/en.json`)
```json
{
  "common": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "blog": "Blog",
    "services": "Services",
    "contact": "Contact",
    "toggleTheme": "Toggle theme",
    "scrollDown": "Scroll"
  },
  "navigation": {
    "forge": "Forge",
    "workshop": "Workshop",
    "tavern": "Tavern",
    "library": "Library",
    "map": "Realm Map"
  },
  "hero": {
    "welcome": "Welcome, Traveler",
    "title": "Alvaro Martin",
    "subtitle": "Indie Developer",
    "role1": "Full-Stack Mage",
    "role2": "Game Crafter",
    "role3": "Knowledge Scribe",
    "description": "Crafting digital experiences at the intersection of {web}, {games}, and {tech}. Currently on a quest to build tools that empower fellow developers.",
    "webDev": "web development",
    "indieGames": "indie games",
    "creativeTech": "creative technology",
    "viewQuests": "View Quests",
    "characterInfo": "Character Info",
    "readScrolls": "Read Scrolls"
  },
  "realms": {
    "sanctum": {
      "name": "The Sanctum",
      "title": "Home",
      "description": "The central hub - your personal castle and headquarters"
    },
    "forge": {
      "name": "The Forge",
      "title": "Professional",
      "description": "Professional work, career, and services"
    },
    "workshop": {
      "name": "The Workshop",
      "title": "Creative",
      "description": "Game development, creative projects, and experiments"
    },
    "tavern": {
      "name": "The Tavern",
      "title": "Personal",
      "description": "Personal life, hobbies, and community"
    },
    "library": {
      "name": "The Library",
      "title": "Knowledge",
      "description": "Technical blog, tutorials, and ideas"
    },
    "map": {
      "name": "The Map",
      "title": "Explore",
      "description": "Visual overview of all realms"
    }
  },
  "footer": {
    "copyright": "© {year} Alvaro Martin Caballero",
    "tagline": "Code is my craft, games are my passion"
  },
  "metadata": {
    "title": "Alvaro Martin Caballero - Indie Developer",
    "description": "Welcome to the Sanctum. Explore my quests, read ancient scrolls, and discover the artifacts I've crafted on my journey as an indie developer."
  }
}
```

#### 2.2 Spanish Messages (`src/messages/es.json`)
```json
{
  "common": {
    "home": "Inicio",
    "about": "Sobre Mí",
    "projects": "Proyectos",
    "blog": "Blog",
    "services": "Servicios",
    "contact": "Contacto",
    "toggleTheme": "Cambiar tema",
    "scrollDown": "Desplazar"
  },
  "navigation": {
    "forge": "La Forja",
    "workshop": "El Taller",
    "tavern": "La Taberna",
    "library": "La Biblioteca",
    "map": "Mapa del Reino"
  },
  "hero": {
    "welcome": "Bienvenido, Viajero",
    "title": "Alvaro Martin",
    "subtitle": "Desarrollador Indie",
    "role1": "Mago Full-Stack",
    "role2": "Artesano de Juegos",
    "role3": "Escriba del Conocimiento",
    "description": "Creando experiencias digitales en la intersección de {web}, {games} y {tech}. Actualmente en una misión para construir herramientas que empoderen a otros desarrolladores.",
    "webDev": "desarrollo web",
    "indieGames": "juegos indie",
    "creativeTech": "tecnología creativa",
    "viewQuests": "Ver Misiones",
    "characterInfo": "Info del Personaje",
    "readScrolls": "Leer Pergaminos"
  },
  "realms": {
    "sanctum": {
      "name": "El Santuario",
      "title": "Inicio",
      "description": "El centro principal - tu castillo personal y cuartel general"
    },
    "forge": {
      "name": "La Forja",
      "title": "Profesional",
      "description": "Trabajo profesional, carrera y servicios"
    },
    "workshop": {
      "name": "El Taller",
      "title": "Creativo",
      "description": "Desarrollo de juegos, proyectos creativos y experimentos"
    },
    "tavern": {
      "name": "La Taberna",
      "title": "Personal",
      "description": "Vida personal, hobbies y comunidad"
    },
    "library": {
      "name": "La Biblioteca",
      "title": "Conocimiento",
      "description": "Blog técnico, tutoriales e ideas"
    },
    "map": {
      "name": "El Mapa",
      "title": "Explorar",
      "description": "Vista general de todos los reinos"
    }
  },
  "footer": {
    "copyright": "© {year} Alvaro Martin Caballero",
    "tagline": "El código es mi oficio, los juegos mi pasión"
  },
  "metadata": {
    "title": "Alvaro Martin Caballero - Desarrollador Indie",
    "description": "Bienvenido al Santuario. Explora mis misiones, lee pergaminos antiguos y descubre los artefactos que he creado en mi viaje como desarrollador indie."
  }
}
```

---

### Phase 3: App Router Migration

#### 3.1 Move Pages to `[locale]` Directory

Current structure:
```
src/app/
├── page.tsx
├── about/page.tsx
├── forge/page.tsx
...
```

New structure:
```
src/app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── forge/page.tsx
│   ...
```

#### 3.2 Update Root Layout
The root `layout.tsx` becomes minimal, with locale-specific layout in `[locale]/layout.tsx`.

#### 3.3 Create Locale Layout
`src/app/[locale]/layout.tsx`:
```typescript
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params: {locale}}) {
  const t = await getTranslations({locale, namespace: 'metadata'});
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function LocaleLayout({children, params: {locale}}) {
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

---

### Phase 4: Component Updates

#### 4.1 Header Component
Convert to use translations:
```typescript
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function Header() {
  const t = useTranslations('navigation');
  
  const navigation = [
    { name: t('forge'), href: '/forge', ... },
    { name: t('workshop'), href: '/workshop', ... },
    ...
  ];
  
  // ... rest of component
}
```

#### 4.2 Hero Component
```typescript
import {useTranslations} from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  
  return (
    <section>
      <p>{t('welcome')}</p>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
      {/* ... */}
    </section>
  );
}
```

#### 4.3 Language Switcher Component
Create `src/components/ui/language-switcher.tsx`:
```typescript
'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, {locale: newLocale});
  };

  return (
    <div className="flex items-center gap-1">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={locale === loc ? 'text-gold' : 'text-muted-foreground'}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

---

### Phase 5: MDX Content Localization

#### 5.1 Restructure Content Directory
```
content/
├── blog/
│   ├── en/
│   │   ├── getting-started-with-nextjs.mdx
│   │   └── hello-world.mdx
│   └── es/
│       ├── empezando-con-nextjs.mdx
│       └── hola-mundo.mdx
├── projects/
│   ├── en/
│   └── es/
└── tavern/
    ├── en/
    └── es/
```

#### 5.2 Update Blog Utilities
Update `src/lib/blog.ts` to accept locale parameter:
```typescript
export async function getAllPosts(locale: string = 'en') {
  const postsDirectory = path.join(process.cwd(), `content/blog/${locale}`);
  // ... rest of implementation
}

export async function getPostBySlug(slug: string, locale: string = 'en') {
  const fullPath = path.join(process.cwd(), `content/blog/${locale}`, `${slug}.mdx`);
  // ... rest of implementation
}
```

---

### Phase 6: SEO & Metadata

#### 6.1 Update Sitemap
`src/app/sitemap.ts`:
```typescript
import {routing} from '@/i18n/routing';

export default async function sitemap() {
  const baseUrl = 'https://alvaro-blog.netlify.app';
  
  const routes = ['', '/about', '/forge', '/workshop', '/tavern', '/library', '/map'];
  
  const entries = routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${baseUrl}/${l}${route}`])
        ),
      },
    }))
  );
  
  return entries;
}
```

#### 6.2 Add Alternate Language Links
In layout metadata:
```typescript
export async function generateMetadata({params: {locale}}) {
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'es': '/es',
      },
    },
  };
}
```

---

## Implementation Checklist

### Phase 1: Core Setup
- [ ] Install `next-intl` package
- [ ] Create `src/i18n/routing.ts`
- [ ] Create `src/i18n/request.ts`
- [ ] Create `src/middleware.ts`
- [ ] Update `next.config.mjs`

### Phase 2: Translation Files
- [ ] Create `src/messages/en.json` with all UI strings
- [ ] Create `src/messages/es.json` with Spanish translations
- [ ] Add TypeScript types for messages (optional but recommended)

### Phase 3: App Router Migration
- [ ] Create `src/app/[locale]/` directory
- [ ] Move all pages into `[locale]` directory
- [ ] Create locale-aware layout
- [ ] Update root layout to be minimal
- [ ] Test routing works for both locales

### Phase 4: Component Updates
- [ ] Update Header with translations
- [ ] Update Footer with translations
- [ ] Update Hero section with translations
- [ ] Update all page components
- [ ] Create LanguageSwitcher component
- [ ] Add LanguageSwitcher to Header
- [ ] Update realms.ts to use translations

### Phase 5: MDX Content
- [ ] Restructure content directory by locale
- [ ] Update blog utilities for locale support
- [ ] Update library utilities for locale support
- [ ] Update tavern utilities for locale support
- [ ] Create Spanish versions of existing content (or placeholders)

### Phase 6: SEO & Polish
- [ ] Update sitemap for multiple locales
- [ ] Add alternate language meta tags
- [ ] Update robots.txt if needed
- [ ] Test all routes in both languages
- [ ] Verify SEO metadata in both languages

---

## Migration Strategy

### Recommended Approach: Incremental Migration

1. **Week 1**: Core setup (Phases 1-2)
   - Install and configure next-intl
   - Create translation files with all strings
   - Set up middleware and routing

2. **Week 2**: App structure migration (Phase 3)
   - Move pages to `[locale]` directory
   - Update layouts
   - Ensure routing works

3. **Week 3**: Component updates (Phase 4)
   - Update all components to use translations
   - Add language switcher
   - Test thoroughly

4. **Week 4**: Content & SEO (Phases 5-6)
   - Restructure MDX content
   - Create Spanish content (or mark as TODO)
   - Update SEO configuration

---

## Considerations

### Pros of This Approach
- **Type-safe**: next-intl provides excellent TypeScript support
- **Server Components**: Works seamlessly with React Server Components
- **SEO-friendly**: Proper URL structure with locale prefixes
- **Scalable**: Easy to add more languages later

### Potential Challenges
- **Content duplication**: MDX files need Spanish versions
- **Maintenance**: Two sets of content to maintain
- **Initial effort**: Significant refactoring required

### Alternatives Considered
- **next-translate**: Less active, fewer features
- **react-i18next**: More complex setup for App Router
- **Manual approach**: Not recommended for this scale

---

## Final Implementation Todo List

### Phase 1: Core i18n Setup
- [ ] Install `next-intl` package
- [ ] Create `src/i18n/routing.ts` with `localePrefix: 'as-needed'`
- [ ] Create `src/i18n/request.ts` for server-side config
- [ ] Create `src/i18n/navigation.ts` for localized Link/useRouter
- [ ] Create `src/middleware.ts` for locale detection
- [ ] Update `next.config.mjs` with next-intl plugin

### Phase 2: Translation Files
- [ ] Create `src/messages/en.json` with all UI strings
- [ ] Create `src/messages/es.json` with Spanish translations
- [ ] Create TypeScript types for type-safe translations

### Phase 3: App Router Migration
- [ ] Create `src/app/[locale]/` directory structure
- [ ] Move `layout.tsx` to `[locale]/layout.tsx`
- [ ] Move `page.tsx` to `[locale]/page.tsx`
- [ ] Move `about/` to `[locale]/about/`
- [ ] Move `forge/` to `[locale]/forge/`
- [ ] Move `workshop/` to `[locale]/workshop/`
- [ ] Move `tavern/` to `[locale]/tavern/`
- [ ] Move `library/` to `[locale]/library/`
- [ ] Move `blog/` to `[locale]/blog/`
- [ ] Move `projects/` to `[locale]/projects/`
- [ ] Move `services/` to `[locale]/services/`
- [ ] Move `map/` to `[locale]/map/`
- [ ] Update root layout to be minimal wrapper
- [ ] Keep `api/`, `robots.ts`, `sitemap.ts` at root level

### Phase 4: Component Updates
- [ ] Update `Header.tsx` to use `useTranslations`
- [ ] Update `Footer.tsx` to use `useTranslations`
- [ ] Update `Hero.tsx` to use `useTranslations`
- [ ] Create `LanguageSwitcher.tsx` component
- [ ] Add LanguageSwitcher to Header
- [ ] Update all navigation Links to use `@/i18n/navigation`
- [ ] Update realm names/descriptions to use translations
- [ ] Update all page components with translations

### Phase 5: MDX Content Restructure
- [ ] Create `content/blog/en/` directory
- [ ] Create `content/blog/es/` directory
- [ ] Move existing blog posts to `en/` subdirectory
- [ ] Create `content/tavern/en/` and `content/tavern/es/`
- [ ] Move existing tavern content to `en/` subdirectory
- [ ] Update `src/lib/blog.ts` for locale-aware loading
- [ ] Update `src/lib/tavern.ts` for locale-aware loading
- [ ] Implement fallback logic with "not translated" banner
- [ ] Create `NotTranslatedBanner.tsx` component

### Phase 6: SEO & Polish
- [ ] Update `sitemap.ts` for multi-locale URLs
- [ ] Add `alternates` metadata for language versions
- [ ] Update OpenGraph metadata per locale
- [ ] Test all routes in both languages
- [ ] Verify language switcher works correctly
- [ ] Test fallback behavior for untranslated content

---

*Created: February 10, 2026*
*Status: Ready for Implementation*
*Decisions: URL prefix as-needed, separate MDX files, English fallback with banner*
