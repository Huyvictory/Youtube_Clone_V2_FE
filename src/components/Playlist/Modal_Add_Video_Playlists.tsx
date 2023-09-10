import { CloseOutlined } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Dialog,
  DialogTitle,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';

import {
  addOrDeleteVideo_Playlist,
  getListPlaylists_Channel,
  getPlaylistsVideo,
} from '@/services/api/playlist';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { showNotification } from '@/utils/notification';

const Modal_Add_Video_Playlists = ({
  open,
  setOpen,
  videoId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  videoId: string;
}) => {
  const { userPersonalDetail } = useAppSelector((state) => state.user);
  const { playlist_data } = useAppSelector((state) => state.playlist);
  const { video_playlists } = useAppSelector((state) => state.video);

  const [updateState_PlaylistCheckboxes, setUpdateState_PlaylistCheckboxes] =
    useState<string>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getListPlaylists_Channel({ channel_id: userPersonalDetail?.channel_id as string }),
    );

    dispatch(getPlaylistsVideo({ video_id: videoId }));
  }, []);

  return (
    <Dialog
      open={open}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between">
        <DialogTitle>Add video into playlists</DialogTitle>
        <IconButton
          onClick={(e) => {
            setOpen(false);
            e.stopPropagation();
          }}
        >
          <CloseOutlined />
        </IconButton>
      </div>
      <Box sx={{ display: 'flex', flexDirection: 'column', paddingX: 4 }}>
        {playlist_data.map((el, index) => {
          return (
            <FormControlLabel
              key={el._id}
              control={
                <Checkbox
                  checked={video_playlists.includes(el._id)}
                  onChange={(e) => {
                    dispatch(
                      addOrDeleteVideo_Playlist({
                        video_id: videoId,
                        playlistId: el._id,
                      }),
                    ).then((res: any) => {
                      if (res.payload) {
                        dispatch(getPlaylistsVideo({ video_id: videoId }));
                        if (!e.target.checked) {
                          showNotification(
                            `Add video into playlist ${el.playlist_name} successfully`,
                            'success',
                            2000,
                          );
                        } else {
                          showNotification(
                            `Delete video out of playlist ${el.playlist_name} successfully`,
                            'success',
                            2000,
                          );
                        }
                      }
                    });
                  }}
                  name={`playlist_${el._id}`}
                />
              }
              label={el.playlist_name}
            />
          );
        })}
      </Box>
    </Dialog>
  );
};

export default Modal_Add_Video_Playlists;
