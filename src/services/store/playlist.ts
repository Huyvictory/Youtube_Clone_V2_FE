import { createSlice } from '@reduxjs/toolkit';

import { Playlist_Videos, PlaylistDetail } from '@/contracts/playlist';

import {
  createNewPlaylist,
  CreateOrUpdatePlaylistRepresentationImage,
  getListPlaylists_Channel,
  getPlaylistDetail,
} from '../api/playlist';

// Define a type for the slice state
interface playlistState {
  isLoadingCreatePlaylist: boolean;
  isLoading_GetListPlaylist_channel: boolean;
  isLoading_GetPlaylistDetail: boolean;
  isLoading_UpdateNewRepresentation: boolean;
  playlist_data: Array<PlaylistDetail>;
  playlistDetail?: PlaylistDetail;
  playlist_videos: Playlist_Videos;
}

// Define the initial state using that type
const initialState: playlistState = {
  isLoadingCreatePlaylist: false,
  isLoading_GetListPlaylist_channel: false,
  isLoading_GetPlaylistDetail: false,
  isLoading_UpdateNewRepresentation: false,
  playlist_data: [],
  playlistDetail: undefined,
  playlist_videos: [],
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    updateVideosPlaylist: (state, action) => {
      state.playlist_videos = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewPlaylist.pending, (state) => {
        state.isLoadingCreatePlaylist = true;
      })
      .addCase(createNewPlaylist.rejected, (state) => {
        state.isLoadingCreatePlaylist = false;
      })
      .addCase(createNewPlaylist.fulfilled, (state) => {
        state.isLoadingCreatePlaylist = false;
      })
      .addCase(getListPlaylists_Channel.pending, (state) => {
        state.isLoading_GetListPlaylist_channel = true;
      })
      .addCase(getListPlaylists_Channel.rejected, (state) => {
        state.isLoading_GetListPlaylist_channel = false;
      })
      .addCase(getListPlaylists_Channel.fulfilled, (state, action) => {
        state.isLoading_GetListPlaylist_channel = false;
        state.playlist_data = action.payload.data.data;
      })
      .addCase(getPlaylistDetail.pending, (state) => {
        state.isLoading_GetPlaylistDetail = true;
      })
      .addCase(getPlaylistDetail.rejected, (state) => {
        state.isLoading_GetPlaylistDetail = false;
      })
      .addCase(getPlaylistDetail.fulfilled, (state, action) => {
        state.isLoading_GetPlaylistDetail = false;
        state.playlistDetail = action.payload.data.data;
        state.playlist_videos = action.payload.data.data.playlist_videos;
      })
      .addCase(CreateOrUpdatePlaylistRepresentationImage.pending, (state) => {
        state.isLoading_UpdateNewRepresentation = true;
      })
      .addCase(CreateOrUpdatePlaylistRepresentationImage.rejected, (state) => {
        state.isLoading_UpdateNewRepresentation = false;
      })
      .addCase(CreateOrUpdatePlaylistRepresentationImage.fulfilled, (state) => {
        state.isLoading_UpdateNewRepresentation = false;
      });
  },
});

export const { updateVideosPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
