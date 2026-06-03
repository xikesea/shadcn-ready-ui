# Shadcn Ready UI

Production-ready UI components built on top of [shadcn/ui](https://ui.shadcn.com) and [Base UI](https://base-ui.com), designed for real-world applications.

**Live demo:** [shadcn-ready-ui.vercel.app](https://shadcn-ready-ui.vercel.app)

## Overview

Shadcn Ready UI is a component showcase providing highly customized, complex UI patterns that go beyond the standard shadcn/ui primitives. Each component is interactive, fully responsive, and ready to copy into your project.

## Components

| Component | Category | Description |
|-----------|----------|-------------|
| Data Table | Tables | Full CRUD table with sorting, filtering, pagination, bulk actions, and three responsive view modes (Table / Stacked / Grid) |
| Multi-step Form | Forms | 3-step wizard with Zod validation and animated transitions |
| Sign In / Sign Up | Auth | Clean authentication forms with social login layout |
| Bulk Import Wizard | Import | 4-step CSV import flow with column mapping and row validation |
| File Manager | File Manager | Folder navigation, grid/list views, metadata sidebar, and search |
| ACL Permission Tree | ACL Tree | Hierarchical permission tree with indeterminate checkbox states and role management |

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: shadcn/ui + Base UI
- **Styling**: Tailwind CSS 4
- **Tables**: TanStack Table
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Syntax highlighting**: Shiki
- **Icons**: Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Production build
npm run lint     # Run ESLint
```

## Project Structure

```
src/
  app/
    page.tsx            # Home route (Tables)
    [category]/         # Dynamic routes: /form /auth /import /file-manager /acl
    layout.tsx
    globals.css
  components/           # Shared UI components (header, code viewer, etc.)
    ui/                 # Base shadcn/ui primitives
  registry/             # Component demos and registry
    components/         # Each component in its own folder
  hooks/                # Custom React hooks
  lib/                  # Utilities
```
