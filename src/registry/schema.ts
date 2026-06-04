import type { CategoryId } from "@/lib/categories";

export type RegistryFile = {
  name: string;
  content: string;
  language: string;
};

export type ComponentEntry = {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  files: RegistryFile[];
  demo: React.ReactNode;
};
