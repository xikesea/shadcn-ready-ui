export const CATEGORIES = [
  {
    id: "table",
    label: "Tables",
    href: "/",
    title: "Data Tables",
    description: "Advanced data tables with sorting, filtering, pagination, and CRUD dialogs.",
  },
  {
    id: "form",
    label: "Forms",
    href: "/form",
    title: "Forms",
    description: "Multi-step forms with validation, progress indicators, and Zod schemas.",
  },
  {
    id: "auth",
    label: "Auth",
    href: "/auth",
    title: "Auth Forms",
    description: "Sign in and sign up forms with social login options.",
  },
  {
    id: "import",
    label: "Import",
    href: "/import",
    title: "Import Wizard",
    description: "4-step bulk data import wizard with CSV upload, column mapping, and validation.",
  },
  {
    id: "file-manager",
    label: "File Manager",
    href: "/file-manager",
    title: "File Manager",
    description: "Professional file management system with folder navigation and grid/list views.",
  },
  {
    id: "acl",
    label: "ACL Tree",
    href: "/acl",
    title: "ACL Tree",
    description: "Granular access control with hierarchical tree structure and indeterminate checkboxes.",
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
