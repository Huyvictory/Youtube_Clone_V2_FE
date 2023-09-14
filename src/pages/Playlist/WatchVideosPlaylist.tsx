import {
  AddTaskOutlined,
  MoreVertOutlined,
  ReplyOutlined,
  ThumbDownOffAltOutlined,
  ThumbUpOutlined,
} from '@mui/icons-material';
import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItemButton,
  ListSubheader,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Comments from '@/components/Comments';
import { subscribeChannel, unsubscribeChannel } from '@/services/api/channel';
import { getPlaylistDetail } from '@/services/api/playlist';
import { getUserProfile } from '@/services/api/user';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { resetPlaylistState } from '@/services/store/playlist';
import { showNotification } from '@/utils/notification';

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled(Box)`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Unsubscribe = styled.button`
  background-color: #a6a6a6;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const WatchVideosPlaylist = () => {
  const { videoList, isLoadingVideo, videoDetail, videoPage } = useAppSelector(
    (state) => state.video,
  );

  const location = useLocation();

  const { playlistDetail } = useAppSelector((state) => state.playlist);
  const { userPersonalDetail } = useAppSelector((state) => state.user);

  const [currentlySelectedVideoPlaylist, setCurrentlySelectedVideoPlaylist] = useState<{
    videoIndex: number;
    video_url: string;
    video_channel_id: string;
  }>({
    videoIndex: Number(location.search.substring(location.search.lastIndexOf('=') + 1)),
    video_url: '',
    video_channel_id: '',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getPlaylistDetail({
        playlistId: location.pathname.substring(location.pathname.lastIndexOf('/') + 1),
      }),
    ).then((res: any) => {
      if (res.payload) {
        const videoIndex = Number(
          location.search.substring(location.search.lastIndexOf('=') + 1),
        );
        setCurrentlySelectedVideoPlaylist({
          videoIndex: videoIndex,
          video_url: res.payload.data.data.playlist_videos[videoIndex]
            .video_url as string,
          video_channel_id:
            res.payload.data.data.playlist_videos[videoIndex].channel_id._id,
        });
      }
    });

    return () => {
      dispatch(resetPlaylistState());
    };
  }, []);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <ReactPlayer
            controls={true}
            playing={true}
            volume={0.5}
            muted={true}
            url={currentlySelectedVideoPlaylist?.video_url}
            width={'100%'}
            height={'55vh'}
          />
        </VideoWrapper>
        <Title>
          {
            playlistDetail?.playlist_videos[
              currentlySelectedVideoPlaylist?.videoIndex as number
            ].video_title
          }
        </Title>
        <Details>
          <Info>
            {
              playlistDetail?.playlist_videos[
                currentlySelectedVideoPlaylist?.videoIndex as number
              ].video_views
            }{' '}
            views •{' '}
            {dayjs(
              playlistDetail?.playlist_videos[
                currentlySelectedVideoPlaylist?.videoIndex as number
              ].createdAt,
            ).format('MMM DD, YYYY')}{' '}
          </Info>
          <Buttons>
            <Button>
              <ThumbUpOutlined />{' '}
              {
                playlistDetail?.playlist_videos[
                  currentlySelectedVideoPlaylist?.videoIndex as number
                ].video_like_count
              }
            </Button>
            <Button>
              <ThumbDownOffAltOutlined /> Dislike
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image
              src={
                playlistDetail?.playlist_videos[
                  currentlySelectedVideoPlaylist?.videoIndex as number
                ].user_id.user_avatar_media_id.media_url
              }
            />
            <ChannelDetail>
              <ChannelName>
                {
                  playlistDetail?.playlist_videos[
                    currentlySelectedVideoPlaylist?.videoIndex as number
                  ].channel_id.channel_name
                }
              </ChannelName>
              <ChannelCounter>
                {
                  playlistDetail?.playlist_videos[
                    currentlySelectedVideoPlaylist?.videoIndex as number
                  ].channel_id.channel_subscribers.length
                }{' '}
                subscribers
              </ChannelCounter>
              <Description>
                <div
                  dangerouslySetInnerHTML={{
                    __html: playlistDetail?.playlist_videos[
                      currentlySelectedVideoPlaylist?.videoIndex as number
                    ].video_description as string,
                  }}
                ></div>
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          {userPersonalDetail?.channel_id !==
            currentlySelectedVideoPlaylist.video_channel_id && (
            <div>
              {!userPersonalDetail?.subscribed_channels.includes(
                currentlySelectedVideoPlaylist.video_channel_id,
              ) ? (
                <Subscribe
                  onClick={() => {
                    dispatch(
                      subscribeChannel({
                        channelId: currentlySelectedVideoPlaylist.video_channel_id,
                      }),
                    ).then((res: any) => {
                      if (res.payload) {
                        showNotification(
                          'Subscribed channel successfully',
                          'success',
                          2000,
                        );
                        dispatch(getUserProfile());
                      }
                    });
                  }}
                >
                  SUBSCRIBE
                </Subscribe>
              ) : (
                <Unsubscribe
                  onClick={() => {
                    dispatch(
                      unsubscribeChannel({
                        channelId: currentlySelectedVideoPlaylist.video_channel_id,
                      }),
                    ).then((res: any) => {
                      if (res.payload) {
                        showNotification(
                          'Unsubscribed channel successfully',
                          'success',
                          2000,
                        );
                        dispatch(getUserProfile());
                      }
                    });
                  }}
                >
                  UNSUBSCRIBE
                </Unsubscribe>
              )}
            </div>
          )}
        </Channel>
        <Hr />
        <Comments
          videoId={
            playlistDetail?.playlist_videos[
              currentlySelectedVideoPlaylist?.videoIndex as number
            ]._id as string
          }
        />
      </Content>
      <Recommendation>
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 400,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          <ListSubheader component={Box} sx={{ paddingY: '0.5rem' }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 'bold' }}
            >{`Playlist name`}</Typography>
            <Box component={'span'}>Channel Name - 1/8</Box>
          </ListSubheader>
          {playlistDetail?.playlist_videos.map((playlist_video, index) => (
            <ListItemButton
              key={`item-${playlist_video._id}`}
              selected={currentlySelectedVideoPlaylist?.videoIndex === index}
              onClick={() => {
                setCurrentlySelectedVideoPlaylist({
                  videoIndex: index,
                  video_url: playlist_video.video_url,
                  video_channel_id: playlist_video.channel_id._id,
                });
                window.history.replaceState(
                  null,
                  'Vite + React + TS',
                  `?video_index=${index}`,
                );
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Box sx={{ display: 'flex', columnGap: '1rem' }}>
                  <div className="flex w-[100px] h-[56px]">
                    <img
                      alt="video_thumbnail_watch_playlist"
                      src={playlist_video.video_thumbnail_media_id.media_url}
                      className="object-cover"
                      width={'100%'}
                      height={'100%'}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <Typography variant="subtitle1">
                      {playlist_video.video_title}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: '#aaa' }}>
                      {playlist_video.channel_id.channel_name}
                    </Typography>
                  </div>
                </Box>
                <Box>
                  <IconButton>
                    <MoreVertOutlined />
                  </IconButton>
                </Box>
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Recommendation>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingVideo}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default WatchVideosPlaylist;
