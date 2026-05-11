export type FileType = "image" | "video" | "audio" | "pdf" | "document" | "archive" | "folder";

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size?: number; // in bytes
  updatedAt: string;
  parentId: string | null;
  url?: string;
  thumbnail?: string;
  owner: string;
  isFavorite?: boolean;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  updatedAt: string;
}
