import { Tree } from '@/shared/ui/tree';
import { useUserTree } from '../api/get-user-tree';
import { UserTreeItem } from '../model/user-tree';
import { AddTreeItemDialog } from './add-tree-item';
import { DeleteTreeItemDialog } from './delete-tree-item';
import { RenameTreeItemDialog } from './rename-tree-item';
import CreateIcon from '@mui/icons-material/CreateOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TrashIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDialogs } from '@toolpad/core/useDialogs';
import { ActionButton } from '../ui/action-button';
import { TreeItem } from '../ui/tree-item/tree-item';

const TREE_GUID = '{f16db06-7436-4c4e-8616-8e386ac2cf8b}';

export const UserTree = () => {
  const dialogs = useDialogs();

  const { data, error, isLoading } = useUserTree({ treeName: TREE_GUID });

  const handleRenameClick = (item: UserTreeItem) => {
    dialogs.open(RenameTreeItemDialog, { item, treeName: TREE_GUID });
  };

  const handleDeleteClick = (item: UserTreeItem) => {
    dialogs.open(DeleteTreeItemDialog, { treeName: TREE_GUID, item });
  };

  const handleAddClick = (item: UserTreeItem) => {
    dialogs.open(AddTreeItemDialog, { treeName: TREE_GUID, item });
  };

  if(error) return `${error.message}`;

  if(isLoading) return 'Loading...';

  if(!data) return null;

  const renderActions = ({
    isRoot,
    item,
  }: {
    isRoot: boolean;
    item: UserTreeItem,
  }) => {
    if(isRoot) {
      return(
        <ActionButton onClick={() => handleAddClick(item)}>
          <AddIcon fontSize='inherit' color='primary'/>
        </ActionButton>
      );
    }

    return(
      <>
        <ActionButton onClick={() => handleAddClick(item)}>
          <AddIcon fontSize='inherit' color='primary'/>
        </ActionButton>
        <ActionButton onClick={() => handleRenameClick(item)}>
          <CreateIcon fontSize='inherit' color='primary'/>      
        </ActionButton>
        <ActionButton onClick={() => handleDeleteClick(item)}>
          <TrashIcon fontSize='inherit' color='error' />
        </ActionButton>
      </>
    );
  };

  return (
    <Tree
      items={[data]}
      renderItem={({ item, isSelected, isRoot }) => (
        <TreeItem
          isRoot={isRoot}
          isSelected={isSelected}
          rootName={'Root'}
          name={item.name}
          actions={renderActions({ isRoot, item })}
        />
      )}
    />
  );
};
