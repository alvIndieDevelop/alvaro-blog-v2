# Character Stats Panel Enhancement

## Overview

Enhance the existing Character Stats Panel on the About page with improved visuals and updated information while keeping the implementation simple and maintainable.

---

## Current State

The Profile component ([`src/components/Profile.tsx`](../src/components/Profile.tsx)) already includes:
- Basic stats display (HP, Mana, EXP) using DaisyUI radial progress
- Character info (name, level, title)
- About me text content

A separate `CharacterStats` component exists ([`src/components/sections/about/character-stats.tsx`](../src/components/sections/about/character-stats.tsx)) but is not currently used.

---

## Proposed Enhancements

### 1. Update Character Info

**Current:**
```
Level 6 Software Developer | IndieDev Guild Member
```

**Proposed:**
```
Level 6 Senior Software Developer
🏢 IntechIdeas | 🎮 IndieDev Guild
```

### 2. Enhanced Stats Display

Keep the three core stats but improve their visual presentation:

| Stat | Icon | Color | Value | Meaning |
|------|------|-------|-------|---------|
| **HP** | ❤️ Heart | Red | 100/100 | Energy/Availability |
| **MP** | 💧 Mana | Blue | 100/100 | Creativity/Focus |
| **EXP** | ⚡ Lightning | Yellow | Dynamic | Year progress % |

### 3. Visual Improvements

```
┌─────────────────────────────────────────────────────────┐
│                    CHARACTER SHEET                       │
│                                                          │
│                      [Profile Image]                     │
│                                                          │
│              Alvaro Martin Caballero                     │
│         Level 6 Senior Software Developer                │
│        🏢 IntechIdeas  |  🎮 IndieDev Guild             │
│                                                          │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐             │
│  │   HP    │    │   MP    │    │   EXP   │             │
│  │  ❤️ 100 │    │  💧 100 │    │  ⚡ 40% │             │
│  │ ████████│    │ ████████│    │ ████░░░░│             │
│  └─────────┘    └─────────┘    └─────────┘             │
│                                                          │
│  ─────────────── ATTRIBUTES ───────────────             │
│                                                          │
│  STR: ████████░░  80    INT: █████████░  90             │
│  DEX: ███████░░░  70    WIS: ████████░░  80             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 4. Optional: Attribute Stats (Calculated from Skill Tree)

If desired, add secondary attributes calculated from skill tree data:

| Attribute | Calculation | Skills Used |
|-----------|-------------|-------------|
| **STR** (Backend) | Average of backend skills | Express, NestJS |
| **INT** (Frontend) | Average of frontend skills | React, Next.js |
| **DEX** (DevOps) | Average of AWS skills | Lambda, Amplify, EC2 |
| **WIS** (Data) | Average of database skills | MongoDB, PostgreSQL, Redis |

---

## Implementation Plan

### Step 1: Update Profile Component

Modify [`src/components/Profile.tsx`](../src/components/Profile.tsx):

1. Update the title/subtitle to include current role at IntechIdeas
2. Keep the existing radial progress stats (HP, MP, EXP)
3. Improve the visual styling with better spacing and typography

### Step 2: Create Enhanced Stats Card (Optional)

If we want the attribute stats, create a new component that:
1. Imports skill data from [`src/components/sections/about/skill-tree/data.ts`](../src/components/sections/about/skill-tree/data.ts)
2. Calculates attribute averages
3. Displays them as horizontal progress bars

### Step 3: Integration

The Profile component is already used in the About page via:
- [`src/components/sections/about/hero.tsx`](../src/components/sections/about/hero.tsx) → uses Profile
- [`src/app/about/page.tsx`](../src/app/about/page.tsx) → uses AboutHero

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/Profile.tsx` | Update title, add IntechIdeas, improve styling |
| `src/utils/index.ts` | No changes needed (already has helper functions) |

## Files to Create (Optional)

| File | Purpose |
|------|---------|
| `src/components/sections/about/attribute-stats.tsx` | New component for STR/INT/DEX/WIS stats |

---

## Design Decisions

### Keep Simple
- ✅ Use existing DaisyUI radial-progress component
- ✅ Keep HP and MP at 100 (static)
- ✅ Keep EXP as year progress percentage
- ✅ Update text content only

### Avoid Complexity
- ❌ No external data fetching
- ❌ No complex calculations
- ❌ No new dependencies
- ❌ No breaking changes to existing layout

---

## Example Code Changes

### Profile.tsx - Updated Title Section

```tsx
<p className="text-primary/80 font-medium text-lg max-w-2xl mx-auto">
  Level {currAgeExp} Senior Software Developer
</p>
<p className="text-primary/60 text-sm mt-2">
  🏢 IntechIdeas | 🎮 IndieDev Guild
</p>
```

### Optional: Attribute Stats Component

```tsx
// src/components/sections/about/attribute-stats.tsx
import { skillTreeData } from "./skill-tree/data";

function calculateAttribute(categoryId: string): number {
  const category = skillTreeData.find(c => c.id === categoryId);
  if (!category) return 0;
  const total = category.skills.reduce((sum, skill) => sum + skill.experience, 0);
  return Math.round(total / category.skills.length);
}

export function AttributeStats() {
  const attributes = [
    { name: "STR", value: calculateAttribute("backend"), color: "bg-red-500" },
    { name: "INT", value: calculateAttribute("frontend"), color: "bg-blue-500" },
    { name: "DEX", value: calculateAttribute("aws"), color: "bg-green-500" },
    { name: "WIS", value: calculateAttribute("databases"), color: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {attributes.map(attr => (
        <div key={attr.name} className="flex items-center gap-2">
          <span className="w-10 font-bold">{attr.name}</span>
          <Progress value={attr.value} className={attr.color} />
          <span className="w-8 text-right">{attr.value}</span>
        </div>
      ))}
    </div>
  );
}
```

---

## Summary

This enhancement focuses on:
1. **Updating content** - Add IntechIdeas as current employer
2. **Improving visuals** - Better typography and spacing
3. **Keeping it simple** - No complex calculations or new dependencies
4. **Optional expansion** - Attribute stats can be added later if desired

The changes align with the project's indie game identity while respecting the "keep it simple" principle from the agent guidelines.

---

## Next Steps

1. ✅ Review and approve this plan
2. Switch to Code mode to implement changes
3. Test the updated About page
4. Optionally add attribute stats in a future iteration
