# Visual Overhaul Plan - Alvaro Indie Hub

## Overview

Simplify the project to focus on Layer 0 (Playable Demo) by removing premature features and creating a cohesive RPG-themed visual identity.

---

## Phase 1: Remove Unnecessary Content

### Pages to Remove
- [ ] `/services` page - Delete `src/app/services/page.tsx`

### Sections to Remove from Home
- [ ] `ServicesSection` - Remove from home page
- [ ] `ServiceProducts` - Remove from home page
- [ ] `ProcessSection` - Remove from home page
- [ ] `Contact` - Remove from home page

### Navigation Updates
- [ ] Remove "Services" from Header navigation
- [ ] Remove "Services" from Footer navigation

---

## Phase 2: Simplify Home Page

### New Home Page Structure

```
┌─────────────────────────────────────────────────────────┐
│                      HEADER                              │
│  Alvaro Blog!    About  Projects  Blog    🌙  GitHub    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                    [Profile Image]                       │
│                                                          │
│              Alvaro Martin Caballero                     │
│         Level 7 Senior Software Developer                │
│                                                          │
│    "Code is my craft, games are my passion"              │
│                                                          │
│         [View Projects]    [Read Blog]                   │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│              ⚔️ FEATURED QUESTS                          │
│                                                          │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                  │
│  │ Project │  │ Project │  │ Project │                  │
│  │    1    │  │    2    │  │    3    │                  │
│  └─────────┘  └─────────┘  └─────────┘                  │
│                                                          │
│              [View All Projects →]                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                      FOOTER                              │
│  Simplified footer with social links only                │
└─────────────────────────────────────────────────────────┘
```

### Hero Redesign
- Keep profile image
- Update title to match RPG theme
- Add tagline/quote
- Keep two CTA buttons (Projects, Blog)
- Add subtle RPG-themed background

---

## Phase 3: Projects Page Redesign

### Current State
- Simple project cards with title, description, tech tags, GitHub link

### Proposed "Achievements" Style

```
┌─────────────────────────────────────────────────────────┐
│                   🏆 ACHIEVEMENTS                         │
│              Completed Quests & Projects                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐    │
│  │ 🎮 Flask Template                    ✅ COMPLETE │    │
│  │ A simple flask template for building web apps    │    │
│  │                                                   │    │
│  │ Skills Used: Python, Flask                       │    │
│  │ Difficulty: ⭐⭐☆☆☆                              │    │
│  │                                                   │    │
│  │ [View on GitHub]                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 4: Footer Simplification

### Current Footer
- 4-column grid with description, links, empty column, social

### Proposed Footer
- Single row with copyright and social icons
- Remove navigation links (already in header)
- Keep it minimal

---

## Implementation Checklist

### Phase 1: Cleanup
- [ ] Remove Services from navigation (Header.tsx)
- [ ] Remove Services from navigation (Footer.tsx)
- [ ] Simplify Home page (page.tsx)
- [ ] Delete Services page (optional - can keep for later)

### Phase 2: Home Page
- [ ] Redesign Hero with RPG theme
- [ ] Keep Projects section but limit to 3 featured
- [ ] Add "View All Projects" link

### Phase 3: Projects Page
- [ ] Redesign project cards as "Achievements"
- [ ] Add difficulty ratings
- [ ] Add completion status

### Phase 4: Footer
- [ ] Simplify to single row
- [ ] Keep social links
- [ ] Remove navigation links

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/app/page.tsx` | Remove Services, Products, Process, Contact |
| `src/components/layouts/Header.tsx` | Remove Services from navigation |
| `src/components/layouts/Footer.tsx` | Simplify to minimal footer |
| `src/components/sections/Hero.tsx` | Redesign with RPG theme |
| `src/components/sections/projects/index.tsx` | Limit to 3 featured |
| `src/app/projects/page.tsx` | Redesign as Achievements |

## Files to Potentially Delete

| File | Reason |
|------|--------|
| `src/app/services/page.tsx` | Layer 2 content - not needed yet |
| `src/components/sections/services/*` | Layer 2 content |
| `src/components/sections/contact/*` | No backend - not functional |

---

## Design Principles

1. **Keep it simple** - Layer 0 should be stable and low-maintenance
2. **RPG identity** - Consistent game-like theming throughout
3. **Functional first** - Only show what actually works
4. **Progressive disclosure** - More content unlocks over time

---

## Expected Result

A clean, focused personal hub with:
- Home: Hero + Featured Projects
- About: Character Sheet (already done)
- Projects: Achievements gallery
- Blog: Quest Log (existing MDX system)

No dead ends, no non-functional features, no premature monetization.
