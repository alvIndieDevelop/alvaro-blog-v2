# Tailwind CSS v4 + DaisyUI v5 Migration Plan

## Overview

This plan outlines the migration from Tailwind CSS v3.4.17 to v4.x and DaisyUI v4.12.10 to v5.x. This is a **high-impact upgrade** that modernizes the styling infrastructure with zero-runtime CSS generation and improved performance.

---

## Executive Summary

### Why Upgrade?

**Tailwind CSS v4 Benefits:**
- Zero-runtime CSS generation (faster builds)
- CSS-first configuration (no more `tailwind.config.js`)
- Modern CSS features (container queries, `@property`, `color-mix()`)
- Smaller CSS output
- Better developer experience

**DaisyUI v5 Benefits:**
- Full Tailwind CSS v4 compatibility
- Simplified setup with `@plugin` directive
- Improved component styling
- Better theme customization

### Risk Assessment

| Aspect | Risk Level | Notes |
|--------|------------|-------|
| Breaking Changes | 🔴 High | Utility renames, config migration |
| Visual Regression | 🟡 Medium | Requires full visual review |
| Rollback Difficulty | 🟡 Medium | Keep v3 branch as backup |
| Browser Support | 🟢 Low | Modern browsers only (Safari 16.4+, Chrome 111+, Firefox 128+) |

---

## Prerequisites

### System Requirements
- **Node.js 20+** (required for upgrade tool)
- **Modern browsers** (Safari 16.4+, Chrome 111+, Firefox 128+)

### Pre-Migration Checklist
- [ ] Create a new git branch: `git checkout -b feature/tailwind-v4-migration`
- [ ] Ensure clean build: `yarn build`
- [ ] Take screenshots of all pages for visual comparison
- [ ] Backup current configuration files

---

## Phase 1: Run Automated Upgrade Tool

### 1.1 Execute Upgrade Command

The Tailwind CSS team provides an automated upgrade tool that handles most of the migration:

```bash
npx @tailwindcss/upgrade
```

This tool will:
- Update dependencies in `package.json`
- Migrate `tailwind.config.js` to CSS-based configuration
- Update utility class names in templates
- Convert `@tailwind` directives to `@import`

### 1.2 Expected Dependency Changes

**Before:**
```json
{
  "dependencies": {
    "daisyui": "^4.12.10"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.19",
    "autoprefixer": "^10.4.24",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17"
  }
}
```

**After:**
```json
{
  "dependencies": {
    "daisyui": "^5.5.17"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.x",
    "@tailwindcss/typography": "^0.5.19",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.x"
  }
}
```

**Note:** `autoprefixer` can be removed as Tailwind v4 handles vendor prefixing automatically.

---

## Phase 2: Configuration Migration

### 2.1 PostCSS Configuration

**Current [`postcss.config.js`](../postcss.config.js):**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**New `postcss.config.mjs`:**
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

### 2.2 CSS Configuration Migration

The `tailwind.config.js` file is deprecated in v4. Configuration moves to CSS using `@theme` directive.

**Current [`tailwind.config.js`](../tailwind.config.js) (94 lines) → Delete after migration**

**New [`src/app/globals.css`](../src/app/globals.css):**

```css
@import "tailwindcss";
@plugin "daisyui";

/* Theme configuration (migrated from tailwind.config.js) */
@theme {
  /* Border radius */
  --radius-lg: 0.5rem;
  --radius-md: calc(0.5rem - 2px);
  --radius-sm: calc(0.5rem - 4px);
  
  /* Custom gradients */
  --background-image-gradient-radial: radial-gradient(var(--tw-gradient-stops));
  --background-image-gradient-conic: conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops));
}

/* Light mode colors */
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 0 0% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 3.9%;
  --primary: 0 0% 9%;
  --primary-rgb: 23, 23, 23;
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 0 0% 3.9%;
  --radius: 0.5rem;
}

/* Dark mode colors */
.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 0 0% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-rgb: 250, 250, 250;
  --primary-foreground: 0 0% 9%;
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 0 0% 83.1%;
}

/* Base styles */
* {
  @apply border-border;
}

body {
  @apply bg-background text-foreground;
}

/* Prose styling for blog content */
.prose {
  @apply text-foreground;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
  @apply text-foreground font-bold;
}

.prose a {
  @apply text-primary hover:underline;
}

.prose code {
  @apply bg-muted px-1.5 py-0.5 rounded-xs text-sm font-mono;
}

.prose pre {
  @apply bg-muted p-4 rounded-lg overflow-x-auto;
}

.prose blockquote {
  @apply border-l-4 border-primary pl-4 italic text-muted-foreground;
}
```

### 2.3 DaisyUI Configuration

