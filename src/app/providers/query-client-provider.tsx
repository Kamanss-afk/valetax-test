import { ReactNode } from 'react';
import {
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/react-query';

interface QueryClientProviderProps {
  children: ReactNode;
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
};