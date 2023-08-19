import { createSlice } from '@reduxjs/toolkit';

import { GetListVideos_Response, Video_Categories } from '@/contracts/video';

import { createNewVideo, getListVideos, getVideoCategories } from '../api/video';

// Define a type for the slice state
interface VideoState {
  isLoadingVideo: boolean;
  isLoadingVideo_GetList: boolean;
  videoCategoriesList?: Array<Video_Categories>;
  videoList?: Array<GetListVideos_Response>;
}

// Define the initial state using that type
const initialState: VideoState = {
  isLoadingVideo: false,
  isLoadingVideo_GetList: false,
  videoCategoriesList: undefined,
  videoList: undefined,
};

export const appSlice = createSlice({
  name: 'video',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getVideoCategories.pending, (state) => {
        state.isLoadingVideo = true;
      })
      .addCase(getVideoCategories.rejected, (state) => {
        state.isLoadingVideo = false;
      })
      .addCase(getVideoCategories.fulfilled, (state, action) => {
        state.isLoadingVideo = false;
        state.videoCategoriesList = action.payload.data.data;
      })
      .addCase(createNewVideo.pending, (state) => {
        state.isLoadingVideo = true;
      })
      .addCase(createNewVideo.rejected, (state) => {
        state.isLoadingVideo = false;
      })
      .addCase(createNewVideo.fulfilled, (state) => {
        state.isLoadingVideo = false;
      })
      .addCase(getListVideos.pending, (state) => {
        state.isLoadingVideo_GetList = true;
      })
      .addCase(getListVideos.rejected, (state) => {
        state.isLoadingVideo_GetList = false;
      })
      .addCase(getListVideos.fulfilled, (state, action) => {
        state.isLoadingVideo_GetList = false;
        state.videoList = action.payload.data.data;
      });
  },
});

export default appSlice.reducer;

// export const { setAppLoading } = appSlice.actions;
