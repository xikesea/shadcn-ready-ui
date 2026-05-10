# Project: shadcn/kit

This document serves as a handover and reference for the current state of the project.

## 🚀 Overview
**shadcn/kit** is a Next.js 15+ (Turbopack) project designed to provide highly customized, production-ready components built on top of `shadcn/ui` and `Base UI`.

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (radix-ui / base-ui)
- **Data Fetching**: Server Components & Client Hooks
- **Form Management**: React Hook Form + Zod
- **Tables**: TanStack Table (@tanstack/react-table)
- **Highlighter**: Shiki
- **Icons**: Lucide React + Inline SVGs

## ✨ Implemented Features

### 1. Advanced Data Table (Digital Product Management)
- **Location**: `src/registry/components/responsive-table`
- **Features**:
  - Full CRUD operations (Mocked on Client).
  - Bulk selection and multi-delete with `AlertDialog` confirmation.
  - Global Search and Status Filtering (Active/Draft/Archived).
  - Advanced Pagination: Page size selector, "Page X of Y", First/Last page buttons.
  - **Triple Responsive View**: Toggle between Table (Standard), Stacked (Pure CSS cards), and Grid (React Card components) via a dropdown.
  - SSR Integration Guide included in the component.

### 2. Multi-step Forms
- **Location**: `src/registry/components/advanced-form`
- **Features**:
  - 3-step navigation with progress bar.
  - Real-time validation using Zod.
  - Smooth transitions powered by `framer-motion`.

### 3. Authentication Forms
- **Location**: `src/registry/components/sign-in` & `src/registry/components/sign-up`
- **Features**:
  - Separated clean components for Login and Registration.
  - Social login buttons and sleek card layouts.

### 4. Global Navigation & UI
- **Header**: Sticky, centered menu on desktop, GitHub icon and Dark Mode toggle always visible.
- **Mobile Menu**: Polished Sidebar (Sheet) with Brand logo and organized categories.
- **Theme Support**: Full Dark/Light/System mode integration via `next-themes`.

## 🔧 Critical Fixes & Technical Context
- **React 19 / Next 15 Compatibility**: 
  - Using `render` prop for `SheetTrigger`, `DialogTrigger`, and `DropdownMenuTrigger` to comply with Base UI requirements instead of `asChild`.
  - Added `suppressHydrationWarning` to `html` and `body` tags in `layout.tsx`.
  - Wrapped `dangerouslySetInnerHTML` sections in a `mounted` check to prevent hydration mismatches.
- **Shiki Parsing**:
  - Added `try...catch` and raw-text fallback for Shiki highlighting to prevent server 500 crashes on complex TSX patterns.
  - Fixed a specific Shiki crash caused by unescaped apostrophes in text content.

## 📋 Potential Next Steps
1. **Real SSR Implementation**: Transition the Data Table to use URL Search Params and Server Actions.
2. **Dashboard Layout**: Re-add and polish the Dashboard Shell (removed in recent cleanup).
3. **Landing Page Template**: Create a full landing page using the previous sections.
4. **Form Library Extension**: Add more complex form fields like date pickers or file uploaders.

---
*Last updated by Gemini CLI on 2026-05-10*
