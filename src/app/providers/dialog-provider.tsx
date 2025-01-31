import { ReactNode } from 'react';
import { DialogsProvider as MUIDialogsProvider } from '@toolpad/core/useDialogs';

interface DialogsProviderProps {
  children: ReactNode;
}

export const DialogsProvider = ({ children }: DialogsProviderProps) => {
  return (
    <MUIDialogsProvider>
      {children}
    </MUIDialogsProvider>
  );
};