# shadcn/kit — AI Agent Rules

## Framework Warning

This is **Next.js 16.2.6** with App Router and Turbopack. APIs and conventions differ significantly from what most models were trained on. Read `node_modules/next/dist/docs/` before writing any Next.js-specific code.

## Tech Stack

| Layer | Library | Notes |
|---|---|---|
| Framework | Next.js 16.2.6 | App Router, Turbopack, React 19 |
| UI Primitives | @base-ui/react | NOT Radix UI — different API |
| Component Layer | shadcn/ui | Wraps Base UI primitives |
| Styling | Tailwind CSS 4 | `@theme inline`, OKLCH colors |
| Tables | @tanstack/react-table v8 | |
| Forms | react-hook-form + zod | |
| Animations | framer-motion | |
| Syntax highlighting | shiki | Singleton pattern required |
| Icons | lucide-react | |
| Fonts | Inter + JetBrains_Mono | via next/font/google |

## Critical: Base UI API Differences

**Base UI uses a `render` prop, NOT `asChild`.** This is the most common mistake.

```tsx
// WRONG (Radix/old pattern)
<DialogTrigger asChild>
  <Button>Open</Button>
</DialogTrigger>

// CORRECT (Base UI pattern)
<DialogTrigger render={<Button>Open</Button>} />
// or
<DialogTrigger render={<Button />}>Open</DialogTrigger>
```

Applies to: `SheetTrigger`, `DialogTrigger`, `DropdownMenuTrigger`, `TooltipTrigger`, and all other trigger/slot components.

## CSS & Theming

- Colors use OKLCH: `oklch(0.205 0 0)` not hex/hsl
- Theme vars are in `src/app/globals.css` under `:root` and `.dark`
- The `@theme inline` block in globals.css maps CSS vars to Tailwind utility names
- Font CSS vars: `--font-geist-sans` (Inter) and `--font-geist-mono` (JetBrains Mono) — names kept for compatibility with shadcn presets
- **DO NOT** create circular CSS variable references like `--font-sans: var(--font-sans)`

## TypeScript Patterns

- `meta` prop on DataTable is typed as `Record<string, unknown>`, not `any`
- TanStack Table `onValueChange` returns `string | null` — guard with `val && ...` before casting
- Checkbox `checked` prop accepts `boolean | "indeterminate"` via custom interface in `checkbox.tsx`
- Prefer `unknown` over `any` for function parameters; narrow with `String(value)` or type guards

## Shiki Syntax Highlighting

- Uses a singleton highlighter — see `src/lib/shiki.ts`
- Always await the singleton; never create a new highlighter per request
- Languages: use `tsx` not `typescript` for better compatibility
- The highlighter is initialized once per server process

## Commit Conventions

- **No `Co-Authored-By: Claude` or any AI attribution** in commit messages — user preference, strictly enforced
- Commit each task separately — do not group unrelated changes
- Use conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `chore:`
- **Always ask the user before pushing to GitHub** — never run `git push` without explicit confirmation

## ESLint Config

- Unused vars with `_` prefix are allowed (rule configured in `eslint.config.mjs`)
- `test-shiki` files are in `globalIgnores`
- 3 known informational warnings from TanStack + react-hook-form React Compiler compatibility — these are expected and non-blocking

## Project Structure

```
src/
  app/                        # Next.js App Router
    layout.tsx                # Root layout: Inter + JetBrains_Mono fonts
    page.tsx                  # Main page: category routing + footer SVG
    globals.css               # Tailwind + CSS variable theme
  components/
    ui/                       # shadcn/ui primitives (Base UI wrappers)
    header.tsx                # Sticky header with nav + dark mode toggle
    component-display.tsx     # Code viewer with copy button (Shiki)
    mode-toggle.tsx           # Dark/light/system theme switcher
  registry/
    components/
      responsive-table/       # Full CRUD data table (3 view modes)
      advanced-form/          # 3-step multi-step form
      sign-in/ sign-up/       # Auth forms
      import-wizard/          # 4-step CSV import wizard
      file-manager/           # File browser with grid/list/sidebar
      acl-manager/            # Hierarchical permission tree
    schema.ts                 # Registry type definitions
  lib/
    shiki.ts                  # Singleton highlighter
    utils.ts                  # cn() and helpers
  hooks/
    use-mobile.ts             # Responsive breakpoint hook
```

## Component-Specific Notes

### responsive-table
- Grid view uses column-ID-based cell lookup (`visibleCells.find(c => c.column.id === id)`) — **not index-based**
- Columns: select, image, name, category, status, price, sales, actions
- Image column uses `<img>` (not `next/image`) with picsum.photos seed URLs
- View mode dropdown (Table/Stacked/Grid) is on the **right side** next to Columns dropdown

### component-display (code viewer)
- Has a copy-to-clipboard button (top-right of code panel)
- `FileWithHtml` interface requires a `content: string` field (raw source for copying)
- Copy state resets after 2 seconds

### footer (page.tsx)
- SVG "table/desk" shape: two diagonal lines + one horizontal line
- Uses `vector-effect="non-scaling-stroke"` for consistent stroke width at any viewport
- Horizontal line strokeWidth=1.8, diagonals strokeWidth=1 (compensates for anti-aliasing)

### checkbox.tsx
- Custom `CheckboxProps` interface overrides `checked` to accept `boolean | "indeterminate"`
- Needed for ACL tree indeterminate state support

### progress.tsx
- Uses `@base-ui/react/progress` — custom implementation, not a shadcn default
- Required by import-wizard

## What NOT to do

- Do not use `asChild` on Base UI trigger components
- Do not add emojis to any project files
- Do not add `Co-Authored-By` attribution to commits
- Do not create circular CSS variable references
- Do not use index-based cell access in TanStack Table grid views
- Do not create a new Shiki highlighter per request
