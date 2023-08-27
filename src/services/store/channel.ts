import { createSlice } from '@reduxjs/toolkit';

import { channelDetail } from '@/contracts/channel';

import { getChannelDetail, UpdateOrCreateChannelBanner } from '../api/channel';

interface ChannelState {
  isLoadingGetChannelDetail: boolean;
  channelDetail?: channelDetail;
  isUpdating_ChannelBanner: boolean;
}

// Define the initial state using that type
const initialState: ChannelState = {
  isLoadingGetChannelDetail: false,
  channelDetail: undefined,
  isUpdating_ChannelBanner: false,
};

export const channelSlice = createSlice({
  name: 'channel',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getChannelDetail.pending, (state) => {
        state.isLoadingGetChannelDetail = true;
      })
      .addCase(getChannelDetail.rejected, (state) => {
        state.isLoadingGetChannelDetail = false;
      })
      .addCase(getChannelDetail.fulfilled, (state, action) => {
        state.isLoadingGetChannelDetail = false;
        state.channelDetail = action.payload.data.data.channelDetail;
      })
      .addCase(UpdateOrCreateChannelBanner.pending, (state) => {
        state.isUpdating_ChannelBanner = true;
      })
      .addCase(UpdateOrCreateChannelBanner.rejected, (state) => {
        state.isUpdating_ChannelBanner = false;
      })
      .addCase(UpdateOrCreateChannelBanner.fulfilled, (state) => {
        state.isUpdating_ChannelBanner = false;
      });
  },
});

export default channelSlice.reducer;

// export const { setAppLoading } = appSlice.actions;
