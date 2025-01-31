import { TreeContextProvider } from './tree-context';
import { TreeItem } from './tree-item';
import { TreeItemData, TreeItemRenderFunction } from './tree.types';
import styles from './tree.module.css';

interface Props {
  items: TreeItemData[];
  renderItem: TreeItemRenderFunction;
}

export const Tree = ({ items, renderItem }: Props) => {
  const renderTree = (item: TreeItemData) => {
    return(
      <TreeItem
        key={item.id}
        item={item}
        renderItem={renderItem}
      >
        {item.children?.map(renderTree)}
      </TreeItem>
    );
  };

  return(
    <TreeContextProvider items={items}>
      <ul className={styles.tree}>
        {items.map(renderTree)}
      </ul>
    </TreeContextProvider>
  );
};