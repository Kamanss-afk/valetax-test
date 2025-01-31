import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DialogProps } from '@toolpad/core/useDialogs';
import LinearProgress from '@mui/material/LinearProgress';
import { ActionDialog } from '../ui/action-dialog';
import { UserTreeItem } from '../model/user-tree';
import { useRenameTreeItem } from '../api/rename-tree-item';

interface RenameTreeItemDialogProps {
  treeName: string;
  item: UserTreeItem;
}

export const RenameTreeItemDialog = ({
  onClose,
  open,
  payload: {
    item,
    treeName,
  },
}: DialogProps<RenameTreeItemDialogProps>) => {
  const [nodeName, setNodeName] = useState(item.name);

  const {
    mutate,
    error,
    isIdle,
    isPending,
    isSuccess,
  } = useRenameTreeItem({
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

  const handleEditTreeItem = () => {
    mutate({ treeName, nodeId: item.id, newNodeName: nodeName });
  };

  const renderContent = () => {
    if(isPending) return <LinearProgress />;
    if(isSuccess) return 'Completed!';
    if(error) return `${error.message}!`;

    return(
      <TextField
        fullWidth
        label='New Node Name'
        variant='outlined'
        value={nodeName}
        onChange={(event) => setNodeName(event.target.value)}
      />
    );
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
        <Button variant='contained' onClick={handleEditTreeItem}>
          Rename
        </Button>
      </>
    );
  };

  return(
    <ActionDialog
      open={open}
      onClose={handleClose}
      title={'Rename'}
      content={renderContent()}
      actions={renderActions()}
    />
  );
};