import { createSlice } from '@reduxjs/toolkit';

import { CommentType } from '@/contracts/comment';

import { createCommentVideo, getListCommentsVideo } from '../api/comment';

interface CommentState {
  isLoading: boolean;
  list_comments_video: Array<CommentType>;
}

const initialState: CommentState = {
  isLoading: false,
  list_comments_video: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetStateComment: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListCommentsVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListCommentsVideo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getListCommentsVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list_comments_video = action.payload.data.data;
      })
      .addCase(createCommentVideo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCommentVideo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCommentVideo.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export default commentSlice.reducer;

export const { resetStateComment } = commentSlice.actions;
