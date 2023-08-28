import { MoreVertOutlined } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { GetListVideos_Response } from '@/contracts/video';
import {
  deleteChannelExisitingVideo,
  getListVideos,
  getVideoByItsId,
  getVideoCategories,
} from '@/services/api/video';
import { useAppDispatch } from '@/services/hooks';
import { resetVideoList } from '@/services/store/video';
import { showNotification } from '@/utils/notification';

import ModalUpdateVideo from './video/ModalUpdateVideo';

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

const Texts = styled.div`
  margin-left: 10px;
`;

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

const CardVideo_ChannelDetail = ({
  type,
  video,
  channelId,
}: {
  type: any;
  video: GetListVideos_Response;
  channelId: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleOpenVideoMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault();
  };
  const handleCloseVideoMenu = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
    event.preventDefault();
  };

  const handleOpenModalUpdateVideo = (
    event: React.MouseEvent<HTMLLIElement>,
    videoId: string,
  ) => {
    dispatch(getVideoCategories()).then((res: any) => {
      if (res.payload) {
        dispatch(getVideoByItsId({ videoId })).then((res: any) => {
          if (res.payload) {
            setOpen(true);
            setAnchorEl(null);
          }
        });
      }
    });

    event.preventDefault();
  };

  const hanldeDeleteUserVideo = (
    event: React.MouseEvent<HTMLLIElement>,
    videoId: string,
  ) => {
    dispatch(deleteChannelExisitingVideo({ videoId })).then((res: any) => {
      if (res.payload) {
        dispatch(resetVideoList());
        dispatch(
          getListVideos({
            page: 1,
            limit: 6,
            channelId: channelId,
          }),
        );
        showNotification('Update Video successfully', 'success', 2000);
      }
    });

    setAnchorEl(null);
    event.preventDefault();
  };

  return (
    <Box>
      <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
        <Container type={type}>
          <Image type={type} src={video.video_thumbnail_media_id.media_url} />
          <Details type={type}>
            <Box sx={{ display: 'flex' }}>
              <ChannelImage
                type={type}
                src={video.user_id.user_avatar_media_id.media_url}
              />
              <Texts>
                <Title>{video.video_title}</Title>
                <ChannelName>{video.channel_id.channel_name}</ChannelName>
                <Info>{video.video_views} views • 1 day ago</Info>
              </Texts>
            </Box>
            <Box>
              <IconButton sx={{ zIndex: 100 }} onClick={handleOpenVideoMenu}>
                <MoreVertOutlined />
              </IconButton>
            </Box>
          </Details>
        </Container>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleCloseVideoMenu}
        >
          <MenuItem
            onClick={(e) => {
              handleOpenModalUpdateVideo(e, video._id);
            }}
          >
            Update
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              hanldeDeleteUserVideo(e, video._id);
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Link>
      {open && <ModalUpdateVideo open={open} setOpen={setOpen} channelId={channelId} />}
    </Box>
  );
};

export default CardVideo_ChannelDetail;
