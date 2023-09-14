import { DeleteOutline, EditOutlined, MoreVertOutlined } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import styled from 'styled-components';

import { CommentType } from '@/contracts/comment';
import { getListCommentsVideo, updateCommentVideo } from '@/services/api/comment';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { showNotification } from '@/utils/notification';

import ModalConfirm_DeleteComment from './Comment/ModalConfirm_DeleteComment';

dayjs.extend(relativeTime);

const Container = styled.div`
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment, videoId }: { comment: CommentType; videoId: string }) => {
  const { userPersonalDetail } = useAppSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showInputCommentContent, setShowInputCommentContent] = useState<boolean>(false);
  const [editedContentComment, setEditedContentComment] = useState<string>(
    comment.comment_content,
  );
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };

  const handleCloseUserMenu = (e: any) => {
    setAnchorEl(null);
    e.stopPropagation();
  };

  return (
    <Container>
      <div className="flex gap-x-[10px] w-full">
        <Avatar
          src={
            comment.user_avatar_url
              ? comment.user_avatar_url
              : 'https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo'
          }
        />
        <Details>
          <Name>
            {comment.user_name} <Date>{dayjs(comment.createdAt).fromNow()}</Date>
          </Name>
          {!showInputCommentContent ? (
            <Text>{comment.comment_content}</Text>
          ) : (
            <div className="flex flex-col gap-y-2">
              <TextField
                fullWidth
                variant="standard"
                placeholder="Edit your comment here"
                value={editedContentComment}
                onChange={(e) => {
                  setEditedContentComment(e.target.value);
                }}
              />
              <div className="flex justify-end gap-x-2">
                <Button
                  variant="text"
                  sx={{ borderRadius: '18px' }}
                  onClick={() => {
                    setEditedContentComment(comment.comment_content);
                    setShowInputCommentContent(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ borderRadius: '18px' }}
                  disabled={editedContentComment.length === 0}
                  onClick={() => {
                    dispatch(
                      updateCommentVideo({
                        commentId: comment._id,
                        comment_content: editedContentComment,
                      }),
                    ).then((res: any) => {
                      if (res.payload) {
                        setShowInputCommentContent(false);
                        dispatch(getListCommentsVideo({ videoId: videoId }));
                        showNotification(
                          'Successfully updated comment!',
                          'success',
                          2000,
                        );
                      }
                    });
                  }}
                >
                  Comment
                </Button>
              </div>
            </div>
          )}
        </Details>
      </div>
      {userPersonalDetail?._id === comment.comment_user_id &&
        !showInputCommentContent && (
          <IconButton
            onClick={(e) => {
              handleOpen(e);
              e.stopPropagation();
            }}
          >
            <MoreVertOutlined />
          </IconButton>
        )}
      <Menu
        sx={{ mt: '45px', paddingRight: '12px', paddingLeft: '16px' }}
        id="menu-appbar"
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
        onClose={handleCloseUserMenu}
      >
        <MenuItem
          sx={{ display: 'flex', columnGap: '1rem' }}
          onClick={(e) => {
            setShowInputCommentContent(true);
            setAnchorEl(null);
            e.stopPropagation();
          }}
        >
          <EditOutlined /> Edit
        </MenuItem>
        <MenuItem
          sx={{ display: 'flex', columnGap: '1rem' }}
          onClick={(e) => {
            setOpenConfirm(true);
            setAnchorEl(null);
            e.stopPropagation();
          }}
        >
          <DeleteOutline /> Delete
        </MenuItem>
      </Menu>
      {openConfirm && (
        <ModalConfirm_DeleteComment
          openConfirm={openConfirm}
          setOpenConfirm={setOpenConfirm}
          commentId={comment._id}
          videoId={videoId}
        />
      )}
    </Container>
  );
};

export default Comment;
