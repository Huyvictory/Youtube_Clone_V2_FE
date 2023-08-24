import { ChevronRightOutlined } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Divider, IconButton, Stack, Tab } from '@mui/material';
import { useEffect, useState } from 'react';

import { channelDetail } from '@/contracts/channel';
import { getChannelDetail } from '@/services/api/channel';
import { useAppDispatch, useAppSelector } from '@/services/hooks';

import VideosChannel from './VideosChannel';

const ChannelDetail = () => {
  const { channelDetail, isLoadingGetChannelDetail } = useAppSelector(
    (state) => state.channel,
  );

  const [value, setValue] = useState<string>('Home');

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getChannelDetail());
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ width: '100%', height: '30vh' }} component={'div'}>
        <img
          src={
            'https://q5n8c8q9.rocketcdn.me/wp-content/uploads/2019/07/YouTube-Banner-Size-and-Dimensions-Guide.png.webp'
          }
          alt="channel_banner"
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          height: '20vh',
          paddingY: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            gap: '0 20px',
            paddingX: 'calc((100% - 1284px)/2)',
          }}
        >
          <Box>
            <Avatar
              src={channelDetail?.channel_owner_id.user_avatar_media_id.media_url}
              sx={{ objectFit: 'cover', height: '100%', width: '150px' }}
            />
          </Box>
          <Stack>
            <p>{channelDetail?.channel_name}</p>
            <span>
              {channelDetail?.channel_subscribers.length} subscribers •{' '}
              {channelDetail?.channel_videos.length} videos
            </span>
            <span>
              description of channel{' '}
              <IconButton>
                <ChevronRightOutlined />
              </IconButton>
            </span>
            <div>
              <a href="https://www.youtube.com/" style={{ color: 'blue' }}>
                youtube.com
              </a>
            </div>
          </Stack>
        </Box>
      </Box>
      <Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box
              sx={{
                display: 'flex',
                marginX: 'calc((100% - 1284px)/2)',
              }}
            >
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Home" value="Home" />
                <Tab label="Video" value="Video" disabled={isLoadingGetChannelDetail} />
                <Tab label="Item Three" value="3" />
              </TabList>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                marginX: 'calc((100% - 1284px)/2)',
              }}
            >
              <Box sx={{ height: '50vh' }}>
                <TabPanel value="Home">Item One</TabPanel>
                <TabPanel value="Video">
                  <VideosChannel channelDetail={channelDetail as channelDetail} />
                </TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </Box>
            </Box>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
