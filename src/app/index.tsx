import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserTree } from '@/features/user-tree';
import { Provider } from './providers';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <UserTree />
    </Provider>
  </StrictMode>,
);
