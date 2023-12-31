import {
  AddOutlined,
  EditOutlined,
  MoreVertOutlined,
  PlayArrowOutlined,
} from '@mui/icons-material';
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItemButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation, useNavigate } from 'react-router-dom';
import tw from 'tailwind-styled-components';

import ModalUpdatePlaylist from '@/components/Playlist/Modal_Create_Update_PlaylistInformation';
import ModalConfirm_DeletePlaylist from '@/components/Playlist/ModalConfirm_DeletePlaylist';
import { Playlist_Videos } from '@/contracts/playlist';
import {
  addOrDeleteVideo_Playlist,
  CreateOrUpdatePlaylistRepresentationImage,
  getPlaylistDetail,
  updatePlaylistRepresentationImageLink,
} from '@/services/api/playlist';
import { getListVideos } from '@/services/api/video';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { updateVideosPlaylist } from '@/services/store/playlist';
import {
  resetVideoState,
  updateNextVideoPage,
  updateVideoList,
} from '@/services/store/video';
import { showNotification } from '@/utils/notification';

dayjs.extend(relativeTime);

const PlaylistDetail = () => {
  const {
    playlistDetail,
    playlist_videos,
    isLoading_UpdateNewRepresentation,
    isLoading,
  } = useAppSelector((state) => state.playlist);
  const { videoList, videoPage } = useAppSelector((state) => state.video);

  const [hasMore, setHasMore] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [backgroundPlaylistImage, setBackgroundPlaylistImage] = useState<string>();
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [videoThumbnailDetail, setVideoThumbnailImageDetail] = useState<{
    media_id: string;
    media_url: string;
  }>();
  const [videoIdToAdd_Delete, setVideoIdToAdd_Delete] = useState<string>();

  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getPlaylistDetail({
        playlistId: location.pathname.substring(location.pathname.lastIndexOf('/') + 1),
      }),
    ).then((res: any) => {
      if (res.payload) {
        setBackgroundPlaylistImage(
          res.payload.data.data.playlist_respresentation_image_id.media_url,
        );
      }
    });

    return () => {
      dispatch(resetVideoState());
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        getListVideos({
          page: videoPage,
          limit: 8,
        }),
      ).then((res: any) => {
        if (res.payload.data.data.length === 0) {
          setHasMore(false);
        }
      });
    }, 2000);
  }, [videoPage]);

  const findAddedorDeletedVideoPlaylist = (
    video_id: string,
    videos_playlist_response: Playlist_Videos,
  ) => {
    return videos_playlist_response[
      videos_playlist_response
        .map((el) => el._id)
        .findIndex((videoId) => videoId === video_id)
    ];
  };

  const onAddVideoPlaylist = (e: React.MouseEvent<HTMLElement>, video_id: string) => {
    dispatch(
      addOrDeleteVideo_Playlist({
        video_id: video_id,
        playlistId: playlistDetail?._id as string,
      }),
    ).then((res: any) => {
      if (res.payload) {
        showNotification('Add video into playlist successfully !', 'success', 2000);
        dispatch(
          updateVideosPlaylist([
            ...playlist_videos,
            findAddedorDeletedVideoPlaylist(video_id, res.payload.data.data),
          ]),
        );
        dispatch(updateVideoList(videoList.filter((el) => el._id !== video_id)));
      }
    });
    e.stopPropagation();
  };

  const onDeleteVideoPlaylist = (e: React.MouseEvent<HTMLElement>, video_id: string) => {
    dispatch(
      addOrDeleteVideo_Playlist({
        video_id: video_id,
        playlistId: playlistDetail?._id as string,
      }),
    ).then((res: any) => {
      if (res.payload) {
        showNotification('Delete video playlist successfully !', 'success', 2000);

        if (!videoList.map((el) => el._id).includes(video_id)) {
          dispatch(
            updateVideoList([
              ...videoList,
              findAddedorDeletedVideoPlaylist(video_id, res.payload.data.data),
            ]),
          );
        }

        dispatch(
          updateVideosPlaylist(playlist_videos.filter((el) => el._id !== video_id)),
        );
      }
    });
    e.stopPropagation();
  };

  const handleChangeImage = (e: any) => {
    const formdata = new FormData();
    formdata.append('file', e.target.files[0]);
    formdata.append('typeMedia', e.target.files[0].type.split('/')[0]);
    formdata.append('typeImage', 'PLAYLIST');
    dispatch(
      CreateOrUpdatePlaylistRepresentationImage({
        payloadImage: formdata,
        playlistId: playlistDetail?._id as string,
      }),
    ).then((res: any) => {
      if (res.payload) {
        setBackgroundPlaylistImage(res.payload.data.data);
        dispatch(getPlaylistDetail({ playlistId: playlistDetail?._id as string }));
        showNotification(
          'Update playlist representaion image successfully',
          'success',
          2000,
        );
      }
    });
  };

  const handleCloseMenuVideoPlaylist = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(null);
    event.preventDefault();
  };

  const SideBarContainer = tw.div<{ $Representation_ImageLink?: string; style: any }>`
    basis-80
    grow-1
    p-4
    relative
    ${(props) => {
      if (props.$Representation_ImageLink) {
        return `text-white`;
      }
    }}
    before:content-['']
    before:block
    before:absolute
    before:w-full
    before:h-full
    before:top-0
    before:left-0
    ${(props) => {
      if (props.$Representation_ImageLink) {
        return `before:bg-[image:var(--image-url)]`;
      }

      return `before:bg-[url('https://www.designbombs.com/wp-content/uploads/2023/01/youtube-thumbnail-designs-for-high-ctr.png')]`;
    }}
    before:bg-no-repeat
    before:blur-3xl
    before:bg-cover
  `;
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', position: 'relative' }}>
      <SideBarContainer
        id="sidebar"
        key={backgroundPlaylistImage}
        style={{ '--image-url': `url(${backgroundPlaylistImage})` }}
        $Representation_ImageLink={backgroundPlaylistImage}
      >
        <div className="fixed">
          <div className="flex flex-col w-[288px] h-full gap-y-4">
            <Box sx={{ display: 'flex' }}>
              <img
                alt="playlist_representation_image"
                src={
                  playlistDetail?.playlist_respresentation_image_id
                    ? playlistDetail.playlist_respresentation_image_id.media_url
                    : 'https://www.designbombs.com/wp-content/uploads/2023/01/youtube-thumbnail-designs-for-high-ctr.png'
                }
                className="object-cover w-full h-[175px] rounded-lg z-[200]"
              />
            </Box>
            <Box sx={{ display: 'flex' }}>
              <input accept="image/*" type="file" onChange={handleChangeImage} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {playlistDetail?.playlist_name}
              </Typography>
              <IconButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                <EditOutlined />
              </IconButton>
            </Box>
            <Box>
              <p>{playlistDetail?.playlist_description}</p>
            </Box>
            <Box>
              <span>
                belongs to{' '}
                <span className="font-bold">
                  {playlistDetail?.playlist_channel_id.channel_name}
                </span>
              </span>
            </Box>
            <Box>
              <p>{playlistDetail?.playlist_videos.length} videos</p>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
              <button className="w-full bg-blue-600 py-[6px] px-[16px] rounded uppercase font-medium">
                Play all videos
                <span>
                  <PlayArrowOutlined />
                </span>
              </button>
              <button
                className="w-full bg-red-600 py-[6px] px-[16px] rounded uppercase font-medium"
                onClick={() => {
                  setOpenConfirm(true);
                }}
              >
                Delete playlist
              </button>
            </Box>
          </div>
        </div>
      </SideBarContainer>
      <div
        id="main_content"
        className="basis-0 grow-[999]"
        style={{ minInlineSize: '50%' }}
      >
        <Box>
          <List
            sx={{ display: 'flex', flexDirection: 'column', padding: '0.5rem' }}
            subheader={<div id="nested-list-subheader">Videos of playlist</div>}
          >
            {playlist_videos.map((el, index) => {
              return (
                <ListItemButton
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                  onClick={() => {
                    navigate(
                      `/playlist-watch/${playlistDetail?._id}?video_index=${index}`,
                    );
                  }}
                >
                  <Box sx={{ display: 'flex', columnGap: '1rem' }}>
                    <div className="flex w-[9vw] h-[10vh]">
                      <img
                        alt="video_thumbnail_playlist"
                        src={el.video_thumbnail_media_id.media_url}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{el.video_title}</p>
                      <p>
                        {el.channel_id.channel_name} • {dayjs(el.createdAt).fromNow()}
                      </p>
                    </div>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={(e: React.MouseEvent<HTMLElement>) => {
                        setVideoThumbnailImageDetail({
                          media_id: playlistDetail?.playlist_respresentation_image_id
                            ?._id as string,
                          media_url: el.video_thumbnail_media_id.media_url,
                        });
                        setVideoIdToAdd_Delete(el._id);
                        setAnchorEl(e.currentTarget);
                        e.stopPropagation();
                      }}
                    >
                      <MoreVertOutlined />
                    </IconButton>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </Box>
        <Divider />
        <Box>
          <List
            sx={{ display: 'flex', flexDirection: 'column', padding: '0.5rem' }}
            subheader={<div id="nested-list-subheader">Recommended video</div>}
          >
            <InfiniteScroll
              dataLength={videoList.length}
              next={() => {
                dispatch(updateNextVideoPage(videoPage + 1));
              }}
              hasMore={hasMore}
              loader={<h1>Loading new video...</h1>}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              {videoList
                .filter((el) => !playlist_videos.map((el) => el._id).includes(el._id))
                .map((el, index) => {
                  return (
                    <ListItemButton
                      key={el._id}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Box sx={{ display: 'flex', columnGap: '1rem' }}>
                        <div className="flex w-[9vw] h-[10vh]">
                          <img
                            alt="video_thumbnail_playlist"
                            src={el.video_thumbnail_media_id.media_url}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="font-bold">{el.video_title}</p>
                          <p>
                            {el.channel_id.channel_name} • {dayjs(el.createdAt).fromNow()}
                          </p>
                        </div>
                      </Box>
                      <Box>
                        <IconButton
                          onClick={(e: React.MouseEvent<HTMLElement>) => {
                            onAddVideoPlaylist(e, el._id);
                          }}
                        >
                          <AddOutlined />
                        </IconButton>
                      </Box>
                    </ListItemButton>
                  );
                })}
            </InfiniteScroll>
          </List>
        </Box>
      </div>
      {open && (
        <ModalUpdatePlaylist
          open={open}
          setOpen={setOpen}
          isUpdating={true}
          playlistDetail={playlistDetail}
        />
      )}
      {openConfirm && (
        <ModalConfirm_DeletePlaylist
          openConfirm={openConfirm}
          setOpenConfirm={setOpenConfirm}
          playlistId={playlistDetail?._id as string}
        />
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: 100 }}
        open={isLoading_UpdateNewRepresentation || isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
        onClose={handleCloseMenuVideoPlaylist}
      >
        <MenuItem
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            dispatch(
              updatePlaylistRepresentationImageLink(
                videoThumbnailDetail as { media_id: string; media_url: string },
              ),
            ).then((res: any) => {
              if (res.payload) {
                showNotification(
                  'Update playlist representaion image link successfully',
                  'success',
                  2000,
                );
                dispatch(
                  getPlaylistDetail({ playlistId: playlistDetail?._id as string }),
                );

                setBackgroundPlaylistImage(res.payload.data.new_media_url);
              }
            });
            setAnchorEl(null);
          }}
        >
          Set this video thumbnail as playlist representation image
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            onDeleteVideoPlaylist(e, videoIdToAdd_Delete as string);
            setAnchorEl(null);
          }}
        >
          Delete Video
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PlaylistDetail;
