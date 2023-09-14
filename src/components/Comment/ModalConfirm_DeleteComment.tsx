import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { deleteCommentVideo, getListCommentsVideo } from '@/services/api/comment';
import { useAppDispatch } from '@/services/hooks';
import { showNotification } from '@/utils/notification';

const ModalConfirm_DeleteComment = ({
  openConfirm,
  setOpenConfirm,
  commentId,
  videoId,
}: {
  openConfirm: true;
  setOpenConfirm: (openConfirm: boolean) => void;
  commentId: string;
  videoId: string;
}) => {
  const dispatch = useAppDispatch();

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
            Are you sure you want to delete this comment ?
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
              dispatch(deleteCommentVideo({ commentId, videoId })).then((res: any) => {
                if (res.payload) {
                  setOpenConfirm(false);
                  dispatch(getListCommentsVideo({ videoId: videoId }));
                  showNotification('Successfully deleted comment', 'success', 2000);
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

export default ModalConfirm_DeleteComment;
