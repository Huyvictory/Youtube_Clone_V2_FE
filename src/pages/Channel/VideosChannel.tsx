import { Box } from '@mui/material';
import React from 'react';

import CardVideo_ChannelDetail from '@/components/CardVideo_ChannelDetail';
import { channelDetail, videosDetailChannel } from '@/contracts/channel';

const VideosChannel = ({ channelDetail }: { channelDetail: channelDetail }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '10px 70px' }}>
      {channelDetail.channel_videos.length > 0 &&
        channelDetail.channel_videos.map((video: videosDetailChannel, index) => (
          <CardVideo_ChannelDetail
            channelDetail={channelDetail}
            key={video._id}
            type={'undefined'}
            video={video}
            index={index}
          />
        ))}
    </Box>
  );
};

export default VideosChannel;
