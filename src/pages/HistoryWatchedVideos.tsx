import { Box } from '@mui/material';
import { useEffect } from 'react';

import Card from '@/components/Card';
import { IDS_WATCHED_VIDEOS } from '@/constants';
import { getListWatchedVideos } from '@/services/api/video';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { resetVideoState } from '@/services/store/video';
import { getLocalStorageKey } from '@/utils/localStorage';

const HistoryWatchedVideos = () => {
  const { video_watched } = useAppSelector((state) => state.video);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getListWatchedVideos({
        ids_watched_videos: JSON.parse(getLocalStorageKey(IDS_WATCHED_VIDEOS) as string),
      }),
    );

    return () => {
      dispatch(resetVideoState());
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {video_watched.length > 0 &&
        video_watched.map((video) => (
          <Card key={video._id} type={'undefined'} video={video} />
        ))}
    </Box>
  );
};

export default HistoryWatchedVideos;
