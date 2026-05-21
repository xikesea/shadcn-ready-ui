export type RegistryFile = {
  name: string;
  content: string;
  language: string;
};

export type ComponentEntry = {
  id: string;
  title: string;
  description: string;
  category: "table" | "form" | "dashboard" | "other" | "import" | "file-manager" | "acl";
  files: RegistryFile[];
  demo: React.ReactNode;
};
