# Realm Layers Architecture

## Vision

Transform the portfolio into an interconnected world of "Realms" - each representing a different aspect of your life and work. Visitors explore your world like an RPG, discovering different facets of who you are.

---

## The Realms (Layers)

### 🏰 The Sanctum (Home)
**Purpose**: The central hub - your personal castle/headquarters
**URL**: `/` (home)
**Atmosphere**: Epic, welcoming, mysterious entrance

**Content**:
- Hero introduction with character portrait
- Quick navigation to all realms
- Featured highlights from each realm
- "Latest Adventures" feed (recent activity across all realms)

**Visual Theme**:
- Grand entrance hall aesthetic
- Floating ember particles
- Golden accents, dark void background
- Portal-like links to other realms

---

### ⚔️ The Forge (Professional)
**Purpose**: Professional work, career, services
**URL**: `/forge` or `/professional`
**Atmosphere**: Industrial, powerful, craftsmanship

**Content**:
- Professional projects (client work, enterprise solutions)
- Services offered
- Work experience timeline
- Technologies mastered
- Client testimonials
- Resume/CV download

**Visual Theme**:
- Molten metal oranges and reds
- Anvil and hammer motifs
- Sparks and heat effects
- Industrial gothic aesthetic
- Achievement cards with "Forged" badges

**Sections**:
```
/forge
├── /forge/projects     → Professional portfolio
├── /forge/services     → What you offer
├── /forge/experience   → Career timeline
└── /forge/contact      → Business inquiries
```

---

### 🎮 The Workshop (Creative)
**Purpose**: Game development, creative projects, experiments
**URL**: `/workshop` or `/creative`
**Atmosphere**: Inventive, playful, experimental

**Content**:
- Game development projects
- Side projects and experiments
- Game jams participated
- Creative tools built
- Art and design work
- Open source contributions

**Visual Theme**:
- Ethereal blues and purples
- Magical workshop aesthetic
- Floating tools and components
- Blueprint/schematic overlays
- "Prototype" and "In Development" badges

**Sections**:
```
/workshop
├── /workshop/games      → Game projects
├── /workshop/experiments → Side projects
├── /workshop/tools      → Utilities built
└── /workshop/jams       → Game jam entries
```

---

### 🍺 The Tavern (Personal)
**Purpose**: Personal life, hobbies, community, casual content
**URL**: `/tavern` or `/personal`
**Atmosphere**: Warm, inviting, social

**Content**:
- Hobbies and interests
- Personal blog posts (non-technical)
- Life updates and milestones
- Favorite games, books, media
- Community involvement
- Social links and connections

**Visual Theme**:
- Warm amber and wood tones
- Cozy tavern aesthetic
- Candlelight effects
- Wooden textures and frames
- "Tales" instead of "Posts"

**Sections**:
```
/tavern
├── /tavern/tales        → Personal blog
├── /tavern/hobbies      → Interests showcase
├── /tavern/favorites    → Curated lists
└── /tavern/community    → Social connections
```

---

### 📚 The Library (Knowledge)
**Purpose**: Technical blog, tutorials, learning, ideas
**URL**: `/library` or `/scrolls`
**Atmosphere**: Scholarly, mysterious, ancient wisdom

**Content**:
- Technical blog posts
- Tutorials and guides
- Learning notes
- Ideas and concepts
- Research and discoveries
- Book reviews (technical)

**Visual Theme**:
- Deep blues and gold
- Ancient library aesthetic
- Floating dust particles
- Scroll and book motifs
- "Scrolls" and "Tomes" terminology

**Sections**:
```
/library
├── /library/scrolls     → Blog posts
├── /library/tomes       → Long-form guides
├── /library/notes       → Quick learnings
└── /library/ideas       → Concept explorations
```

---

### 🗺️ The Map (Navigation Hub)
**Purpose**: Visual overview of all realms
**URL**: `/map` or `/explore`
**Atmosphere**: Adventure, discovery, exploration

**Content**:
- Interactive visual map of all realms
- Quick stats for each area
- Recent activity indicators
- "Unexplored" areas (coming soon)

**Visual Theme**:
- Fantasy map aesthetic
- Parchment texture
- Illustrated realm icons
- Connecting paths between realms

---

## Navigation Structure

### Primary Navigation
```
┌─────────────────────────────────────────────────────────────────┐
│  ⚔️ Alvaro's Sanctum                                            │
│                                                                  │
│  [🏰 Home] [⚔️ Forge] [🎮 Workshop] [🍺 Tavern] [📚 Library]    │
│                                                                  │
│                                        [🗺️ Map] [🌙] [GitHub]   │
└─────────────────────────────────────────────────────────────────┘
```

### Mobile Navigation
- Hamburger menu with realm icons
- Bottom navigation bar option
- Swipe between realms

---

## Cross-Realm Features

### 1. Activity Feed
Show recent activity across all realms on the home page:
```
Latest Adventures:
├── 📚 New scroll: "Getting Started with Next.js 15"
├── ⚔️ Project completed: "E-commerce Platform"
├── 🎮 Game jam entry: "Pixel Dungeon"
└── 🍺 New tale: "My Journey into Game Dev"
```

### 2. Unified Search
Search across all realms with filters:
- Filter by realm
- Filter by content type
- Filter by tags/skills

### 3. Achievement System
Track accomplishments across realms:
- "Master Forger" - 10 professional projects
- "Game Crafter" - 5 games released
- "Lorekeeper" - 50 blog posts
- "Tavern Regular" - Active community member

