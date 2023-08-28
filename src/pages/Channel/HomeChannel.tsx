import { Box, Typography } from '@mui/material';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardVideo_ChannelDetail from '@/components/CardVideo_ChannelDetail';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { updateNextVideoPage } from '@/services/store/video';

const HomeChannel = ({ channelId, hasMore }: { channelId: string; hasMore: boolean }) => {
  const { videoList, videoPage } = useAppSelector((state) => state.video);

  const dispatch = useAppDispatch();

  return (
    <>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Videos
        </Typography>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <InfiniteScroll
            dataLength={videoList.length}
            next={() => {
              dispatch(updateNextVideoPage(videoPage + 1));
            }}
            hasMore={hasMore}
            loader={<h1>Loading new video...</h1>}
            height={350}
            style={{ width: '100%', justifyContent: 'space-between' }}
          >
            {videoList.length > 0 &&
              videoList.map((video) => (
                <CardVideo_ChannelDetail
                  key={video._id}
                  type={'undefined'}
                  video={video}
                  channelId={channelId}
                />
              ))}
          </InfiniteScroll>
        </Box>
      </Box>
    </>
  );
};

export default HomeChannel;
