import { ThumbDownAlt, ThumbDownOutlined, ThumbUpAlt } from '@mui/icons-material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Backdrop, Box, CircularProgress, ToggleButton } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { subscribeChannel, unsubscribeChannel } from '@/services/api/channel';
import { getUserProfile } from '@/services/api/user';
import {
  getListVideos,
  getVideoByItsId,
  likeVideoId,
  unlikeVideoId,
} from '@/services/api/video';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { resetVideoState, updateNextVideoPage } from '@/services/store/video';
import { showNotification } from '@/utils/notification';

import Card from '../components/Card';
import Comments from '../components/Comments';

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

const Video = () => {
  const { videoList, isLoadingVideo, videoDetail, videoPage } = useAppSelector(
    (state) => state.video,
  );

  const { userPersonalDetail } = useAppSelector((state) => state.user);

  const [hasMore, setHasMore] = useState(true);
  const [likeVideoButtonClicked, setLikeVideoButtonClicked] = useState<boolean>(false);
  const [unlikeVideoButtonClicked, setUnlikeVideoButtonClicked] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(getListVideos({ page: videoPage, limit: 8 })).then((res: any) => {
      if (res.payload.data.data.length === 0) {
        setHasMore(false);
      }
    });
  }, [videoPage]);

  useEffect(() => {
    dispatch(
      getVideoByItsId({
        videoId: location.pathname.substring(location.pathname.lastIndexOf('/') + 1),
      }),
    );
    return () => {
      dispatch(resetVideoState());
    };
  }, [location]);

  useEffect(() => {
    if (videoDetail) {
      if (videoDetail?.video_like_count.includes(userPersonalDetail?._id as string)) {
        setLikeVideoButtonClicked(true);
      } else {
        setLikeVideoButtonClicked(false);
      }
      if (videoDetail?.video_dislike_count.includes(userPersonalDetail?._id as string)) {
        setUnlikeVideoButtonClicked(true);
      } else {
        setUnlikeVideoButtonClicked(false);
      }
    }
  }, [videoDetail]);

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <ReactPlayer
            controls={true}
            playing={true}
            volume={0.5}
            muted={true}
            url={videoDetail?.video_url}
            width={'100%'}
            height={'55vh'}
          />
        </VideoWrapper>
        <Title>{videoDetail?.video_title}</Title>
        <Details>
          <Info>
            {videoDetail?.video_views} views •{' '}
            {dayjs(videoDetail?.createdAt).format('MMM DD, YYYY')}{' '}
          </Info>
          <Buttons>
            <ToggleButton
              value="like_video"
              selected={likeVideoButtonClicked}
              onChange={() => {
                setLikeVideoButtonClicked(!likeVideoButtonClicked);
              }}
              sx={{ columnGap: '0.5rem' }}
              onClick={() => {
                dispatch(
                  likeVideoId({
                    videoId: location.pathname.substring(
                      location.pathname.lastIndexOf('/') + 1,
                    ),
                    userId: userPersonalDetail?._id as string,
                  }),
                ).then((res: any) => {
                  if (res.payload) {
                    dispatch(
                      getVideoByItsId({
                        videoId: location.pathname.substring(
                          location.pathname.lastIndexOf('/') + 1,
                        ),
                      }),
                    );
                    showNotification('Update like video successfully', 'success', 2000);
                  }
                });
              }}
            >
              {likeVideoButtonClicked ? <ThumbUpAlt /> : <ThumbUpOutlinedIcon />}{' '}
              {videoDetail?.video_like_count.length}
            </ToggleButton>
            <ToggleButton
              value={'unlike_video'}
              selected={unlikeVideoButtonClicked}
              sx={{ columnGap: '0.5rem' }}
              onChange={() => {
                setUnlikeVideoButtonClicked(!unlikeVideoButtonClicked);
              }}
              onClick={() => {
                dispatch(
                  unlikeVideoId({
                    videoId: location.pathname.substring(
                      location.pathname.lastIndexOf('/') + 1,
                    ),
                    userId: userPersonalDetail?._id as string,
                  }),
                ).then((res: any) => {
                  if (res.payload) {
                    dispatch(
                      getVideoByItsId({
                        videoId: location.pathname.substring(
                          location.pathname.lastIndexOf('/') + 1,
                        ),
                      }),
                    );
                    showNotification(
                      'Update dislike video successfully',
                      'success',
                      2000,
                    );
                  }
                });
              }}
            >
              {unlikeVideoButtonClicked ? <ThumbDownAlt /> : <ThumbDownOutlined />}{' '}
              {videoDetail?.video_dislike_count.length}
            </ToggleButton>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={videoDetail?.user_id.user_avatar_media_id.media_url} />
            <ChannelDetail>
              <ChannelName>{videoDetail?.channel_id.channel_name}</ChannelName>
              <ChannelCounter>
                {videoDetail?.channel_id?.channel_subscribers.length} subscribers
              </ChannelCounter>
              <Description>
                <div
                  dangerouslySetInnerHTML={{
                    __html: videoDetail?.video_description as string,
                  }}
                ></div>
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          {userPersonalDetail?.channel_id !== videoDetail?.channel_id._id && (
            <div>
              {!userPersonalDetail?.subscribed_channels.includes(
                videoDetail?.channel_id._id as string,
              ) ? (
                <Subscribe
                  onClick={() => {
                    dispatch(
                      subscribeChannel({
                        channelId: videoDetail?.channel_id._id as string,
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
                        channelId: videoDetail?.channel_id._id as string,
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
          videoId={location.pathname.substring(location.pathname.lastIndexOf('/') + 1)}
        />
      </Content>
      <Recommendation>
        <InfiniteScroll
          dataLength={videoList.length}
          next={() => {
            setTimeout(() => {
              dispatch(updateNextVideoPage(videoPage + 1));
            }, 2000);
          }}
          hasMore={hasMore}
          loader={<h1>Loading new video...</h1>}
        >
          {videoList &&
            videoList?.map((video) => <Card key={video._id} type={'sm'} video={video} />)}
        </InfiniteScroll>
      </Recommendation>
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingVideo}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Video;