DaisyUI v5 configuration moves from `tailwind.config.js` to CSS:

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: dark;
}
```

Or configure via CSS variables for more control.

---

## Phase 3: Utility Class Renames

### 3.1 Renamed Utilities Reference

| v3 Utility | v4 Utility | Affected Files |
|------------|------------|----------------|
| `shadow-sm` | `shadow-xs` | [`card.tsx`](../src/components/ui/card.tsx), [`character-stats.tsx`](../src/components/sections/about/character-stats.tsx) |
| `shadow` | `shadow-sm` | - |
| `shadow-md` | `shadow` | [`SkillsView.tsx`](../src/components/SkillsView.tsx), [`ToolsView.tsx`](../src/components/ToolsView.tsx), [`tooltip.tsx`](../src/components/ui/tooltip.tsx) |
| `shadow-lg` | `shadow-md` | [`BlogCard.tsx`](../src/components/BlogCard.tsx), [`Profile.tsx`](../src/components/Profile.tsx), [`skill-card.tsx`](../src/components/sections/about/skill-tree/skill-card.tsx), [`dialog.tsx`](../src/components/ui/dialog.tsx), [`toast.tsx`](../src/components/ui/toast.tsx) |
| `rounded-sm` | `rounded-xs` | [`dialog.tsx`](../src/components/ui/dialog.tsx) |
| `rounded` | `rounded-sm` | - |
| `rounded-md` | `rounded` | Multiple files (buttons, inputs, etc.) |
| `rounded-lg` | `rounded-md` | Multiple files |
| `ring` (3px) | `ring-3` | - |
| `ring-2` | `ring-2` | No change |
| `outline-none` | `outline-hidden` | Multiple UI components |
| `blur-sm` | `blur-xs` | - |
| `blur` | `blur-sm` | - |

### 3.2 Files Requiring Manual Review

Based on the codebase audit, these files contain utilities that may need updating:

**UI Components (High Priority):**
- [`src/components/ui/button.tsx`](../src/components/ui/button.tsx) - `rounded-md`, `ring-2`, `outline-none`
- [`src/components/ui/input.tsx`](../src/components/ui/input.tsx) - `rounded-md`, `ring-2`, `outline-none`
- [`src/components/ui/textarea.tsx`](../src/components/ui/textarea.tsx) - `rounded-md`, `ring-2`, `outline-none`
- [`src/components/ui/card.tsx`](../src/components/ui/card.tsx) - `rounded-lg`, `shadow-sm`
- [`src/components/ui/badge.tsx`](../src/components/ui/badge.tsx) - `ring-2`, `outline-none`
- [`src/components/ui/dialog.tsx`](../src/components/ui/dialog.tsx) - `rounded-sm`, `rounded-lg`, `shadow-lg`, `ring-2`, `outline-none`
- [`src/components/ui/toast.tsx`](../src/components/ui/toast.tsx) - `rounded-md`, `shadow-lg`, `ring-2`, `outline-none`
- [`src/components/ui/tooltip.tsx`](../src/components/ui/tooltip.tsx) - `rounded-md`, `shadow-md`

**Section Components:**
- [`src/components/BlogCard.tsx`](../src/components/BlogCard.tsx) - `shadow-lg`
- [`src/components/Profile.tsx`](../src/components/Profile.tsx) - `rounded-full`, `shadow-lg`
- [`src/components/SkillsView.tsx`](../src/components/SkillsView.tsx) - `rounded-lg`, `shadow-md`
- [`src/components/ToolsView.tsx`](../src/components/ToolsView.tsx) - `rounded-lg`, `shadow-md`
- [`src/components/Pagination.tsx`](../src/components/Pagination.tsx) - `rounded-md`
- [`src/components/sections/about/skill-tree/skill-card.tsx`](../src/components/sections/about/skill-tree/skill-card.tsx) - `rounded-lg`, `shadow-lg`
- [`src/components/sections/about/character-stats.tsx`](../src/components/sections/about/character-stats.tsx) - `rounded-lg`, `shadow-xl`, `shadow-sm`
- [`src/components/sections/services/service-card.tsx`](../src/components/sections/services/service-card.tsx) - `rounded-lg`
- [`src/components/sections/services/service-products.tsx`](../src/components/sections/services/service-products.tsx) - `rounded-lg`

**MDX Components:**
- [`src/mdx-components.tsx`](../src/mdx-components.tsx) - `rounded-lg`

---

## Phase 4: Plugin Migration

### 4.1 Typography Plugin

The `@tailwindcss/typography` plugin continues to work in v4:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "daisyui";
```

### 4.2 Tailwindcss-animate

Check if `tailwindcss-animate` is compatible with v4. If not, migrate animations to CSS:

```css
@theme {
  --animate-accordion-down: accordion-down 0.2s ease-out;
  --animate-accordion-up: accordion-up 0.2s ease-out;
}

@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
```

---

## Phase 5: DaisyUI v5 Upgrade

### 5.1 Install DaisyUI v5

```bash
yarn add daisyui@latest
```

### 5.2 Update CSS Import

```css
@import "tailwindcss";
@plugin "daisyui";
```

### 5.3 Theme Configuration

DaisyUI v5 themes are configured via CSS:

