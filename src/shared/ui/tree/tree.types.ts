export type TreeItemId = string;

export interface TreeItemData {
  id: TreeItemId;
  name: string;
  children?: TreeItemData[];
}

export type TreeItemRenderFunction = ({
  item,
  isRoot,
  isSelected,
  isExpanded,
}: {
  item: TreeItemData;
  isRoot: boolean;
  isSelected: boolean;
  isExpanded: boolean;
}) => React.ReactNode;