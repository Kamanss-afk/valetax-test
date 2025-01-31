import styles from './tree.module.css';
import { useTreeState } from './tree-context';
import { TreeItemData, TreeItemRenderFunction } from './tree.types';
import { PropsWithChildren } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const TreeItem = ({
  item,
  renderItem,
  children,
}: PropsWithChildren<{
  item: TreeItemData;
  renderItem: TreeItemRenderFunction;
}>) => {
  const {
    items,
    selectedItems,
    expandedItems,
    toggleSelectedItems,
    toggleExpandedItems,
  } = useTreeState();
  
  const isExpandable = Boolean(item.children?.length);
  const isExpanded = expandedItems.includes(item.id);
  const isSelected = selectedItems.includes(item.id);
  const isRoot = items[0].id === item.id;

  const handleItemClick = () => {
    if(!isSelected) {
      toggleSelectedItems(item.id);
    }

    if(isExpandable) {
      toggleExpandedItems(item.id);
    }
  };

  const renderChildren = () => {
    if(isExpandable && isExpanded) {
      return(
        <ul className={styles.list}>
          {children}
        </ul>
      );
    }

    return null;
  };

  const renderIcon = () => {
    if(!isExpandable) return null;

    if(isExpanded) {
      return <ExpandMoreIcon fontSize='small' />;
    } else {
      return <ChevronRightIcon fontSize='small' />;
    }
  };

  return(
    <li>
      <div className={styles.content} onClick={handleItemClick}>
        <div className={styles.icon}>
          {renderIcon()}
        </div> 
        {
          renderItem({
            item,
            isRoot,
            isExpanded,
            isSelected,
          })
        }
      </div>

      {renderChildren()}
    </li>
  );
};