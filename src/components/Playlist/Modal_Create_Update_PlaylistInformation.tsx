import { Cancel } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { PlaylistDetail } from '@/contracts/playlist';
import {
  createNewPlaylist,
  getPlaylistDetail,
  updatePlaylistInformation,
} from '@/services/api/playlist';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';
import { showNotification } from '@/utils/notification';

const Modal_Create_Update_PlaylistInformation = ({
  open,
  setOpen,
  isUpdating,
  playlistDetail,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  isUpdating: boolean;
  playlistDetail?: PlaylistDetail | null;
}) => {
  const { isLoadingCreatePlaylist } = useAppSelector((state) => state.playlist);

  const location = useLocation();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ playlist_name: string; playlist_description: string }>({ mode: 'all' });

  const dispatch = useAppDispatch();

  const onSubmit = (data: { playlist_name: string; playlist_description: string }) => {
    if (!isUpdating) {
      dispatch(
        createNewPlaylist({
          playlist_name: data.playlist_name,
          playlist_description:
            data.playlist_description.length > 0 ? data.playlist_description : undefined,
        }),
      ).then((res: any) => {
        if (res.payload) {
          showNotification(
            `Create playlist ${data.playlist_name} successfully`,
            'success',
            2000,
          );
          setOpen(false);
        }
      });
    } else {
      dispatch(
        updatePlaylistInformation({
          playlistId: String(playlistDetail?._id),
          playlist_name: data.playlist_name.length > 0 ? data.playlist_name : undefined,
          playlist_description:
            data.playlist_description.length > 0 ? data.playlist_description : undefined,
        }),
      ).then((res: any) => {
        if (res.payload) {
          dispatch(
            getPlaylistDetail({
              playlistId: location.pathname.substring(
                location.pathname.lastIndexOf('/') + 1,
              ),
            }),
          );
          showNotification(`Update playlist successfully`, 'success', 2000);
          setOpen(false);
        }
      });
    }
  };

  useEffect(() => {
    if (isUpdating) {
      reset({
        playlist_name: playlistDetail?.playlist_name,
        playlist_description: playlistDetail?.playlist_description as string | undefined,
      });
    }
  }, []);

  return (
    <Box>
      <Dialog
        maxWidth={'sm'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <Box component={'form'} noValidate onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            id="scroll-dialog-title"
            // eslint-disable-next-line react/no-children-prop
            children={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Create playlist</div>
                <IconButton
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <Cancel />
                </IconButton>
              </div>
            }
          ></DialogTitle>
          <DialogContent dividers={true}>
            <TextField
              type="text"
              margin="normal"
              required={!isUpdating}
              {...register('playlist_name', {
                required: !isUpdating ? 'Playlist name is required' : false,
              })}
              error={hasSpecifiedFieldError(errors, 'playlist_name')}
              helperText={<div>{renderFieldValidation(errors, 'playlist_name')}</div>}
              fullWidth
              label="Playlist name"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
            <TextField
              type="text"
              margin="normal"
              {...register('playlist_description')}
              fullWidth
              label="Playlist description"
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </Box>
        <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoadingCreatePlaylist}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </Box>
  );
};

export default Modal_Create_Update_PlaylistInformation;
