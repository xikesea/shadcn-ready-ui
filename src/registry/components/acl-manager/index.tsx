"use client";

import React, { useState, useCallback } from "react";
import { PermissionNode, Role, permissionSchema, mockRoles } from "./schema";
import { 
  Shield, 
  Users, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Info, 
  Save, 
  RotateCcw,
  UserPlus,
  Lock,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// --- Components ---

interface TreeNodeProps {
  node: PermissionNode;
  permissions: Record<string, string[]>;
  onActionToggle: (nodeId: string, action: string) => void;
  onNodeToggle: (node: PermissionNode, checked: boolean) => void;
  depth?: number;
}

const PermissionTreeNode = ({ 
  node, 
  permissions, 
  onActionToggle, 
  onNodeToggle, 
  depth = 0 
}: TreeNodeProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const hasChildren = node.children && node.children.length > 0;
  const selectedActions = permissions[node.id] || [];
  
  // Calculate indeterminate state for folders
  const getFolderSelectionStatus = (n: PermissionNode): "checked" | "unchecked" | "indeterminate" => {
    if (n.actions) {
      const nodeActions = permissions[n.id] || [];
      const allSelected = n.actions.every(a => nodeActions.includes(a));
      const someSelected = n.actions.some(a => nodeActions.includes(a));
      if (allSelected) return "checked";
      if (someSelected) return "indeterminate";
      return "unchecked";
    }
    
    if (n.children) {
      const statuses = n.children.map(getFolderSelectionStatus);
      if (statuses.every(s => s === "checked")) return "checked";
      if (statuses.every(s => s === "unchecked")) return "unchecked";
      return "indeterminate";
    }
    
    return "unchecked";
  };

  const status = getFolderSelectionStatus(node);

  return (
    <div className="space-y-1">
      <div 
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50 group transition-colors",
          depth === 0 && "bg-muted/30 font-semibold"
        )}
        style={{ paddingLeft: `${depth * 1.5 + 0.75}rem` }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {hasChildren ? (
            <button onClick={() => setIsOpen(!isOpen)} className="text-muted-foreground">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ) : (
            <div className="w-4" />
          )}
          
          <Checkbox 
            id={node.id} 
            checked={status === "checked" ? true : status === "indeterminate" ? "indeterminate" : false}
            onCheckedChange={(checked) => onNodeToggle(node, !!checked)}
          />
          
          <label htmlFor={node.id} className="text-sm cursor-pointer truncate flex-1">
            {node.label}
          </label>
          
          {node.description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Info className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  }
                />
                <TooltipContent>
                  <p className="text-xs">{node.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {node.actions && (
          <div className="flex items-center gap-4">
            {node.actions.map(action => (
              <div key={action} className="flex items-center gap-1.5">
                <Checkbox 
                  id={`${node.id}-${action}`}
                  checked={selectedActions.includes(action)}
                  onCheckedChange={() => onActionToggle(node.id, action)}
                />
                <label 
                  htmlFor={`${node.id}-${action}`} 
                  className="text-xs text-muted-foreground capitalize cursor-pointer hover:text-foreground transition-colors"
                >
                  {action}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="animate-in slide-in-from-top-1 duration-200">
          {node.children!.map(child => (
            <PermissionTreeNode 
              key={child.id}
              node={child}
              permissions={permissions}
              onActionToggle={onActionToggle}
              onNodeToggle={onNodeToggle}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ACLManagerDemo() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRoleId, setSelectedRoleId] = useState<string>(mockRoles[0].id);
  const [searchQuery, setSearchQuery] = useState("");

  const activeRole = roles.find(r => r.id === selectedRoleId) || roles[0];

  const handleActionToggle = useCallback((nodeId: string, action: string) => {
    setRoles(prev => prev.map(r => {
      if (r.id !== selectedRoleId) return r;
      
      const currentActions = r.permissions[nodeId] || [];
      const newActions = currentActions.includes(action)
        ? currentActions.filter(a => a !== action)
        : [...currentActions, action];
        
      return {
        ...r,
        permissions: {
          ...r.permissions,
          [nodeId]: newActions
        }
      };
    }));
  }, [selectedRoleId]);

  const handleNodeToggle = useCallback((node: PermissionNode, checked: boolean) => {
    // Helper to get all descendant node IDs and their actions
    const getNodesWithActions = (n: PermissionNode): { id: string, actions: string[] }[] => {
      let result: { id: string, actions: string[] }[] = [];
      if (n.actions) {
        result.push({ id: n.id, actions: n.actions });
      }
      if (n.children) {
        n.children.forEach(c => {
          result = [...result, ...getNodesWithActions(c)];
        });
      }
      return result;
    };

    const nodesToUpdate = getNodesWithActions(node);

    setRoles(prev => prev.map(r => {
      if (r.id !== selectedRoleId) return r;
      
      const newPermissions = { ...r.permissions };
      
      nodesToUpdate.forEach(n => {
        if (checked) {
          newPermissions[n.id] = [...n.actions];
        } else {
          delete newPermissions[n.id];
        }
      });
      
      return { ...r, permissions: newPermissions };
    }));
  }, [selectedRoleId]);

  const handleSave = () => {
    toast.success(`Permissions for ${activeRole.name} updated successfully`);
  };

  const handleReset = () => {
    setRoles(mockRoles);
    toast.info("Permissions reset to defaults");
  };

  return (
    <div className="flex h-[700px] w-full border rounded-xl overflow-hidden bg-background shadow-lg">
      {/* Sidebar: Role List */}
      <aside className="w-72 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b bg-background/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Roles
            </h2>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search roles..." 
              className="pl-9 h-9 bg-background" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {roles.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())).map(role => (
              <div 
                key={role.id}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all border group",
                  selectedRoleId === role.id 
                    ? "bg-background border-primary shadow-sm" 
                    : "border-transparent hover:bg-background/50"
                )}
                onClick={() => setSelectedRoleId(role.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={cn("font-medium text-sm", selectedRoleId === role.id && "text-primary")}>
                    {role.name}
                  </span>
                  <DropdownMenuWrapper />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{role.description}</p>
                {role.id === "admin" && (
                  <Badge variant="secondary" className="mt-2 text-[10px] h-4 uppercase tracking-tighter">System Default</Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 bg-muted/50 border-t">
           <div className="flex items-center gap-3 text-xs text-muted-foreground bg-background p-3 rounded-lg border border-dashed">
              <Users className="h-4 w-4 shrink-0" />
              <p>Assign roles to users in the <b>User Directory</b> section.</p>
           </div>
        </div>
      </aside>

      {/* Main Area: Permission Tree */}
      <main className="flex-1 flex flex-col bg-background min-w-0">
        <header className="h-16 border-b px-6 flex items-center justify-between bg-background/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold truncate">Permissions: {activeRole.name}</h2>
            <p className="text-xs text-muted-foreground">Manage granular access control for this role</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button size="sm" onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <div className="p-6">
             <div className="mb-6 p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                   <h4 className="text-sm font-semibold">Security Note</h4>
                   <p className="text-xs text-muted-foreground">
                     Changes to permissions take effect immediately for all users assigned to this role. 
                     Inherited permissions from parent modules are automatically calculated.
                   </p>
                </div>
             </div>

             <div className="border rounded-xl bg-card overflow-hidden">
                <div className="grid grid-cols-[1fr,auto] px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/30 border-b">
                   <span>Module / Resource</span>
                   <span className="pr-4">Actions</span>
                </div>
                <div className="p-2 space-y-1">
                   {permissionSchema.map(node => (
                     <PermissionTreeNode 
                        key={node.id}
                        node={node}
                        permissions={activeRole.permissions}
                        onActionToggle={handleActionToggle}
                        onNodeToggle={handleNodeToggle}
                     />
                   ))}
                </div>
             </div>
          </div>
        </ScrollArea>

        <footer className="h-12 border-t px-6 flex items-center justify-between bg-muted/20 text-[11px] text-muted-foreground">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-sm border bg-background" /> Unchecked
              </span>
              <span className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-sm bg-primary" /> Full Access
              </span>
              <span className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-sm bg-primary flex items-center justify-center">
                    <div className="w-1.5 h-0.5 bg-background" />
                 </div> Partial Access
              </span>
           </div>
           <p>Last edited 3 days ago by <b>admin@example.com</b></p>
        </footer>
      </main>
    </div>
  );
}

const DropdownMenuWrapper = () => (
  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded">
    <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
  </button>
);
