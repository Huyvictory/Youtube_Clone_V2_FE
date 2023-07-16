import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Video = lazy(() => import('@/pages/Video'));

export const appRoutes = [
  {
    index: true,
    element: (
      <Suspense fallback={<>Loading...</>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: '/video/:id',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <Video />
      </Suspense>
    ),
  },
];