```css
@plugin "daisyui" {
  themes: dark;
}
```

Or use multiple themes:

```css
@plugin "daisyui" {
  themes: light, dark, cupcake;
}
```

---

## Phase 6: Testing & Verification

### 6.1 Build Verification

```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install

# Type check
yarn type-check

# Lint
yarn lint

# Build
yarn build
```

### 6.2 Visual Regression Testing

Compare screenshots of all pages:

| Page | URL | Status |
|------|-----|--------|
| Home | `/` | [ ] Verified |
| About | `/about` | [ ] Verified |
| Blog | `/blog` | [ ] Verified |
| Blog Post | `/blog/[slug]` | [ ] Verified |
| Projects | `/projects` | [ ] Verified |
| Services | `/services` | [ ] Verified |

### 6.3 Component Testing

Test each UI component:

- [ ] Button variants (default, destructive, outline, secondary, ghost, link)
- [ ] Card component
- [ ] Badge component
- [ ] Input and Textarea
- [ ] Dialog/Modal
- [ ] Toast notifications
- [ ] Tooltip
- [ ] Progress bar

### 6.4 Dark Mode Testing

- [ ] Theme toggle works correctly
- [ ] All colors render properly in dark mode
- [ ] No flash of unstyled content (FOUC)

---

## Migration Checklist

### Pre-Migration
- [ ] Create feature branch
- [ ] Verify Node.js 20+
- [ ] Take screenshots of all pages
- [ ] Backup configuration files

### Phase 1: Automated Upgrade
- [ ] Run `npx @tailwindcss/upgrade`
- [ ] Review changes made by upgrade tool
- [ ] Commit automated changes

### Phase 2: Configuration
- [ ] Update `postcss.config.mjs`
- [ ] Migrate `tailwind.config.js` to CSS
- [ ] Delete old `tailwind.config.js`
- [ ] Update `globals.css` with `@import` and `@theme`

### Phase 3: Utility Renames
- [ ] Update shadow utilities
- [ ] Update rounded utilities
- [ ] Update ring utilities
- [ ] Update outline utilities
- [ ] Update blur utilities (if any)

### Phase 4: Plugins
- [ ] Verify typography plugin works
- [ ] Migrate or remove tailwindcss-animate
- [ ] Test all plugin functionality

### Phase 5: DaisyUI
- [ ] Upgrade to DaisyUI v5
- [ ] Update CSS import
- [ ] Configure themes
- [ ] Test all DaisyUI components used

### Phase 6: Verification
- [ ] Build passes without errors
- [ ] Type check passes
- [ ] Lint passes
- [ ] Visual regression testing complete
- [ ] Dark mode works correctly
- [ ] All pages render correctly

### Post-Migration
- [ ] Update documentation
- [ ] Update `technical-guidelines.md`
- [ ] Merge to main branch
- [ ] Deploy and monitor

---

## Rollback Plan

If critical issues are found:

1. **Immediate Rollback:**
   ```bash
   git checkout main
   git branch -D feature/tailwind-v4-migration
   ```

2. **Partial Rollback:**
   - Keep v4 branch for future attempt
   - Document issues encountered
   - Create issues for blockers

3. **Stay on v3:**
   - Tailwind CSS v3.4 will continue to receive security updates
   - DaisyUI v4 remains compatible with v3
   - Plan migration for later when ecosystem is more stable

---

## Expected Results

### Performance Improvements
- **Build Time:** Faster with zero-runtime CSS
- **CSS Size:** Smaller output with better tree-shaking
- **Runtime:** No JavaScript overhead for styling

### Developer Experience
- **Configuration:** Simpler CSS-based config
- **Debugging:** Better source maps
- **Tooling:** Improved IDE support

### Browser Support
- **Minimum:** Safari 16.4, Chrome 111, Firefox 128
- **Note:** Older browsers not supported

---

## Timeline Estimate

| Phase | Description | Complexity |
|-------|-------------|------------|
| Phase 1 | Automated Upgrade | Low |
| Phase 2 | Configuration Migration | Medium |
| Phase 3 | Utility Renames | Medium |
| Phase 4 | Plugin Migration | Low |
| Phase 5 | DaisyUI Upgrade | Low |
| Phase 6 | Testing & Verification | High |

**Total:** This migration should be done in a focused session to avoid context switching.

---

## References

- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [DaisyUI v5 Documentation](https://daisyui.com/docs/v5)
- [Tailwind CSS v4 Release Notes](https://tailwindcss.com/blog/tailwindcss-v4)
- [DaisyUI v5 Upcoming Changes](https://daisyui.com/blog/daisyui-5-upcoming-changes)

---

## Related Documents

- [`upgrade-recommendations-2026.md`](upgrade-recommendations-2026.md) — Overall upgrade roadmap
- [`technical-guidelines.md`](technical-guidelines.md) — Code conventions and styling guidelines
- [`agent.md`](agent.md) — Project vision and decision rules
