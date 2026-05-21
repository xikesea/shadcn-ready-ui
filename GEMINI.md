# Project: shadcn/kit

Reference document for AI assistants working on this project.

## Overview

**shadcn/kit** is a Next.js 16.2.6 (App Router, Turbopack) project providing production-ready, highly customized UI components built on top of shadcn/ui and Base UI. Each component is interactive, fully responsive, and copy-paste ready.

## Tech Stack

- **Framework**: Next.js 16.2.6 (App Router, Turbopack)
- **UI Primitives**: @base-ui/react (NOT Radix UI)
- **Component Layer**: shadcn/ui
- **Styling**: Tailwind CSS 4 with OKLCH colors
- **Fonts**: Inter (body) + JetBrains Mono (code) via next/font/google
- **Tables**: @tanstack/react-table v8
- **Forms**: react-hook-form + zod
- **Animations**: framer-motion
- **Syntax Highlighting**: shiki (singleton pattern)
- **Icons**: lucide-react

## Implemented Components

### Data Table (`src/registry/components/responsive-table`)
- Full CRUD: add, edit, delete (single + bulk) with AlertDialog confirmation
- Columns: select, image, name, category, status, price, sales, actions
- Product images via picsum.photos seed URLs; image URL input in add/edit form
- Global search + status filter (Active/Draft/Archived)
- Three view modes: Table, Stacked (pure CSS), Grid (Card components)
- View mode dropdown on the right side next to Columns visibility dropdown
- Pagination: page size selector, first/prev/next/last buttons

### Multi-step Form (`src/registry/components/advanced-form`)
- 3 steps with animated transitions (framer-motion)
- Real-time Zod validation per step
- Progress bar using custom progress.tsx (Base UI)

### Auth Forms (`src/registry/components/sign-in`, `sign-up`)
- Clean card layouts with social login placeholder buttons

### Bulk Import Wizard (`src/registry/components/import-wizard`)
- 4-step CSV import: Upload → Column Mapping → Validation → Complete
- Auto-mapping, per-row error reporting

### File Manager (`src/registry/components/file-manager`)
- Folder navigation, grid/list views, breadcrumbs, metadata sidebar, search

### ACL Permission Tree (`src/registry/components/acl-manager`)
- Hierarchical permission tree with indeterminate checkbox states
- Role-based management

## UI Shell

- **Header**: Sticky, centered desktop nav, dark mode toggle, GitHub link
- **Mobile nav**: Sheet sidebar with categories
- **Footer**: SVG "table/desk" shape — two diagonal legs + horizontal top
- **Code viewer**: Shiki-powered syntax highlighting with copy-to-clipboard button

## Critical Patterns

### Base UI `render` prop (NOT `asChild`)
```tsx
// All trigger components use render prop
<DialogTrigger render={<Button>Open</Button>} />
<SheetTrigger render={<Button variant="ghost" size="icon"><Menu /></Button>} />
<DropdownMenuTrigger render={<Button variant="outline">Columns</Button>} />
```

### CSS Variables / Theming
- Colors: OKLCH values in `:root` and `.dark` blocks in `globals.css`
- Font vars: `--font-geist-sans` (Inter) and `--font-geist-mono` (JetBrains Mono)
- Mapped to Tailwind utilities in `@theme inline` block

### Shiki Singleton
```ts
// src/lib/shiki.ts — always use the singleton, never create per-request
const highlighter = await getHighlighter(); // cached singleton
```

## Commit Rules

- No `Co-Authored-By` AI attribution in commit messages
- One commit per task/feature — do not group unrelated changes
- Conventional prefixes: `feat:`, `fix:`, `refactor:`, `chore:`

## Known ESLint State

- Unused `_`-prefixed vars are allowed (configured in `eslint.config.mjs`)
- 3 informational warnings from TanStack/react-hook-form React Compiler compatibility — expected, non-blocking

## What NOT to do

- Do not use `asChild` on Base UI components
- Do not add emojis to project files
- Do not use index-based cell access in TanStack Table custom views — use column ID lookup
- Do not create a new Shiki highlighter per request
- Do not add `Co-Authored-By` to git commits

---
*Last updated: 2026-05-21*
