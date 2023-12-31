import { MoreVertOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IDS_WATCHED_VIDEOS } from '@/constants';
import { GetListVideos_Response } from '@/contracts/video';
import { getLocalStorageKey, setLocalStorageKey } from '@/utils/localStorage';

import Modal_Add_Video_Playlists from './Playlist/Modal_Add_Video_Playlists';

dayjs.extend(relativeTime);

const VideoLink: any = styled(Link)`
  width: ${({ type }: any) => type === 'sm' && '100%'};
`;

const Container: any = styled.div`
  width: ${({ type }: any) => type !== 'sm' && '360px'};
  margin-bottom: ${({ type }: any) => (type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${({ type }: any) => type === 'sm' && 'flex'};
  gap: 10px;
`;

const Image: any = styled.img`
  width: 100%;
  height: ${({ type }: any) => (type === 'sm' ? '120px' : '202px')};
  background-color: #999;
  flex: 1;
`;

const Details: any = styled.div`
  display: flex;
  margin-top: ${({ type }: any) => type !== 'sm' && '16px'};
  gap: 12px;
  flex: 1;
  justify-content: space-between;
`;

const ChannelImage: any = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${({ type }: any) => type === 'sm' && 'none'};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }: { type: any; video: GetListVideos_Response }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <VideoLink
      type={type}
      to={`/video/${video._id}`}
      style={{ textDecoration: 'none' }}
      onClick={() => {
        const idsWatchedVideos: Array<string> = JSON.parse(
          getLocalStorageKey(IDS_WATCHED_VIDEOS) as string,
        );

        if (!idsWatchedVideos.includes(video._id)) {
          idsWatchedVideos.push(video._id);

          setLocalStorageKey(IDS_WATCHED_VIDEOS, JSON.stringify(idsWatchedVideos));
        }
      }}
    >
      <Container type={type}>
        <Image type={type} src={video.video_thumbnail_media_id.media_url} />
        <Details type={type}>
          <div className="flex gap-3">
            <ChannelImage
              type={type}
              src={video.user_id.user_avatar_media_id.media_url}
            />
            <Texts>
              <Title>{video.video_title}</Title>
              <ChannelName>{video.channel_id.channel_name}</ChannelName>
              <Info>{dayjs(video.createdAt).fromNow()}</Info>
            </Texts>
          </div>
          <div>
            <IconButton
              onClick={(e) => {
                setOpen(true);
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <MoreVertOutlined />
            </IconButton>
          </div>
        </Details>
      </Container>
      {open && (
        <Modal_Add_Video_Playlists open={open} setOpen={setOpen} videoId={video._id} />
      )}
    </VideoLink>
  );
};

export default Card;
