# Fix: DaisyUI Multiple Compilation Issue

## Problem Description

When running `yarn run dev`, the terminal shows daisyUI being processed multiple times (30+ instances of `/*! 🌼 daisyUI 5.5.18 */`), and eventually the dev server becomes unresponsive or stops.

## Root Cause Analysis

The issue stems from a **known incompatibility between DaisyUI 5.x and Tailwind CSS v4 with Turbopack**.

### Current Configuration

```css
/* src/app/globals.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "daisyui" {
  themes: dark;
}
```

```javascript
// package.json - dev script
"dev": "next dev --turbopack"
```

### Why This Happens

1. **Turbopack + DaisyUI Conflict**: Turbopack processes CSS differently than Webpack. When combined with the `@plugin` directive for daisyUI, it can trigger multiple re-compilations.

2. **CSS Module Processing**: Each component that imports or uses styles triggers a CSS recompilation. With Turbopack's aggressive caching and hot-reload system, daisyUI's plugin gets invoked repeatedly.

3. **DaisyUI 5.x + Tailwind v4**: DaisyUI 5.x was designed for Tailwind CSS v4's new `@plugin` syntax, but there are known issues with how it interacts with Turbopack's CSS processing pipeline.

---

## Solution Options (Keeping Turbopack)

### Option A: Remove DaisyUI Entirely (Recommended)

**Analysis**: Looking at your codebase, you're barely using daisyUI. The only daisyUI-specific class found is in [`src/components/alvaroUI/ButtonIcon.tsx`](../src/components/alvaroUI/ButtonIcon.tsx:14) using `btn btn-circle`.

Your project already has:

- Custom shadcn/ui components in [`src/components/ui/`](../src/components/ui/)
- Custom [`Button`](../src/components/ui/button.tsx) component with variants
- Custom [`Badge`](../src/components/ui/badge.tsx) component with variants
- A complete dark fantasy theme system in [`globals.css`](../src/app/globals.css)

**Implementation**:

1. Remove daisyUI from `package.json`
2. Remove `@plugin "daisyui"` from `globals.css`
3. Replace the single `btn btn-circle` usage with Tailwind classes

```tsx
// src/components/alvaroUI/ButtonIcon.tsx - BEFORE
<button {...rest} className="btn btn-circle">

// AFTER - Using Tailwind utilities
<button {...rest} className="inline-flex items-center justify-center rounded-full h-10 w-10 border border-gold/50 bg-transparent text-gold hover:bg-gold/10 transition-colors">
```

**Pros**:

- Completely eliminates the issue
- Reduces bundle size
- Keeps Turbopack
- You're not actually using daisyUI features

**Cons**:

- Need to replace one component's styling

---

### Option B: Suppress DaisyUI Logs Only

Add `logs: false` to suppress the banner output:

```css
/* src/app/globals.css */
@plugin "daisyui" {
  themes: dark;
  logs: false;
}
```

**Pros**: Quick change, keeps Turbopack
**Cons**: May not fix the underlying compilation loop - only hides the symptoms

---

### Option C: Wait for DaisyUI/Turbopack Fix

Monitor these resources for updates:

- [DaisyUI GitHub Issues](https://github.com/saadeghi/daisyui/issues)
- [Next.js Turbopack Issues](https://github.com/vercel/next.js/issues)

**Pros**: No changes needed
**Cons**: Issue persists until fixed upstream

---

## Recommended Solution: Option A (Remove DaisyUI)

Given that:

1. You have a complete custom component library (shadcn/ui based)
2. You have a sophisticated dark fantasy theme system
3. Only ONE component uses daisyUI classes (`btn btn-circle`)
4. DaisyUI adds unnecessary bundle weight

**The cleanest solution is to remove daisyUI entirely.**

### Implementation Steps

#### Step 1: Update globals.css

Remove the daisyUI plugin:

```css
/* src/app/globals.css - Lines 1-5 */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
/* REMOVE: @plugin "daisyui" { themes: dark; } */
```

#### Step 2: Update ButtonIcon.tsx

Replace daisyUI classes with Tailwind:

```tsx
// src/components/alvaroUI/ButtonIcon.tsx
export default function ButtonIcon({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="inline-flex items-center justify-center rounded-full h-10 w-10 border border-gold/50 bg-transparent text-gold hover:bg-gold/10 active:scale-95 transition-all"
    >
      {children}
    </button>
  );
}
```

#### Step 3: Remove daisyUI dependency

```bash
yarn remove daisyui
```

#### Step 4: Verify

```bash
yarn dev
```

---

## Alternative: Keep DaisyUI Without Turbopack

If you want to keep daisyUI for future use:

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "dev:turbo": "next dev --turbopack"
  }
}
```

---

## Technical Context

### Version Information

- Next.js: 16.1.6
- Tailwind CSS: 4.1.18
- DaisyUI: 5.5.18
- @tailwindcss/postcss: 4.1.18

### DaisyUI Usage Audit

| File                                                             | Usage            | Can Replace?                     |
| ---------------------------------------------------------------- | ---------------- | -------------------------------- |
| [`ButtonIcon.tsx`](../src/components/alvaroUI/ButtonIcon.tsx:14) | `btn btn-circle` | ✅ Yes - simple Tailwind classes |

**Total daisyUI classes used: 2** (`btn`, `btn-circle`)

---

## Files to Modify

### Option A (Remove DaisyUI):

1. [`src/app/globals.css`](../src/app/globals.css) - Remove `@plugin "daisyui"`
2. [`src/components/alvaroUI/ButtonIcon.tsx`](../src/components/alvaroUI/ButtonIcon.tsx) - Replace daisyUI classes
3. [`package.json`](../package.json) - Remove daisyui dependency

### Option B (Suppress Logs):

1. [`src/app/globals.css`](../src/app/globals.css) - Add `logs: false`

---

## Verification Checklist

- [ ] Dev server starts without repeated daisyUI messages
- [ ] Turbopack still enabled and working
- [ ] Hot reload works correctly
- [ ] ButtonIcon component renders properly
- [ ] No visual regressions
- [ ] Build command still works (`yarn build`)
