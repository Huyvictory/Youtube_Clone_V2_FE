import { createSlice } from '@reduxjs/toolkit';

import { PlaylistDetail } from '@/contracts/playlist';

import { createNewPlaylist, getListPlaylists_Channel } from '../api/playlist';

// Define a type for the slice state
interface playlistState {
  isLoadingCreatePlaylist: boolean;
  isLoading_GetListPlaylist_channel: boolean;
  playlist_data: Array<PlaylistDetail>;
}

// Define the initial state using that type
const initialState: playlistState = {
  isLoadingCreatePlaylist: false,
  isLoading_GetListPlaylist_channel: false,
  playlist_data: [],
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {},
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
      });
  },
});

export default playlistSlice.reducer;
