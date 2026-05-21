"use client";

import React, { useState, useMemo } from "react";
import { FileType } from "./types";
import { mockFiles } from "./mock-data";
import { 
  Folder, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  FileArchive, 
  File as FileIcon,
  Search,
  LayoutGrid,
  List,
  MoreVertical,
  ChevronRight,
  Clock,
  Star,
  Trash2,
  HardDrive,
  Plus,
  ArrowUpCircle,
  Download,
  Trash,
  Share2,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// --- Components ---

const FileIconComponent = ({ type, thumbnail, className }: { type: FileType; thumbnail?: string; className?: string }) => {
  if (thumbnail) return <img src={thumbnail} alt="Thumbnail" className={cn("object-cover rounded", className)} />;
  
  switch (type) {
    case "folder": return <Folder className={cn("text-blue-500 fill-blue-500/20", className)} />;
    case "image": return <ImageIcon className={cn("text-purple-500", className)} />;
    case "video": return <Video className={cn("text-red-500", className)} />;
    case "audio": return <Music className={cn("text-pink-500", className)} />;
    case "pdf": return <FileText className={cn("text-orange-500", className)} />;
    case "archive": return <FileArchive className={cn("text-yellow-600", className)} />;
    default: return <FileIcon className={cn("text-gray-500", className)} />;
  }
};

const formatSize = (bytes?: number) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default function FileManagerDemo() {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter logic
  const filteredFiles = useMemo(() => {
    let files = mockFiles.filter(f => f.parentId === currentFolderId);
    if (searchQuery) {
      files = mockFiles.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return files;
  }, [currentFolderId, searchQuery]);

  const selectedFile = useMemo(() => 
    mockFiles.find(f => f.id === selectedFileId), [selectedFileId]
  );

  const breadcrumbs = useMemo(() => {
    const path = [];
    let currentId = currentFolderId;
    while (currentId) {
      const folder = mockFiles.find(f => f.id === currentId);
      if (folder) {
        path.unshift(folder);
        currentId = folder.parentId;
      } else {
        break;
      }
    }
    return path;
  }, [currentFolderId]);

  return (
    <div className="flex h-[700px] w-full border rounded-xl overflow-hidden bg-background shadow-lg">
      {/* Left Sidebar */}
      <aside className="w-64 border-r bg-muted/30 flex flex-col">
        <div className="p-4">
          <Button className="w-full justify-start gap-2 shadow-sm" size="lg">
            <Plus className="h-4 w-4" />
            New Upload
          </Button>
        </div>
        
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1">
            <Button 
              variant={currentFolderId === null && !searchQuery ? "secondary" : "ghost"} 
              className="w-full justify-start gap-3"
              onClick={() => { setCurrentFolderId(null); setSearchQuery(""); }}
            >
              <HardDrive className="h-4 w-4" />
              All Files
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Clock className="h-4 w-4" />
              Recent
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Star className="h-4 w-4" />
              Favorites
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Trash2 className="h-4 w-4" />
              Trash
            </Button>
          </div>

          <Separator className="my-4" />
          
          <div className="px-3 py-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Labels</h4>
            <div className="space-y-1">
              {["Work", "Personal", "Design", "Invoices"].map(label => (
                <div key={label} className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-muted rounded-md cursor-pointer group">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    label === "Work" ? "bg-blue-500" : 
                    label === "Personal" ? "bg-green-500" :
                    label === "Design" ? "bg-purple-500" : "bg-orange-500"
                  )} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="px-3 py-2">
             <div className="flex justify-between items-center mb-2">
               <span className="text-xs font-medium">Storage</span>
               <span className="text-xs text-muted-foreground">75% used</span>
             </div>
             <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
               <div className="h-full bg-primary w-[75%]" />
             </div>
             <p className="text-[10px] text-muted-foreground mt-2">12.4 GB of 15 GB used</p>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-background min-w-0">
        {/* Toolbar */}
        <header className="h-16 border-b px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
             <Button 
               variant="ghost" 
               size="sm" 
               className="text-muted-foreground hover:text-foreground"
               onClick={() => setCurrentFolderId(null)}
             >
               Files
             </Button>
             {breadcrumbs.map((crumb) => (
               <React.Fragment key={crumb.id}>
                 <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                 <Button 
                   variant="ghost" 
                   size="sm" 
                   className="min-w-0 truncate text-muted-foreground hover:text-foreground"
                   onClick={() => setCurrentFolderId(crumb.id)}
                 >
                   {crumb.name}
                 </Button>
               </React.Fragment>
             ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search files..." 
                className="pl-9 bg-muted/50 border-none h-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex border rounded-md overflow-hidden bg-muted/50 p-0.5">
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className={cn("h-7 w-7", viewMode === "grid" && "bg-background shadow-sm")}
                 onClick={() => setViewMode("grid")}
               >
                 <LayoutGrid className="h-4 w-4" />
               </Button>
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className={cn("h-7 w-7", viewMode === "list" && "bg-background shadow-sm")}
                 onClick={() => setViewMode("list")}
               >
                 <List className="h-4 w-4" />
               </Button>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("h-9 w-9", isSidebarOpen && "bg-muted")}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* File List/Grid */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredFiles.map((file) => (
                  <div 
                    key={file.id}
                    className={cn(
                      "group relative border rounded-xl p-3 hover:shadow-md transition-all cursor-pointer select-none",
                      selectedFileId === file.id ? "ring-2 ring-primary bg-primary/5 border-primary/20" : "bg-card hover:border-primary/30"
                    )}
                    onClick={() => setSelectedFileId(file.id)}
                    onDoubleClick={() => file.type === "folder" && setCurrentFolderId(file.id)}
                  >
                    <div className="aspect-square flex items-center justify-center mb-3 bg-muted/40 rounded-lg overflow-hidden relative">
                      <FileIconComponent type={file.type} thumbnail={file.thumbnail} className="h-12 w-12" />
                      {file.isFavorite && (
                        <div className="absolute top-2 right-2 text-yellow-500 fill-yellow-500">
                           <Star className="h-3 w-3 fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium truncate pr-4">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {file.type === "folder" ? "Folder" : formatSize(file.size)}
                      </p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute bottom-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2"><Download className="h-4 w-4" /> Download</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Share2 className="h-4 w-4" /> Share</DropdownMenuItem>
                        <Separator className="my-1" />
                        <DropdownMenuItem className="gap-2 text-destructive"><Trash className="h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-lg divide-y bg-card">
                <div className="grid grid-cols-12 px-4 py-2 text-xs font-medium text-muted-foreground bg-muted/30">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-3">Last Modified</div>
                  <div className="col-span-1"></div>
                </div>
                {filteredFiles.map((file) => (
                  <div 
                    key={file.id}
                    className={cn(
                      "grid grid-cols-12 px-4 py-3 text-sm items-center hover:bg-muted/50 cursor-pointer transition-colors",
                      selectedFileId === file.id && "bg-primary/5"
                    )}
                    onClick={() => setSelectedFileId(file.id)}
                    onDoubleClick={() => file.type === "folder" && setCurrentFolderId(file.id)}
                  >
                    <div className="col-span-6 flex items-center gap-3 min-w-0">
                      <FileIconComponent type={file.type} thumbnail={file.thumbnail} className="h-5 w-5 shrink-0" />
                      <span className="truncate font-medium">{file.name}</span>
                    </div>
                    <div className="col-span-2 text-muted-foreground">
                      {file.type === "folder" ? "--" : formatSize(file.size)}
                    </div>
                    <div className="col-span-3 text-muted-foreground">
                      {new Date(file.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="col-span-1 flex justify-end">
                       <MoreVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredFiles.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <FileIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No files found</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mt-2">
                  This folder is empty or matches no search results. Upload some files to get started.
                </p>
                <Button variant="outline" className="mt-6 gap-2">
                  <ArrowUpCircle className="h-4 w-4" />
                  Upload Now
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </main>

      {/* Right Details Sidebar */}
      {isSidebarOpen && (
        <aside className="w-72 border-l bg-card flex flex-col animate-in slide-in-from-right duration-300">
          {selectedFile ? (
            <>
              <div className="p-6 border-b text-center">
                 <div className="w-full aspect-video bg-muted/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden border">
                    <FileIconComponent type={selectedFile.type} thumbnail={selectedFile.thumbnail} className="h-16 w-16" />
                 </div>
                 <h3 className="font-bold truncate" title={selectedFile.name}>{selectedFile.name}</h3>
                 <p className="text-xs text-muted-foreground uppercase mt-1">{selectedFile.type}</p>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="p-6 space-y-6">
                   <div className="space-y-4">
                      <h4 className="text-sm font-semibold">Properties</h4>
                      <div className="space-y-3">
                         <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Size</span>
                            <span>{selectedFile.type === "folder" ? "--" : formatSize(selectedFile.size)}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Owner</span>
                            <span>{selectedFile.owner}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Modified</span>
                            <span>{new Date(selectedFile.updatedAt).toLocaleString()}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Location</span>
                            <span className="truncate ml-4 italic">/Root{breadcrumbs.map(b => `/${b.name}`).join("")}</span>
                         </div>
                      </div>
                   </div>

                   <Separator />

                   <div className="space-y-4">
                      <h4 className="text-sm font-semibold">Recent Activity</h4>
                      <div className="space-y-4">
                         {[
                           { action: "Renamed", date: "2 hours ago", user: "You" },
                           { action: "Uploaded", date: "Yesterday", user: "System" }
                         ].map((activity, i) => (
                           <div key={i} className="flex gap-3 text-sm">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                 {activity.user[0]}
                              </div>
                              <div>
                                 <p className="font-medium">{activity.action}</p>
                                 <p className="text-xs text-muted-foreground">{activity.date} by {activity.user}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </ScrollArea>
              
              <div className="p-6 border-t bg-muted/20 grid grid-cols-2 gap-3">
                 <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Download</Button>
                 <Button variant="outline" className="gap-2"><Share2 className="h-4 w-4" /> Share</Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
               <Info className="h-12 w-12 mb-4 opacity-20" />
               <p className="text-sm">Select a file or folder to view details and activity.</p>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
