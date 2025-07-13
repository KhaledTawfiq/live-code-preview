export interface FileNode {
  name: string;
  type: "file";
  contents: string;
  fullPath: string;
}

export interface FolderNode {
  name: string;
  type: "folder";
}

export type ProjectNode = FileNode | FolderNode;

export interface AppFiles {
  [key: string]: ProjectNode;
}

export interface ProjectData {
  appFiles: AppFiles;
}
