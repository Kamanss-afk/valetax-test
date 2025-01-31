import { createContext, useContext, useState, PropsWithChildren, useMemo } from 'react';
import { TreeItemData, TreeItemId } from './tree.types';

interface TreeContextProps {
  items: TreeItemData[];
  selectedItems: TreeItemId[];
  expandedItems: TreeItemId[];
  toggleSelectedItems: (itemId: TreeItemId) => void;
  toggleExpandedItems: (itemId: TreeItemId) => void;
}

export const TreeContext = createContext<TreeContextProps>({
  items: [],
  selectedItems: [],
  expandedItems: [],
  toggleSelectedItems: () => {},
  toggleExpandedItems: () => {},
});

export const TreeContextProvider = ({
  items,
  children,
}: PropsWithChildren<{ items: TreeItemData[] }>) => {
  const [selectedItems, setSelectedItems] = useState<TreeItemId[]>([]);
  const [expandedItems, setExpandedItems] = useState<TreeItemId[]>([]);

  const toggleSelectedItems = (itemId: TreeItemId) => {
    setSelectedItems(() => [itemId]);
  };

  const toggleExpandedItems = (itemId: TreeItemId) => {
    setExpandedItems(items => {
      const _items = items.slice();
      const index = _items.indexOf(itemId);

      if (index !== -1) {
        _items.splice(index, 1);
      } else {
        _items.push(itemId);
      }
      
      return _items;
    });
  };

  const value = useMemo(() => ({
    items,
    selectedItems,
    expandedItems,
    toggleSelectedItems,
    toggleExpandedItems,
  }), [
    items,
    selectedItems,
    expandedItems,
  ]);

  return(
    <TreeContext.Provider value={value}>
      {children}
    </TreeContext.Provider>
  );
};

export const useTreeState = () => {
  const context = useContext(TreeContext);

  if (!context) {
    throw new Error('useTreeState must be used within a TreeContext');
  }

  return context;
};