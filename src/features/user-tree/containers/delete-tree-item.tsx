import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { DialogProps } from '@toolpad/core/useDialogs';
import { ActionDialog } from '../ui/action-dialog';
import { UserTreeItem } from '../model/user-tree';
import { useDeleteTreeItem } from '../api/delete-tree-item';

interface DeleteTreeItemDialogProps {
  treeName: string;
  item: UserTreeItem;
}

export const DeleteTreeItemDialog = ({
  payload: {
    item,
    treeName,
  },
  open,
  onClose,
}: DialogProps<DeleteTreeItemDialogProps>) => {
  const {
    error,
    mutate,
    isIdle,
    isPending,
    isSuccess,
  } = useDeleteTreeItem({
    treeName,
    mutationConfig: {
      onSuccess: () => {
        handleClose();
      },
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleDeleteTreeItem = () => {
    mutate({ treeName, nodeId: item.id });
  };

  const renderContent = () => {
    if(isPending) return <LinearProgress />;
    if(isSuccess) return 'Completed!';
    if(error) return `${error.message}!`;

    return `Do you want to delete ${item.name}?`;
  };

  const renderActions = () => {
    if(!isIdle) {
      return(
        <Button onClick={handleClose}>
          CLOSE
        </Button>
      );
    }

    return(
      <>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button color='error' onClick={handleDeleteTreeItem }>
          Delete
        </Button>
      </>
    );
  };

  return(
    <ActionDialog
      open={open}
      onClose={handleClose}
      title={'Delete'}
      content={renderContent()}
      actions={renderActions()}
    />
  );
};