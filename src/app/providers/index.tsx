import { ReactNode } from 'react';
import { QueryClientProvider } from './query-client-provider';
import { DialogsProvider } from './dialog-provider';

export const Provider = ({ children }: { children: ReactNode }) => {
  return(
    <QueryClientProvider>
      <DialogsProvider>
        {children}
      </DialogsProvider>
    </QueryClientProvider>
  );
};