import { lazy, Suspense } from 'react';

const Home = lazy(() => import('@/pages/Home'));
const Video = lazy(() => import('@/pages/Video'));
const Profile = lazy(() => import('@/pages/Profile'));
const ChannelDetail = lazy(() => import('@/pages/Channel/ChannelDetail'));
const PlaylistDetail = lazy(() => import('@/pages/Channel/PlaylistDetail'));
const WatchVideosPlaylist = lazy(() => import('@/pages/Playlist/WatchVideosPlaylist'));

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
    path: '/video/:videoId',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <Video />
      </Suspense>
    ),
  },
  {
    path: '/my-channel',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <ChannelDetail />
      </Suspense>
    ),
  },
  {
    path: '/playlist-detail/:playlistId',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <PlaylistDetail />
      </Suspense>
    ),
  },
  {
    path: '/playlist-watch/:playlistId',
    element: (
      <Suspense fallback={<>Loading...</>}>
        <WatchVideosPlaylist />
      </Suspense>
    ),
  },
];
