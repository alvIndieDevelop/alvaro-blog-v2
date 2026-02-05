# Technical Debt Cleanup Plan

## Overview

This plan outlines the steps to clean up technical debt in the Alvaro Blog V2 project, focusing on removing unused dependencies, fixing code quality issues, and improving the overall codebase health.

**Status: COMPLETED** ✅

---

## Phase 1: Remove Unused Dependencies ✅

### Packages Removed

| Package | Reason for Removal |
|---------|-------------------|
| `firebase` | No imports found in codebase |
| `@stripe/stripe-js` | Only commented-out code references |
| `stripe` | Only commented-out code references |
| `@radix-ui/react-label` | Replaced with simple implementation |
| `@radix-ui/react-progress` | Replaced with simple implementation |
| `@radix-ui/react-separator` | Unused |
| `@radix-ui/react-slot` | Replaced with simple implementation |
| `@radix-ui/react-toast` | Replaced with simple implementation |
| `@radix-ui/react-tooltip` | Replaced with simple implementation |
| `embla-carousel-react` | Unused (carousel component deleted) |
| `recharts` | Unused (chart component deleted) |
| `vaul` | Unused (drawer component deleted) |
| `cmdk` | Unused (command component deleted) |
| `input-otp` | Unused (input-otp component deleted) |
| `react-day-picker` | Unused (calendar component deleted) |
| `react-resizable-panels` | Unused (resizable component deleted) |
| `sonner` | Unused (sonner component deleted) |
| `classnames` | Duplicate of clsx |
| `@heroicons/react` | Unused (using lucide-react) |
| `use-hooks` | Unused |
| 20+ Radix UI packages | Unused shadcn/ui components |

### Components Kept (with simple implementations)

- `button` - Replaced Radix Slot with React.cloneElement
- `badge` - Simple implementation
- `card` - Simple implementation
- `toast` / `toaster` - Replaced Radix with simple HTML/CSS
- `input` - Simple implementation
- `textarea` - Simple implementation
- `tooltip` - Replaced Radix with simple CSS hover
- `progress` - Replaced Radix with simple HTML/CSS
- `dialog` - Replaced Radix with simple modal implementation
- `grid-background` - Simple implementation

---

## Phase 2: Remove Unused Files ✅

### Files Deleted

```
src/pages/index.old.tsx          # Old version of index page
src/styles/globals.old.css       # Old version of global styles
src/components/layouts/MainLayout.tsx    # Unused layout
src/components/layouts/MainFooter.tsx    # Unused footer
```

### Unused shadcn/ui Component Files Deleted

```
src/components/ui/accordion.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/alert.tsx
src/components/ui/aspect-ratio.tsx
src/components/ui/avatar.tsx
src/components/ui/breadcrumb.tsx
src/components/ui/calendar.tsx
src/components/ui/carousel.tsx
src/components/ui/chart.tsx
src/components/ui/checkbox.tsx
src/components/ui/collapsible.tsx
src/components/ui/command.tsx
src/components/ui/context-menu.tsx
src/components/ui/drawer.tsx
src/components/ui/dropdown-menu.tsx
src/components/ui/form.tsx
src/components/ui/hover-card.tsx
src/components/ui/input-otp.tsx
src/components/ui/label.tsx
src/components/ui/menubar.tsx
src/components/ui/navigation-menu.tsx
src/components/ui/pagination.tsx
src/components/ui/popover.tsx
src/components/ui/radio-group.tsx
src/components/ui/resizable.tsx
src/components/ui/scroll-area.tsx
src/components/ui/select.tsx
src/components/ui/separator.tsx
src/components/ui/sheet.tsx
src/components/ui/skeleton.tsx
src/components/ui/slider.tsx
src/components/ui/sonner.tsx
src/components/ui/switch.tsx
src/components/ui/table.tsx
src/components/ui/tabs.tsx
src/components/ui/toggle.tsx
src/components/ui/toggle-group.tsx
```

---

## Phase 3: Fix Build Configuration ✅

### Changes Made

1. **Removed `ignoreDuringBuilds: true`** from ESLint config in next.config.js
2. **Removed `ignoreBuildErrors: true`** from TypeScript config in next.config.js
3. **Simplified ESLint configuration** to work with ESLint 9
4. **Fixed React 19 compatibility issues** by replacing Radix UI components with simple implementations

### Components Replaced for React 19 Compatibility

| Component | Issue | Solution |
|-----------|-------|----------|
| `progress.tsx` | Radix UI React type conflicts | Simple HTML div implementation |
| `tooltip.tsx` | Radix UI React type conflicts | Simple CSS hover implementation |
| `toast.tsx` | Radix UI React type conflicts | Simple HTML/CSS implementation |
| `button.tsx` | Radix Slot React type conflicts | React.cloneElement for asChild |
| `dialog.tsx` | Was deleted, needed by services | Simple modal implementation |

---

## Phase 4: Fix Code Quality Issues ✅

### Fixed Issues

1. **BlogCard.tsx** - Removed unused `featured` property from destructuring
2. **Profile.tsx** - Moved `key` prop to correct element in map
3. **types.ts** - Added missing `Position` and `SkillNode` interfaces
4. **service-products.tsx** - Removed commented Stripe code

### Remaining Minor Issues (Optional)

- Console.log statements in notion-services.ts (useful for debugging)
- `any` types in notion-services.ts (would require Notion API type definitions)
- "use client" directives (harmless in Pages Router)

---

## Phase 5: Clean Up Commented Code ✅

### Cleaned Up

1. **service-products.tsx** - Removed all commented Stripe integration code
2. **Removed unused imports** - Code2 from lucide-react

### Kept (Intentional)

- Navigation items in Header/Footer (Products, Contact) - may be implemented later
- Support section comment - may be implemented later

---

## Execution Summary

### Completed Tasks

- [x] Remove unused dependencies from package.json (~30 packages removed)
- [x] Remove unused shadcn/ui component files (~35 files deleted)
- [x] Delete old/unused layout files
- [x] Enable ESLint during builds
- [x] Enable TypeScript checking during builds
- [x] Fix React 19 compatibility issues
- [x] Replace Radix UI with simple implementations
- [x] Fix TypeScript errors
- [x] Clean up commented code
- [x] Verify build works

---

## Results

### Before Cleanup

- **Dependencies**: ~60+ packages
- **UI Components**: 40+ shadcn/ui components
- **Build**: Errors ignored, warnings hidden
- **React 19**: Incompatible with Radix UI

### After Cleanup

- **Dependencies**: ~30 packages (50% reduction)
- **UI Components**: 10 essential components
- **Build**: Clean build with proper error checking
- **React 19**: Fully compatible with simple implementations

### Build Output

```
Route (pages)                              Size     First Load JS
┌ ○ /                                      2.75 kB         157 kB
├   /_app                                  0 B             110 kB
├ ○ /404                                   189 B           110 kB
├ ○ /about                                 9.33 kB         159 kB
├ ƒ /api/hello                             0 B             110 kB
├ ● /blog (ISR: 60 Seconds)                2.37 kB         152 kB
├ ● /blog/[slug]                           56.6 kB         206 kB
├ ○ /projects                              2.05 kB         148 kB
└ ○ /services                              991 B           152 kB
+ First Load JS shared by all              123 kB
```

---

## Future Recommendations

1. **Consider adding Stripe back** when ready to implement payments
2. **Add proper Notion API types** for better type safety
3. **Implement Products and Contact pages** or remove from navigation
4. **Add unit tests** for critical components
5. **Set up CI/CD** with build verification
