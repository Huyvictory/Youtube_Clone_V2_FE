import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout';
import PublicLayout from '@/layouts/PublicLayout';
import { authLoader } from '@/middleware/auth';

import { appRoutes } from './appRoutes';
import { publicRoutes } from './publicRoutes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    loader: authLoader,
    children: appRoutes,
  },
  {
    element: <PublicLayout />,
    children: publicRoutes,
  },

  { path: '*', element: <div>Page not found 404</div> },
]);

export { router };
