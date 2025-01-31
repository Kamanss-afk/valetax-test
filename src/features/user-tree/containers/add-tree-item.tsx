import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DialogProps } from '@toolpad/core/useDialogs';
import LinearProgress from '@mui/material/LinearProgress';
import { ActionDialog } from '../ui/action-dialog';
import { useAddTreeItem } from '../api/add-tree-item';
import { UserTreeItem } from '../model/user-tree';

interface AddTreeItemDialogProps {
  treeName: string;
  item: UserTreeItem;
}

export const AddTreeItemDialog = ({
  payload: {
    treeName,
    item,
  },
  open,
  onClose,
}: DialogProps<AddTreeItemDialogProps>) => {
  const [nodeName, setNodeName] = useState('');

  const {
    mutate,
    error,
    isIdle,
    isSuccess,
    isPending,
  } = useAddTreeItem({
    treeName,
    mutationConfig: {
      onSuccess: () => {
        handleClose();
      },
    }
  });

  const handleClose = () => {
    onClose();
  };

  const handleAddTreeItem = () => {
    mutate({ treeName, parentNodeId: item.id, nodeName });
  };

  const renderContent = () => {
    if(isPending) return <LinearProgress />;
    if(isSuccess) return 'Completed!';
    if(error) return `${error.message}!`;

    return(
      <TextField
        fullWidth
        label='Node Name'
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
        <Button variant='contained' onClick={handleAddTreeItem}>
          Add
        </Button>
      </>
    );
  };

  return(
    <ActionDialog
      open={open}
      onClose={handleClose}
      title={'Add'}
      content={renderContent()}
      actions={renderActions()}
    />
  );
};