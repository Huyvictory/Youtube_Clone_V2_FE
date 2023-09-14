import { ChevronRightOutlined } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tab,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { getChannelDetail, UpdateOrCreateChannelBanner } from '@/services/api/channel';
import { getListVideos } from '@/services/api/video';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { resetChannelState } from '@/services/store/channel';
import { resetVideoState } from '@/services/store/video';
import { showNotification } from '@/utils/notification';

import HomeChannel from './HomeChannel';
import PlaylistsChannel from './PlaylistsChannel';
import SubscribedChannel from './SubscribedChannel';
import VideosChannel from './VideosChannel';

const ChannelDetail = () => {
  const { channelDetail, isLoadingGetChannelDetail } = useAppSelector(
    (state) => state.channel,
  );

  const { isLoadingVideo_GetList, videoPage } = useAppSelector((state) => state.video);
  const { isUpdating_ChannelBanner } = useAppSelector((state) => state.channel);

  const location = useLocation();

  const { channelId } = useParams();

  const [value, setValue] = useState<string>(
    location.search.substring(location.search.lastIndexOf('=') + 1),
  );
  const [previewBannerImage, setPreviewBannerImage] = useState<string>();
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    window.history.replaceState(null, 'Vite + React + TS', `?currentTab=${newValue}`);
  };

  const handleChangeImage = (e: any) => {
    const formdata = new FormData();
    formdata.append('file', e.target.files[0]);
    formdata.append('typeMedia', e.target.files[0].type.split('/')[0]);
    formdata.append('typeImage', 'CHANNEL_BANNER');
    dispatch(UpdateOrCreateChannelBanner(formdata)).then((res: any) => {
      if (res.payload) {
        setPreviewBannerImage(res.payload.data.data);
        showNotification('Update channel banner successfully', 'success', 2000);
      }
    });
  };

  useEffect(() => {
    dispatch(getChannelDetail({ channel_id: channelId as string })).then((res: any) => {
      if (res.payload) {
        if (res.payload.data.data.channelDetail.channel_banner_media_id) {
          setPreviewBannerImage(
            res.payload.data.data.channelDetail.channel_banner_media_id.media_url,
          );
        }
      }
    });

    return () => {
      dispatch(resetVideoState());
      dispatch(resetChannelState());
    };
  }, []);

  useEffect(() => {
    if (channelDetail) {
      setTimeout(() => {
        dispatch(
          getListVideos({
            page: videoPage,
            limit: 6,
            channelId: channelDetail._id,
          }),
        ).then((res: any) => {
          if (res.payload.data.data.length === 0) {
            setHasMore(false);
          }
        });
      }, 2000);
    }
  }, [channelDetail, videoPage]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '30vh',
          mb: 2,
        }}
        component={'div'}
      >
        <img
          src={
            previewBannerImage
              ? previewBannerImage
              : 'https://q5n8c8q9.rocketcdn.me/wp-content/uploads/2019/07/YouTube-Banner-Size-and-Dimensions-Guide.png.webp'
          }
          alt="channel_banner"
          style={{ objectFit: 'cover', height: '100%', width: '100%' }}
        />
        <Box sx={{ display: 'flex' }}>
          <input accept="image/*" type="file" onChange={handleChangeImage} />
        </Box>
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
                <Tab label="Playlist" value="Playlist" />
                <Tab label="Channels" value="Channels" />
              </TabList>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                marginX: 'calc((100% - 1284px)/2)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '50vh',
                  width: '100%',
                }}
              >
                <TabPanel value="Home">
                  <HomeChannel
                    channelId={channelDetail?._id as string}
                    hasMore={hasMore}
                  />
                </TabPanel>
                <TabPanel value="Video">
                  <VideosChannel
                    channelId={channelDetail?._id as string}
                    hasMore={hasMore}
                  />
                </TabPanel>
                <TabPanel value="Playlist">
                  <PlaylistsChannel />
                </TabPanel>
                <TabPanel value="Channels">
                  <SubscribedChannel />
                </TabPanel>
              </Box>
            </Box>
          </TabContext>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: 100 }}
        open={isLoadingVideo_GetList || isUpdating_ChannelBanner}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default ChannelDetail;
