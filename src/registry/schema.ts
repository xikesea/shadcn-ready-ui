export type RegistryFile = {
  name: string;
  content: string;
  language: string;
};

export type ComponentEntry = {
  id: string;
  title: string;
  description: string;
  category: "table" | "form" | "auth" | "import" | "file-manager" | "acl";
  files: RegistryFile[];
  demo: React.ReactNode;
};
