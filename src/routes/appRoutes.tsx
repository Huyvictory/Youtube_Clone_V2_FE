import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Video = lazy(() => import('@/pages/Video'));
const Profile = lazy(() => import('@/pages/Profile'));

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
    path: '/profile',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <Profile />
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
