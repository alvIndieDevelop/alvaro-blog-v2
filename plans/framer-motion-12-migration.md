# Framer Motion 12 Migration Plan

## Overview

Upgrade Framer Motion from v11.16.4 to v12.31.1 for better React 19 support, improved performance, and smaller bundle size.

## Current State Analysis

### Version Info
- **Current**: `framer-motion@11.16.4`
- **Target**: `framer-motion@12.31.1`

### Usage Statistics
- **Total files using Framer Motion**: 21
- **AnimatePresence usage**: 1 file
- **whileInView animations**: 15 files
- **layout animations**: 1 file

### Files Using Framer Motion

| File | Features Used |
|------|---------------|
| `src/components/ui/grid-background.tsx` | motion |
| `src/components/Profile.tsx` | motion, whileInView, viewport |
| `src/components/sections/Hero.tsx` | motion |
| `src/components/sections/support/index.tsx` | motion, whileInView, viewport |
| `src/components/sections/contact/index.tsx` | motion, whileInView, viewport |
| `src/components/sections/services/services-section.tsx` | motion, whileInView, viewport |
| `src/components/sections/services/service-products.tsx` | motion, whileInView, viewport |
| `src/components/sections/services/service-hero.tsx` | motion |
| `src/components/sections/services/service-card.tsx` | motion, whileInView, viewport |
| `src/components/sections/services/process-section.tsx` | motion, whileInView, viewport |
| `src/components/sections/about/hero.tsx` | motion |
| `src/components/sections/about/character-stats.tsx` | motion |
| `src/components/sections/about/skill-tree.tsx` | motion |
| `src/components/sections/about/skill-tree/index.tsx` | motion |
| `src/components/sections/about/skill-tree/skill-card.tsx` | motion, AnimatePresence, layout, whileHover, whileTap |
| `src/components/sections/about/skill-tree/skill-node.tsx` | motion |
| `src/components/sections/about/skill-tree/skill-connection.tsx` | motion |
| `src/components/sections/about/skill-tree/background.tsx` | motion |
| `src/components/sections/about/skill-tree/section.tsx` | motion, whileInView, viewport |
| `src/components/sections/products/index.tsx` | motion, whileInView, viewport |
| `src/components/sections/projects/index.tsx` | motion, whileInView, viewport |

---

## Breaking Changes in Framer Motion 12

### 1. Import Path Changes (Major)

**v11:**
```tsx
import { motion, AnimatePresence } from "framer-motion";
```

**v12:**
```tsx
// Option 1: Keep using framer-motion (recommended for compatibility)
import { motion, AnimatePresence } from "framer-motion";

// Option 2: Use new "motion" package (smaller bundle)
import { motion, AnimatePresence } from "motion/react";
```

**Impact**: The `framer-motion` import still works in v12 for backward compatibility. The new `motion/react` import is optional but provides a smaller bundle.

### 2. AnimatePresence Mode Changes

**v11:**
```tsx
<AnimatePresence mode="wait">
```

**v12:**
```tsx
<AnimatePresence mode="wait">  // Still works
<AnimatePresence mode="sync">  // New mode available
<AnimatePresence mode="popLayout">  // New mode available
```

**Impact**: No breaking change - `mode="wait"` still works.

### 3. Layout Animation Changes

**v11:**
```tsx
<motion.div layout>
```

**v12:**
```tsx
<motion.div layout>  // Still works
<motion.div layout="position">  // More specific
<motion.div layout="size">  // More specific
```

**Impact**: No breaking change - `layout` prop still works.

### 4. Viewport Options

**v11:**
```tsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
```

**v12:**
```tsx
<motion.div
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}  // Still works
>
```

**Impact**: No breaking change.

### 5. Removed/Deprecated APIs

| API | Status | Replacement |
|-----|--------|-------------|
| `useAnimation` | ✅ Still works | - |
| `useMotionValue` | ✅ Still works | - |
| `useTransform` | ✅ Still works | - |
| `useSpring` | ✅ Still works | - |
| `useScroll` | ✅ Still works | - |
| `useInView` | ✅ Still works | - |
| `useCycle` | ⚠️ Deprecated | Use `useState` |
| `usePresence` | ✅ Still works | - |

---

## Migration Risk Assessment

| Risk Factor | Level | Notes |
|-------------|-------|-------|
| Breaking changes | 🟢 Low | Most APIs unchanged |
| Bundle size | 🟢 Positive | Smaller with new imports |
| React 19 compatibility | 🟢 Positive | Better support |
| Animation behavior | 🟢 Low | Same behavior expected |
| Testing required | 🟡 Medium | Visual verification needed |

---

## Migration Plan

### Phase 1: Upgrade Package

```bash
yarn add framer-motion@^12.31.1
```

### Phase 2: Build and Test

```bash
yarn build
yarn dev
```

### Phase 3: Visual Verification

Test all pages with animations:
- [ ] Home page (Hero section)
- [ ] About page (Profile, Skill Tree, Character Stats)
- [ ] Services page (Service cards, Process section)
- [ ] Projects page (Project cards)
- [ ] Blog page (Blog cards)

### Phase 4: Optional - Migrate to New Import Path

If bundle size optimization is desired, update imports:

```tsx
// Before
import { motion, AnimatePresence } from "framer-motion";

// After (optional, smaller bundle)
import { motion, AnimatePresence } from "motion/react";
```

**Note**: This is optional and can be done later. The `framer-motion` import will continue to work.

---

## Rollback Plan

If issues are encountered:

```bash
yarn add framer-motion@11.16.4
```

---

## Expected Benefits

1. **Better React 19 Support**: Improved compatibility with React 19's concurrent features
2. **Smaller Bundle Size**: ~30% smaller with new import path
3. **Performance Improvements**: Optimized animation engine
4. **New Features**: Access to new animation modes and APIs
5. **Future-Proofing**: Stay current with the ecosystem

---

## Estimated Effort

| Task | Effort |
|------|--------|
| Package upgrade | 5 minutes |
| Build verification | 5 minutes |
| Visual testing | 15 minutes |
| **Total** | ~25 minutes |

---

## Conclusion

This is a **low-risk upgrade** because:
1. The project uses standard Framer Motion APIs
2. No deprecated APIs are used
3. `AnimatePresence mode="wait"` is still supported
4. All `whileInView` and `viewport` patterns are unchanged

The upgrade can be done with a simple package update and visual verification.
