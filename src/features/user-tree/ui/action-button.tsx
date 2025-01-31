import IconButton, { IconButtonProps } from '@mui/material/IconButton';

export const ActionButton = ({ children, onClick, ...props }: IconButtonProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    /** 
     * This stopPropagation was added to prevent the tree
     * from collapsing / expanding when clicking on the action button.
    */
    event.stopPropagation();

    if (onClick) {
      onClick(event);
    }
  };

  return(
    <IconButton size='small' onClick={handleClick} {...props}>
      {children}
    </IconButton>
  );
};