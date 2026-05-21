# Project: shadcn/kit

This document serves as a handover and reference for the current state of the project.

## Overview
**shadcn/kit** is a Next.js 15+ (Turbopack) project designed to provide highly customized, production-ready components built on top of `shadcn/ui` and `Base UI`.

## Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (radix-ui / base-ui)
- **Data Fetching**: Server Components & Client Hooks
- **Form Management**: React Hook Form + Zod
- **Tables**: TanStack Table (@tanstack/react-table)
- **Highlighter**: Shiki
- **Icons**: Lucide React + Inline SVGs

## Implemented Features

### 1. Complex UI Components (Premium Kit)
- **File Manager / Media Library**: 
  - Location: `src/registry/components/file-manager`
  - Features: Folder navigation, Grid/List view, Breadcrumbs, Metadata sidebar, Selection mode.
- **ACL Tree-based Permissions**:
  - Location: `src/registry/components/acl-manager`
  - Features: Hierarchical permission tree, Indeterminate state logic, Role-based management.
- **Bulk Data Import Wizard**:
  - Location: `src/registry/components/import-wizard`
  - Features: 4-step workflow (Upload, Mapping, Validation, Completion), auto-mapping, and granular error reporting.

### 2. Advanced Data Table (Digital Product Management)
- **Location**: `src/registry/components/responsive-table`
- **Features**:
  - Full CRUD operations (Mocked on Client).
  - Bulk selection and multi-delete with `AlertDialog` confirmation.
  - Global Search and Status Filtering (Active/Draft/Archived).
  - Advanced Pagination: Page size selector, "Page X of Y", First/Last page buttons.
  - **Triple Responsive View**: Toggle between Table (Standard), Stacked (Pure CSS cards), and Grid (React Card components) via a dropdown.
  - SSR Integration Guide included in the component.

### 3. Multi-step Forms
- **Location**: `src/registry/components/advanced-form`
- **Features**:
  - 3-step navigation with progress bar.
  - Real-time validation using Zod.
  - Smooth transitions powered by `framer-motion`.

### 4. Authentication Forms
- **Location**: `src/registry/components/sign-in` & `src/registry/components/sign-up`
- **Features**:
  - Separated clean components for Login and Registration.
  - Social login buttons and sleek card layouts.

### 5. Global Navigation & UI
- **Header**: Sticky, centered menu on desktop, GitHub icon and Dark Mode toggle always visible.
- **Mobile Menu**: Polished Sidebar (Sheet) with Brand logo and organized categories.
- **Theme Support**: Full Dark/Light/System mode integration via `next-themes`.

## Critical Fixes & Technical Context
- **React 19 / Next 15 Compatibility**: 
  - Using `render` prop for `SheetTrigger`, `DialogTrigger`, and `DropdownMenuTrigger` to comply with Base UI requirements instead of `asChild`.
  - Added `suppressHydrationWarning` to `html` and `body` tags in `layout.tsx`.
- **Shiki Optimization**:
  - **Singleton Highlighter**: Implemented a global singleton for Shiki to prevent race conditions during concurrent fetching.
  - **Language Fallback**: Added a mechanism to try `tsx` if `typescript` highlighting fails, resolving complex regex errors.
  - **Registry Mapping**: Standardized file definitions to use `tsx` for better Shiki compatibility.

## Potential Next Steps
1. **Dashboard Shell**: Create a complete administrative layout using existing Sidebar components.
2. **Real SSR Implementation**: Transition the Data Table to use URL Search Params and Server Actions.
3. **Advanced Query Builder**: Implement a Notion-like query builder with nested AND/OR logic.
4. **Visual Workflow Builder**: Create a node-based UI for process automation.

---
*Last updated by Gemini CLI on 2026-05-11*
