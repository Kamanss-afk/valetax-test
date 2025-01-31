import styles from './tree-item.module.css';

export const TreeItem = ({
  name,
  rootName,
  actions,
  isRoot,
  isSelected,
}: {
  name: string;
  rootName: string;
  isRoot: boolean;
  isSelected: boolean;
  actions: React.ReactNode;
}) => {
  const renderName = () => isRoot ? rootName : name;

  return(
    <div className={`${styles.item} ${isSelected ? styles.selected : ''}`}>
      {renderName()}
      {isSelected && actions}
    </div>
  );
};