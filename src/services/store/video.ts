import { createSlice } from '@reduxjs/toolkit';

import {
  GetListVideos_Response,
  GetVideoByID_Response,
  Video_Categories,
} from '@/contracts/video';

import { getPlaylistsVideo } from '../api/playlist';
import {
  createNewVideo,
  getListVideos,
  getListWatchedVideos,
  getVideoByItsId,
  getVideoCategories,
  updateExisingVideo,
} from '../api/video';

// Define a type for the slice state
interface VideoState {
  isLoadingVideo: boolean;
  isLoadingVideo_GetList: boolean;
  videoCategoriesList: Array<Video_Categories>;
  videoList: Array<GetListVideos_Response>;
  videoDetail?: GetVideoByID_Response;
  videoPage: number;
  video_playlists: Array<string>;
  video_watched: Array<GetListVideos_Response>;
}

// Define the initial state using that type
const initialState: VideoState = {
  isLoadingVideo: false,
  isLoadingVideo_GetList: false,
  videoCategoriesList: [],
  videoList: [],
  videoDetail: undefined,
  videoPage: 1,
  video_playlists: [],
  video_watched: [],
};

export const videoSlice = createSlice({
  name: 'video',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateNextVideoPage: (state, action) => {
      state.videoPage = action.payload;
    },
    resetVideoList: (state) => {
      state.videoList = [];
    },
    updateVideoList: (state, action) => {
      state.videoList = action.payload;
    },
    resetVideoState: () => {
      return initialState;
    },
  },
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
        state.videoList = state.videoList?.concat(action.payload.data.data);
      })
      .addCase(getVideoByItsId.pending, (state) => {
        state.isLoadingVideo = true;
      })
      .addCase(getVideoByItsId.rejected, (state) => {
        state.isLoadingVideo = false;
      })
      .addCase(getVideoByItsId.fulfilled, (state, action) => {
        state.isLoadingVideo = false;
        state.videoDetail = action.payload.data.data;
      })
      .addCase(updateExisingVideo.pending, (state) => {
        state.isLoadingVideo = true;
      })
      .addCase(updateExisingVideo.rejected, (state) => {
        state.isLoadingVideo = false;
      })
      .addCase(updateExisingVideo.fulfilled, (state) => {
        state.isLoadingVideo = false;
      })
      .addCase(getPlaylistsVideo.pending, (state) => {
        state.video_playlists = [];
      })
      .addCase(getPlaylistsVideo.rejected, (state) => {
        state.video_playlists = [];
      })
      .addCase(getPlaylistsVideo.fulfilled, (state, action) => {
        state.video_playlists = action.payload.data.data.video_playlists;
      })
      .addCase(getListWatchedVideos.pending, (state) => {
        state.isLoadingVideo_GetList = true;
      })
      .addCase(getListWatchedVideos.rejected, (state) => {
        state.isLoadingVideo_GetList = false;
      })
      .addCase(getListWatchedVideos.fulfilled, (state, action) => {
        state.isLoadingVideo_GetList = false;
        state.video_watched = action.payload.data.data;
      });
  },
});

export default videoSlice.reducer;

export const { updateNextVideoPage, resetVideoList, resetVideoState, updateVideoList } =
  videoSlice.actions;
