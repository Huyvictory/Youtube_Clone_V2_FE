import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { GetListVideos_Response } from '@/contracts/video';

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
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
      <Container type={type}>
        <Image type={type} src={video.video_thumbnail_media_id.media_url} />
        <Details type={type}>
          <ChannelImage type={type} src={video.user_id.user_avatar_media_id.media_url} />
          <Texts>
            <Title>{video.video_title}</Title>
            <ChannelName>{video.channel_id.channel_name}</ChannelName>
            <Info>{video.video_views} views • 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
