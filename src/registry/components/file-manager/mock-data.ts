import { FileItem } from "./types";

export const mockFiles: FileItem[] = [
  // Root Folders
  { id: "f-1", name: "Projects", type: "folder", updatedAt: "2024-03-10T10:00:00Z", parentId: null, owner: "Me" },
  { id: "f-2", name: "Assets", type: "folder", updatedAt: "2024-03-09T15:30:00Z", parentId: null, owner: "Me" },
  { id: "f-3", name: "Documents", type: "folder", updatedAt: "2024-03-08T09:15:00Z", parentId: null, owner: "Me" },
  
  // Root Files
  { id: "1", name: "branding-guidelines.pdf", type: "pdf", size: 2500000, updatedAt: "2024-03-11T14:20:00Z", parentId: null, owner: "Me", isFavorite: true },
  { id: "2", name: "hero-banner.jpg", type: "image", size: 1200000, updatedAt: "2024-03-11T12:00:00Z", parentId: null, owner: "Me", thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop" },
  
  // Project Folder Content
  { id: "f-1-1", name: "Website Redesign", type: "folder", updatedAt: "2024-03-10T11:00:00Z", parentId: "f-1", owner: "Me" },
  { id: "3", name: "sitemap.xmind", type: "document", size: 450000, updatedAt: "2024-03-10T10:30:00Z", parentId: "f-1", owner: "Admin" },
  
  // Assets Folder Content
  { id: "4", name: "logo-dark.svg", type: "image", size: 15000, updatedAt: "2024-03-09T16:00:00Z", parentId: "f-2", owner: "Designer" },
  { id: "5", name: "intro-video.mp4", type: "video", size: 45000000, updatedAt: "2024-03-09T17:45:00Z", parentId: "f-2", owner: "Editor" },
  { id: "6", name: "background-music.mp3", type: "audio", size: 8000000, updatedAt: "2024-03-09T18:00:00Z", parentId: "f-2", owner: "Me" },
  
  // Documents Folder Content
  { id: "7", name: "q1-report.docx", type: "document", size: 1200000, updatedAt: "2024-03-08T10:00:00Z", parentId: "f-3", owner: "Manager" },
  { id: "8", name: "backup-data.zip", type: "archive", size: 150000000, updatedAt: "2024-03-07T22:00:00Z", parentId: "f-3", owner: "System" },
];
