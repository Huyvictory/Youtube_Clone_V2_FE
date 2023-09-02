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
import { useForm } from 'react-hook-form';

import { createNewPlaylist } from '@/services/api/playlist';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { hasSpecifiedFieldError, renderFieldValidation } from '@/utils/formValidation';
import { showNotification } from '@/utils/notification';

const ModalCreatePlaylist = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { isLoadingCreatePlaylist } = useAppSelector((state) => state.playlist);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ playlist_name: string; playlist_description: string }>({ mode: 'all' });

  const dispatch = useAppDispatch();

  const onSubmit = (data: { playlist_name: string; playlist_description: string }) => {
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
  };

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
              required
              {...register('playlist_name', {
                required: 'Playlist name is required',
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

export default ModalCreatePlaylist;
