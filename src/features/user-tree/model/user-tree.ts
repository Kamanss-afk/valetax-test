export interface UserTreeItem {
  id: string;
  name: string;
  children?: UserTreeItem[];
}