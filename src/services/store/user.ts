import { createSlice } from '@reduxjs/toolkit';

import { UserProfile } from '@/contracts/profile';
import { UserSubscribedChannels } from '@/contracts/user';

import {
  getSubscribedChannels,
  getUserProfile,
  updateUserAvatar,
  updateUserPassword,
  updateUserProfile,
} from '../api/user';

// Define a type for the slice state
interface UserState {
  isLoadingUpdateProfile: boolean;
  userPersonalDetail?: UserProfile;
  subscribedChannels: Array<UserSubscribedChannels>;
}

// Define the initial state using that type
const initialState: UserState = {
  isLoadingUpdateProfile: false,
  userPersonalDetail: undefined,
  subscribedChannels: [],
};

export const appSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoadingUpdateProfile = true;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isLoadingUpdateProfile = false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoadingUpdateProfile = false;
        state.userPersonalDetail = action.payload.data.data;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoadingUpdateProfile = true;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoadingUpdateProfile = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoadingUpdateProfile = false;
        state.userPersonalDetail = action.payload.data.data;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoadingUpdateProfile = true;
      })
      .addCase(updateUserPassword.rejected, (state) => {
        state.isLoadingUpdateProfile = false;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.isLoadingUpdateProfile = false;
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoadingUpdateProfile = true;
      })
      .addCase(updateUserAvatar.rejected, (state) => {
        state.isLoadingUpdateProfile = false;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoadingUpdateProfile = false;
        (state.userPersonalDetail as UserProfile).user_avatar_media_id.media_url =
          action.payload.data.data.mediaUrl;
      })
      .addCase(getSubscribedChannels.pending, (state, action) => {
        state.subscribedChannels = [];
      })
      .addCase(getSubscribedChannels.rejected, (state) => {
        state.subscribedChannels = [];
      })
      .addCase(getSubscribedChannels.fulfilled, (state, action) => {
        state.subscribedChannels = action.payload.data.data;
      });
  },
});

export default appSlice.reducer;

// export const { setAppLoading } = appSlice.actions;
