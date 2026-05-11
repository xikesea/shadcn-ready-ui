export interface PermissionNode {
  id: string;
  label: string;
  description?: string;
  children?: PermissionNode[];
  actions?: string[]; // e.g., ["view", "create", "edit", "delete"]
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, string[]>; // nodeId -> actions[]
}

export const permissionSchema: PermissionNode[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Access to main analytics and overview",
    actions: ["view", "export"]
  },
  {
    id: "user_management",
    label: "User Management",
    children: [
      {
        id: "users",
        label: "Users List",
        actions: ["view", "create", "edit", "delete", "impersonate"]
      },
      {
        id: "roles",
        label: "Roles & Permissions",
        actions: ["view", "manage"]
      }
    ]
  },
  {
    id: "content",
    label: "Content Management",
    children: [
      {
        id: "blog",
        label: "Blog Posts",
        actions: ["view", "create", "edit", "delete", "publish"]
      },
      {
        id: "media",
        label: "Media Library",
        actions: ["view", "upload", "delete"]
      }
    ]
  },
  {
    id: "settings",
    label: "Settings",
    children: [
      {
        id: "general",
        label: "General Settings",
        actions: ["view", "edit"]
      },
      {
        id: "api",
        label: "API Configuration",
        actions: ["view", "manage_keys"]
      }
    ]
  }
];

export const mockRoles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full access to all system features",
    permissions: {
      "dashboard": ["view", "export"],
      "users": ["view", "create", "edit", "delete", "impersonate"],
      "roles": ["view", "manage"],
      "blog": ["view", "create", "edit", "delete", "publish"],
      "media": ["view", "upload", "delete"],
      "general": ["view", "edit"],
      "api": ["view", "manage_keys"]
    }
  },
  {
    id: "editor",
    name: "Content Editor",
    description: "Can manage blog posts and media",
    permissions: {
      "dashboard": ["view"],
      "blog": ["view", "create", "edit", "publish"],
      "media": ["view", "upload"]
    }
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to specific areas",
    permissions: {
      "dashboard": ["view"],
      "blog": ["view"]
    }
  }
];
