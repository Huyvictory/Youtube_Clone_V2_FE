import { Box } from '@mui/material';

import CardVideo_ChannelDetail from '@/components/CardVideo_ChannelDetail';
import { useAppSelector } from '@/services/hooks';

const VideosChannel = ({ channelId }: { channelId: string }) => {
  const { videoList } = useAppSelector((state) => state.video);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '10px 70px' }}>
      {videoList.length > 0 &&
        videoList.map((video) => (
          <CardVideo_ChannelDetail
            key={video._id}
            type={'undefined'}
            video={video}
            channelId={channelId}
          />
        ))}
    </Box>
  );
};

export default VideosChannel;
