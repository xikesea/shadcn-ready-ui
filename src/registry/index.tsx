import React from "react";
import { ComponentEntry } from "./schema";
import ResponsiveTableDemo from "./components/responsive-table";
import AdvancedFormDemo from "./components/advanced-form";
import SignInForm from "./components/sign-in";
import SignUpForm from "./components/sign-up";
import FileManagerDemo from "./components/file-manager";
import ACLManagerDemo from "./components/acl-manager";
import { BulkImportDemo } from "./components/import-wizard/index";

export const registry: ComponentEntry[] = [
  {
    id: "responsive-table",
    title: "Data Table (Product Management)",
    description: "A full-featured data table using @tanstack/react-table with sorting, filtering, pagination, bulk actions, and CRUD dialogs.",
    category: "table",
    demo: <ResponsiveTableDemo />,
    files: [
      { name: "index.tsx", language: "tsx", content: "" },
      { name: "data-table.tsx", language: "tsx", content: "" },
      { name: "columns.tsx", language: "tsx", content: "" }
    ]
  },
  {
    id: "advanced-form",
    title: "Multi-step Form with Validation",
    description: "A complex form with multiple steps, progress indicator, and Zod validation.",
    category: "form",
    demo: <AdvancedFormDemo />,
    files: [
      { name: "index.tsx", language: "tsx", content: "" },
      { name: "multi-step-form.tsx", language: "tsx", content: "" },
      { name: "schema.ts", language: "tsx", content: "" }
    ]
  },
  {
    id: "sign-in",
    title: "Sign In Form",
    description: "A beautifully designed Sign In form with social login options.",
    category: "auth",
    demo: <SignInForm />,
    files: [
      { name: "index.tsx", language: "tsx", content: "" }
    ]
  },
  {
    id: "sign-up",
    title: "Sign Up Form",
    description: "A complete Sign Up form with password confirmation.",
    category: "auth",
    demo: <SignUpForm />,
    files: [
      { name: "index.tsx", language: "tsx", content: "" }
    ]
  },
  {
    id: "import-wizard",
    title: "Bulk Data Import Wizard",
    description: "A professional 4-step wizard for uploading CSV/Excel data, mapping columns, and validating records before import.",
    category: "import",
    demo: <BulkImportDemo />,
    files: [
      { name: "index.tsx", language: "tsx", content: "" },
      { name: "schema.ts", language: "tsx", content: "" }
    ]
  },
  {
    id: "file-manager",
    title: "File Manager & Media Library",
    description: "A professional-grade file management system with folder navigation, grid/list views, and file metadata inspection.",
    category: "file-manager",
    demo: <FileManagerDemo />,
    files: [
      { name: "index.tsx", language: "tsx", content: "" },
      { name: "types.ts", language: "tsx", content: "" },
      { name: "mock-data.ts", language: "tsx", content: "" }
    ]
  },
  {
    id: "acl-manager",
    title: "ACL Tree Permissions",
    description: "A granular access control system with a hierarchical tree structure and indeterminate checkbox logic.",
    category: "acl",
    demo: <ACLManagerDemo />,
    files: [
      { name: "index.tsx", language: "tsx", content: "" },
      { name: "schema.ts", language: "tsx", content: "" }
    ]
  }
];
