import { lazy, Suspense } from 'react';

const LoginorLogout = lazy(() => import('@/pages/SignIn'));

export const publicRoutes = [
  {
    index: true,
    path: '/login',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <LoginorLogout />
      </Suspense>
    ),
  },
];
