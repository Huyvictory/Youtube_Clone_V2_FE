import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { deletePlaylist } from '@/services/api/playlist';
import { useAppDispatch } from '@/services/hooks';
import { showNotification } from '@/utils/notification';

const ModalConfirm_DeletePlaylist = ({
  openConfirm,
  setOpenConfirm,
  playlistId,
}: {
  openConfirm: true;
  setOpenConfirm: (openConfirm: boolean) => void;
  playlistId: string;
}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <Box>
      <Dialog
        open={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this playlist ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenConfirm(false);
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              dispatch(deletePlaylist({ playlistId: playlistId })).then((res: any) => {
                if (res.payload) {
                  showNotification('Delete playlist successfully !', 'success', 2000);
                  setOpenConfirm(false);
                  navigate('/my-channel?currentTab=Playlist');
                }
              });
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModalConfirm_DeletePlaylist;
