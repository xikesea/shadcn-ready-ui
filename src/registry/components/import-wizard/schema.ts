export interface ImportField {
  key: string;
  label: string;
  required?: boolean;
  description?: string;
  type: "string" | "number" | "email" | "date";
}

export interface RawRow {
  [key: string]: string;
}

export interface MappedRow {
  [key: string]: string | number | boolean | null | undefined;
}

export interface ValidationError {
  row: number;
  field: string;
  message: string;
}

export const targetFields: ImportField[] = [
  { key: "full_name", label: "Full Name", required: true, type: "string", description: "First and last name" },
  { key: "email", label: "Email Address", required: true, type: "email" },
  { key: "phone", label: "Phone Number", type: "string" },
  { key: "role", label: "User Role", type: "string", description: "Admin, Editor, or Viewer" },
  { key: "joined_at", label: "Join Date", type: "date" },
  { key: "salary", label: "Annual Salary", type: "number" },
];

export const mockCsvData = `Name,Email,Phone,Position,Date,Income
John Doe,john@example.com,123-456-7890,Admin,2024-01-15,85000
Jane Smith,jane.smith@org,555-0199,Editor,2023-11-20,invalid_num
Bob Wilson,bob-at-work.com,,Viewer,03/25/2024,60000
Alice Brown,alice@company.com,999-888-7777,Admin,,95000
Invalid Row,,000-000,Guest,2022-05-10,50000`;