### 4. Character Stats Integration
The About page character sheet pulls data from all realms:
- Professional XP from Forge projects
- Creative XP from Workshop experiments
- Social XP from Tavern engagement
- Knowledge XP from Library contributions

---

## URL Structure

```
/                           → The Sanctum (Home)
/about                      → Character Sheet
/map                        → Realm Map

/forge                      → The Forge (Professional)
/forge/projects             → Professional Projects
/forge/services             → Services Offered
/forge/experience           → Career Timeline

/workshop                   → The Workshop (Creative)
/workshop/games             → Game Projects
/workshop/experiments       → Side Projects
/workshop/tools             → Utilities

/tavern                     → The Tavern (Personal)
/tavern/tales               → Personal Blog
/tavern/hobbies             → Hobbies
/tavern/favorites           → Curated Lists

/library                    → The Library (Knowledge)
/library/scrolls            → Technical Blog
/library/tomes              → Long Guides
/library/notes              → Quick Notes
```

---

## Data Architecture

### Content Types

```typescript
// Base content type
interface RealmContent {
  id: string;
  title: string;
  description: string;
  realm: 'forge' | 'workshop' | 'tavern' | 'library';
  type: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
  status: 'published' | 'draft' | 'archived';
}

// Forge content
interface ForgeProject extends RealmContent {
  realm: 'forge';
  type: 'project' | 'service' | 'experience';
  client?: string;
  technologies: string[];
  links: { github?: string; live?: string; };
  difficulty: 1 | 2 | 3 | 4 | 5;
  xpReward: number;
}

// Workshop content
interface WorkshopProject extends RealmContent {
  realm: 'workshop';
  type: 'game' | 'experiment' | 'tool' | 'jam';
  platform: string[];
  status: 'concept' | 'prototype' | 'development' | 'released';
  playable: boolean;
  links: { itch?: string; github?: string; play?: string; };
}

// Tavern content
interface TavernPost extends RealmContent {
  realm: 'tavern';
  type: 'tale' | 'hobby' | 'favorite' | 'update';
  mood: 'happy' | 'reflective' | 'excited' | 'casual';
  media?: { images: string[]; videos: string[]; };
}

// Library content
interface LibraryPost extends RealmContent {
  realm: 'library';
  type: 'scroll' | 'tome' | 'note' | 'idea';
  readingTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  series?: string;
  prerequisites?: string[];
}
```

### Content Storage Options

1. **MDX Files** (Current approach, extended)
   ```
   content/
   ├── forge/
   │   ├── projects/
   │   └── services/
   ├── workshop/
   │   ├── games/
   │   └── experiments/
   ├── tavern/
   │   └── tales/
   └── library/
       └── scrolls/
   ```

2. **Headless CMS** (Future option)
   - Sanity, Contentful, or Strapi
   - Better for non-technical content management
   - Real-time updates

---

## Visual Design Per Realm

### Color Palettes

| Realm | Primary | Secondary | Accent | Glow |
|-------|---------|-----------|--------|------|
| Sanctum | Gold | Void Black | Ethereal Blue | Golden |
| Forge | Ember Orange | Charcoal | Molten Gold | Orange |
| Workshop | Ethereal Blue | Deep Purple | Cyan | Blue |
| Tavern | Amber | Warm Brown | Cream | Amber |
| Library | Royal Blue | Parchment | Gold | Blue |

### Unique Elements Per Realm

**Forge**:
- Anvil icon
- Spark particles
- Metal textures
- Heat shimmer effects

**Workshop**:
- Gear/cog icons
- Blueprint backgrounds
- Floating tool particles
- Holographic overlays

**Tavern**:
- Mug/tankard icons
- Wood grain textures
- Candle flicker effects
- Warm vignette

**Library**:
- Book/scroll icons
- Dust particles
- Parchment textures
- Ink splatter accents

---

## Implementation Phases

### Phase 1: Foundation
- [ ] Create realm routing structure
- [ ] Design realm-specific layouts
- [ ] Implement realm color themes
- [ ] Create shared components with realm variants

### Phase 2: The Forge
- [ ] Migrate current projects to Forge
- [ ] Migrate services page
- [ ] Add experience timeline
- [ ] Create Forge-specific card designs

### Phase 3: The Workshop
- [ ] Create Workshop landing page
- [ ] Add game projects section
- [ ] Add experiments section
- [ ] Implement "In Development" status badges

### Phase 4: The Tavern
- [ ] Create Tavern landing page
- [ ] Add personal blog (tales)
- [ ] Add hobbies showcase
- [ ] Add favorites/curated lists

### Phase 5: The Library
- [ ] Migrate current blog to Library
- [ ] Add tomes (long-form) section
- [ ] Add notes (quick) section
- [ ] Add ideas section

### Phase 6: Integration
- [ ] Create realm map page
- [ ] Implement cross-realm activity feed
- [ ] Add unified search
- [ ] Update character sheet with realm stats

### Phase 7: Polish
- [ ] Add realm-specific particle effects
- [ ] Implement smooth realm transitions
- [ ] Add achievement system
- [ ] Performance optimization

---

## Questions to Consider

1. **Content Priority**: Which realm should we build first after the foundation?
2. **Existing Content**: How should we migrate current projects and blog posts?
3. **Personal Content**: What hobbies and personal content do you want to showcase?
4. **Game Projects**: Do you have game projects ready to showcase in the Workshop?
5. **Navigation**: Prefer top nav, side nav, or both?

---

## Next Steps

1. Review and refine this architecture
2. Decide on implementation priority
3. Create detailed designs for each realm
4. Begin Phase 1 implementation

---

*Last Updated: February 2026*
*Version: 1.0*
