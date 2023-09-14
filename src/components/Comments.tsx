import { Button, TextField } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { createCommentVideo, getListCommentsVideo } from '@/services/api/comment';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { resetStateComment } from '@/services/store/comment';
import { showNotification } from '@/utils/notification';

import Comment from './Comment';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled(TextField)<any>`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }: { videoId: string }) => {
  const { userPersonalDetail } = useAppSelector((state) => state.user);
  const { list_comments_video, isLoading } = useAppSelector((state) => state.comment);

  const [newComment, setNewComment] = useState<string>('');
  const [showCommentActionButtons, setShowCommentActionButtons] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoId) {
      dispatch(
        getListCommentsVideo({
          videoId,
        }),
      );
    }

    return () => {
      dispatch(resetStateComment());
    };
  }, [videoId]);
  return (
    <Container>
      <NewComment>
        <div className="flex w-full gap-x-[10px]">
          <Avatar
            src={
              userPersonalDetail?.user_avatar_media_id
                ? userPersonalDetail.user_avatar_media_id.media_url
                : 'https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo'
            }
          />
          <Input
            placeholder="Add a comment..."
            variant="standard"
            onClick={() => {
              setShowCommentActionButtons(true);
            }}
            value={newComment}
            onChange={(e: any) => {
              setNewComment(e.target.value);
            }}
          />
        </div>
        {showCommentActionButtons && (
          <div className="flex w-full justify-end gap-x-2">
            <Button
              variant="text"
              sx={{ borderRadius: '18px' }}
              onClick={() => {
                setShowCommentActionButtons(false);
                setNewComment('');
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ borderRadius: '18px' }}
              disabled={newComment.length === 0}
              onClick={() => {
                dispatch(
                  createCommentVideo({ videoId, comment_content: newComment }),
                ).then((res: any) => {
                  if (res.payload) {
                    setNewComment('');
                    setShowCommentActionButtons(false);
                    showNotification(
                      'Create new commment of a video successfully!',
                      'success',
                      2000,
                    );
                    dispatch(getListCommentsVideo({ videoId }));
                  }
                });
              }}
            >
              Comment
            </Button>
          </div>
        )}
      </NewComment>
      {list_comments_video.length > 0 &&
        list_comments_video.map((el) => {
          return <Comment key={el._id} comment={el} videoId={videoId} />;
        })}
      <Backdrop sx={{ color: '#fff', zIndex: 100 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default Comments;
